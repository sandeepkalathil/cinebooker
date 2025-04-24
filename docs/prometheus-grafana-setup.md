
# Setting up Prometheus and Grafana Monitoring for CineBooker

This guide will help you set up Prometheus and Grafana to monitor your CineBooker application. We'll walk through each step in detail so that anyone can understand and implement this monitoring solution.

## Table of Contents

1. [What is Prometheus and Grafana?](#what-is-prometheus-and-grafana)
2. [Installing Prometheus](#installing-prometheus)
3. [Installing Grafana](#installing-grafana)
4. [Configuring Prometheus to Collect CineBooker Metrics](#configuring-prometheus-to-collect-cinebooker-metrics)
5. [Creating Dashboards in Grafana](#creating-dashboards-in-grafana)
6. [Understanding CineBooker's Application Metrics](#understanding-cinebookers-application-metrics)
7. [Troubleshooting](#troubleshooting)

## What is Prometheus and Grafana?

**Prometheus** is an open-source monitoring and alerting system that collects and stores metrics from applications and infrastructure. It's like a time-machine for your application data, recording what's happening so you can analyze it later.

**Grafana** is a visualization tool that connects to data sources like Prometheus and helps you create beautiful dashboards to make sense of your metrics. Think of it as the artist that paints a picture using the data Prometheus collects.

Together, they form a powerful monitoring solution that helps you:
- Track application performance
- Identify issues before they affect users
- Understand user behavior
- Make data-driven decisions

## Installing Prometheus

### Prerequisites
- A Linux server (Ubuntu/Debian commands provided, adapt for other distributions)
- Root or sudo access
- Basic command line knowledge

### Step 1: Create a System User for Prometheus

```bash
sudo groupadd --system prometheus
sudo useradd -s /sbin/nologin --system -g prometheus prometheus
```

### Step 2: Create Directories for Prometheus

```bash
sudo mkdir /etc/prometheus
sudo mkdir /var/lib/prometheus
sudo chown prometheus:prometheus /var/lib/prometheus
```

### Step 3: Download and Install Prometheus

```bash
# Find the latest version at https://prometheus.io/download/
export PROMETHEUS_VERSION="2.49.0"
wget https://github.com/prometheus/prometheus/releases/download/v${PROMETHEUS_VERSION}/prometheus-${PROMETHEUS_VERSION}.linux-amd64.tar.gz
tar -xvf prometheus-${PROMETHEUS_VERSION}.linux-amd64.tar.gz

cd prometheus-${PROMETHEUS_VERSION}.linux-amd64
sudo cp prometheus /usr/local/bin/
sudo cp promtool /usr/local/bin/
sudo chown prometheus:prometheus /usr/local/bin/prometheus
sudo chown prometheus:prometheus /usr/local/bin/promtool

sudo cp -r consoles /etc/prometheus
sudo cp -r console_libraries /etc/prometheus
sudo chown -R prometheus:prometheus /etc/prometheus/consoles
sudo chown -R prometheus:prometheus /etc/prometheus/console_libraries
```

### Step 4: Create a Prometheus Configuration File

```bash
sudo nano /etc/prometheus/prometheus.yml
```

Insert the following configuration:

```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    scrape_interval: 5s
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'cinebooker'
    scrape_interval: 10s
    metrics_path: '/api/metrics'
    static_configs:
      - targets: ['your-cinebooker-app:80']  # Replace with your app's address
```

Save and exit (CTRL+X, then Y, then ENTER).

### Step 5: Create a Prometheus Service

```bash
sudo nano /etc/systemd/system/prometheus.service
```

Insert the following:

```ini
[Unit]
Description=Prometheus
Wants=network-online.target
After=network-online.target

[Service]
User=prometheus
Group=prometheus
Type=simple
ExecStart=/usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries

[Install]
WantedBy=multi-user.target
```

### Step 6: Start and Enable Prometheus Service

```bash
sudo systemctl daemon-reload
sudo systemctl start prometheus
sudo systemctl enable prometheus
sudo systemctl status prometheus
```

Prometheus should now be running and accessible at http://your-server-ip:9090

## Installing Grafana

### Step 1: Add Grafana Repository

```bash
sudo apt-get install -y apt-transport-https software-properties-common
wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
```

### Step 2: Install Grafana

```bash
sudo apt-get update
sudo apt-get install -y grafana
```

### Step 3: Start and Enable Grafana Service

```bash
sudo systemctl start grafana-server
sudo systemctl enable grafana-server
sudo systemctl status grafana-server
```

Grafana should now be running and accessible at http://your-server-ip:3000

The default login credentials are:
- Username: admin
- Password: admin

You'll be prompted to change the password on first login.

## Configuring Prometheus to Collect CineBooker Metrics

Now we need to make sure Prometheus can access the metrics from your CineBooker application.

### Step 1: Ensure CineBooker Metrics Endpoint is Accessible

Your CineBooker application is already set up to expose metrics at the `/api/metrics` endpoint. Make sure this endpoint is accessible from the server where Prometheus is running.

### Step 2: Update Prometheus Configuration (if needed)

If your CineBooker application is running on a different server or port than what's in the initial setup, update the targets in the prometheus.yml file:

```bash
sudo nano /etc/prometheus/prometheus.yml
```

Update the targets line under the 'cinebooker' job:

```yaml
- targets: ['your-cinebooker-app-host:port']
```

### Step 3: Restart Prometheus to Apply Changes

```bash
sudo systemctl restart prometheus
```

## Creating Dashboards in Grafana

### Step 1: Add Prometheus as a Data Source

1. Log in to Grafana
2. Click on "Configuration" (gear icon) in the side menu
3. Select "Data sources"
4. Click "Add data source"
5. Select "Prometheus"
6. Set the URL to `http://localhost:9090` (if Prometheus is on the same server)
7. Click "Save & Test"

### Step 2: Import a Dashboard

Let's create a basic dashboard for CineBooker:

1. Click on "+" in the side menu
2. Select "Create Dashboard"
3. Click "Add new panel"
4. In the Query field, try a simple metric like `cinebooker_page_views_total`
5. Click "Apply"

### Step 3: Create Additional Panels

Here are some useful panels to create:

#### 1. Page Views by Route
- Query: `sum by (route) (cinebooker_page_views_total)`
- Visualization: Bar chart

#### 2. Active User Sessions
- Query: `cinebooker_active_user_sessions`
- Visualization: Gauge

#### 3. API Request Duration
- Query: `rate(cinebooker_api_request_duration_seconds_sum[5m]) / rate(cinebooker_api_request_duration_seconds_count[5m])`
- Visualization: Graph

#### 4. Component Render Times
- Query: `rate(cinebooker_component_render_time_seconds_sum[5m]) / rate(cinebooker_component_render_time_seconds_count[5m])`
- Visualization: Table with component label

#### 5. Error Rate
- Query: `sum(rate(cinebooker_request_errors_total[5m]))`
- Visualization: Stat

### Step 4: Save Your Dashboard

Click "Save dashboard" in the upper right corner, give it a name like "CineBooker Overview", and click "Save".

## Understanding CineBooker's Application Metrics

Our CineBooker application provides several key metrics:

### Page Views
- **Metric**: `cinebooker_page_views_total`
- **Description**: Counts how many times each page in the app has been viewed
- **Labels**: `route` (which page was viewed)
- **Why It's Useful**: Helps you understand which pages are popular and user navigation patterns

### API Request Duration
- **Metric**: `cinebooker_api_request_duration_seconds`
- **Description**: Measures how long API requests take to complete
- **Labels**: `endpoint`, `method`, `status`
- **Why It's Useful**: Helps identify slow API endpoints that might need optimization

### Active User Sessions
- **Metric**: `cinebooker_active_user_sessions`
- **Description**: Shows the current number of active users
- **Why It's Useful**: Helps track application usage in real-time

### Request Errors
- **Metric**: `cinebooker_request_errors_total`
- **Description**: Counts the number of errors that occur
- **Labels**: `route`, `error_type`
- **Why It's Useful**: Helps identify problematic areas in the application

### Movie Bookings
- **Metric**: `cinebooker_movie_bookings_total`
- **Description**: Tracks movie booking transactions
- **Labels**: `movie_id`, `theater_id`
- **Why It's Useful**: Helps track business metrics like popular movies and theaters

### Application Load Time
- **Metric**: `cinebooker_app_load_time_seconds`
- **Description**: Measures how long the application takes to load
- **Why It's Useful**: Helps track overall application performance

### Component Render Time
- **Metric**: `cinebooker_component_render_time_seconds`
- **Description**: Measures render time for individual React components
- **Labels**: `component`
- **Why It's Useful**: Helps identify slow components that need optimization

## Triggering Test Metrics

To see some data in your dashboard, use the application and generate some traffic:

1. Visit different pages in the CineBooker application
2. Try booking some tickets
3. Force some errors by trying invalid operations (e.g., booking unavailable seats)

## Setting Up Alerts

### Basic Alert in Grafana:

1. In your dashboard, click on a panel title
2. Select "Edit"
3. Go to the "Alert" tab
4. Click "Create Alert"
5. Configure conditions (e.g., alert when errors > 5)
6. Add notification channels if configured
7. Click "Save"

## Troubleshooting

### No Metrics Showing Up?

1. **Check Prometheus Targets:**
   - Go to http://your-server-ip:9090/targets
   - Look for the 'cinebooker' job
   - If it's down, check connectivity to your application

2. **Check Application Metrics Endpoint:**
   - Visit http://your-cinebooker-app/api/metrics directly
   - You should see the raw metrics text

3. **Check Prometheus Configuration:**
   ```bash
   sudo promtool check config /etc/prometheus/prometheus.yml
   ```

4. **Check Prometheus Logs:**
   ```bash
   sudo journalctl -u prometheus --since "1 hour ago"
   ```

### Grafana Can't Connect to Prometheus?

1. Check if Prometheus is running: `systemctl status prometheus`
2. Verify the URL in Grafana's data source configuration
3. Ensure there are no firewall rules blocking the connection

## Next Steps

Once you're comfortable with the basics:

1. **Set up more complex alerts**
2. **Create additional dashboards** for different aspects of the application
3. **Add more metrics** to track specific business processes
4. **Configure longer data retention** in Prometheus for historical analysis

---

Congratulations! You now have a complete monitoring setup for your CineBooker application with Prometheus and Grafana. This will help you keep track of your application's performance and user behavior, making it easier to identify and fix issues before they affect your users.
