
# Kubernetes Deployment Guide

This guide describes how to deploy CineBooker on a Kubernetes cluster manually.

## Prerequisites

- Kubernetes cluster up and running
- `kubectl` configured to connect to your cluster
- Basic knowledge of Kubernetes concepts

## Manual Kubernetes Deployment

### 1. Create the namespace

```bash
kubectl apply -f k8s/namespace.yaml
```

This creates a dedicated namespace called `cinebooker` for the application.

### 2. Apply the configuration

```bash
kubectl apply -f k8s/configmap.yaml
```

This creates a ConfigMap with the necessary configuration parameters.

### 3. Deploy the application

```bash
kubectl apply -f k8s/deployment.yaml
```

This creates a Deployment that runs the CineBooker application with 2 replicas.

### 4. Create the service

```bash
kubectl apply -f k8s/service.yaml
```

This creates a Service that exposes the application within the cluster.

### 5. Configure the ingress

```bash
kubectl apply -f k8s/ingress.yaml
```

This creates an Ingress resource that exposes the application to external traffic.

### 6. Verify the deployment

```bash
kubectl -n cinebooker get all
kubectl -n cinebooker get ingress
```

These commands show the status of all resources in the `cinebooker` namespace and the Ingress configuration.

## Setting Up External Access for K3s

For small K3s clusters, follow these additional steps to ensure external access is properly configured:

### 1. Verify Ingress Controller is Running

K3s comes with Traefik by default. Make sure it's running:

```bash
kubectl get pods -n kube-system | grep traefik
```

If you prefer NGINX Ingress Controller:

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.8.1/deploy/static/provider/cloud/deploy.yaml
```

### 2. Set Up Port Forwarding (if needed)

If you're running on a single node or behind a NAT:

```bash
# Forward ports 80 and 443 to your K3s node
sudo iptables -A PREROUTING -t nat -p tcp --dport 80 -j DNAT --to-destination YOUR_K3S_NODE_IP:80
sudo iptables -A FORWARD -p tcp -d YOUR_K3S_NODE_IP --dport 80 -j ACCEPT
```

### 3. Configure DNS

Update your DNS settings or hosts file to point `cinebooker.duckdns.org` to your K3s node's external IP.

For DuckDNS:
1. Log in to your DuckDNS account
2. Update your domain to point to your K3s node's public IP

For local testing, edit your hosts file:
```bash
sudo nano /etc/hosts
# Add the following line:
YOUR_K3S_NODE_IP cinebooker.duckdns.org
```

### 4. Check External Access

Test that your application is accessible:

```bash
curl -H "Host: cinebooker.duckdns.org" http://YOUR_K3S_NODE_IP
```

### 5. Troubleshoot Access Issues

If you're having trouble accessing the application:

```bash
# Check if ingress is properly configured
kubectl -n cinebooker describe ingress cinebooker

# Check ingress controller logs
kubectl logs -n kube-system -l app=traefik

# For NGINX ingress:
kubectl logs -n ingress-nginx -l app.kubernetes.io/name=ingress-nginx
```

## Scaling the Application

To scale the number of application instances:

```bash
kubectl -n cinebooker scale deployment cinebooker --replicas=5
```

## Updating the Application

To update the application to a new version:

```bash
# Update the image in the deployment
kubectl -n cinebooker set image deployment/cinebooker cinebooker=docker.io/yourusername/cinebooker:new-version

# Verify the rollout status
kubectl -n cinebooker rollout status deployment/cinebooker
```

## Cleaning Up

To remove all resources:

```bash
kubectl delete namespace cinebooker
```

This removes the namespace and all resources within it.
