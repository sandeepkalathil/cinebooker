
# Kubernetes Deployment for CineBooker

This directory contains Kubernetes manifests for deploying CineBooker application.

## Deployment Structure

- `namespace.yaml`: Creates a dedicated namespace for the application
- `deployment.yaml`: Defines the application deployment with replicas, resources, and health checks
- `service.yaml`: Creates a service to expose the application internally
- `ingress.yaml`: Configures external access to the application
- `configmap.yaml`: Contains configuration parameters
- `nginx.conf`: Custom Nginx configuration for the container

## Prerequisites

- Kubernetes cluster
- ArgoCD installed on the cluster
- Access to Docker Hub (or your preferred container registry)

## Deployment Steps

1. Update the image repository in `deployment.yaml` to match your Docker Hub repository
2. Update the host in `ingress.yaml` to match your domain
3. Apply the ArgoCD application manifest to your cluster:

```bash
kubectl apply -f ../argocd/application.yaml
```

4. ArgoCD will automatically sync and deploy all resources in this directory

## Monitoring

You can monitor the deployment in the ArgoCD UI or using kubectl:

```bash
kubectl -n cinebooker get all
```

## Troubleshooting

If the application doesn't start properly, check the logs:

```bash
kubectl -n cinebooker logs -l app=cinebooker
```

For ingress issues:

```bash
kubectl -n cinebooker describe ingress cinebooker
```
