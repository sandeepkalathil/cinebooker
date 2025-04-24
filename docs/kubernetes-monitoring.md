
# Kubernetes Monitoring with Prometheus and Grafana

This guide describes how to monitor the CineBooker application using Prometheus and Grafana in a Kubernetes environment.

## Prerequisites

- Kubernetes cluster with Prometheus and Grafana installed
- CineBooker application deployed on the cluster

## Monitoring Setup

### 1. Install Prometheus Operator

The Prometheus Operator provides Kubernetes native deployment and management of Prometheus and related monitoring components.

```bash
kubectl create namespace monitoring
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install prometheus prometheus-community/kube-prometheus-stack \
  --namespace monitoring \
  --set prometheus.prometheusSpec.serviceMonitorSelectorNilUsesHelmValues=false
```

### 2. Create a ServiceMonitor for CineBooker

```yaml
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: cinebooker-monitor
  namespace: monitoring
spec:
  selector:
    matchLabels:
      app: cinebooker
  namespaceSelector:
    matchNames:
      - cinebooker
  endpoints:
  - port: http
    path: /api/metrics
    interval: 15s
```

Apply this configuration:

```bash
kubectl apply -f service-monitor.yaml
```

### 3. Access Grafana

```bash
kubectl port-forward -n monitoring svc/prometheus-grafana 8080:80
```

Access Grafana at http://localhost:8080 with default credentials (admin/prom-operator)

## Available CineBooker Metrics

CineBooker exposes the following custom metrics:

| Metric Name | Type | Description |
|-------------|------|-------------|
| cinebooker_page_views_total | Counter | Total number of page views with route labels |
| cinebooker_api_request_duration_seconds | Histogram | Duration of API requests in seconds |
| cinebooker_active_user_sessions | Gauge | Number of active user sessions |
| cinebooker_request_errors_total | Counter | Total number of request errors |
| cinebooker_movie_bookings_total | Counter | Total number of movie bookings |
| cinebooker_app_load_time_seconds | Histogram | Application load time in seconds |
| cinebooker_component_render_time_seconds | Histogram | Component render time in seconds |

## Example Grafana Dashboards

### CineBooker Overview Dashboard

Create a new dashboard with the following panels:

1. **Page Views by Route** - Bar chart showing total views per route
2. **Active User Sessions** - Gauge showing current active sessions
3. **API Request Duration** - Heatmap showing request durations
4. **Error Rate** - Graph showing error rate over time
5. **Booking Conversion Rate** - Calculated from page views vs bookings

### CineBooker Performance Dashboard

1. **Application Load Time** - Histogram of app load times
2. **Component Render Performance** - Table showing render times by component
3. **Slowest API Endpoints** - Top 5 slowest endpoints by average duration
4. **Browser Resource Usage** - If browser metrics are collected
5. **Error Counts by Type** - Breakdown of errors by category

## Best Practices

1. Set up alerts for critical metrics (high error rates, long API durations)
2. Review dashboards regularly to identify performance bottlenecks
3. Compare metrics before and after deployments to catch regressions
4. Add custom annotations in Grafana for deployments to correlate with metric changes
5. Rotate or clean up metrics data regularly to manage storage
