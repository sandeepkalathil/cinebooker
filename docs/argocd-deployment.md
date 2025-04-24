
# ArgoCD Deployment Guide

This guide describes how to deploy CineBooker using ArgoCD for GitOps-based continuous delivery.

## Prerequisites

- Kubernetes cluster with ArgoCD installed
- Git repository containing your Kubernetes manifests
- Basic knowledge of GitOps and ArgoCD

## ArgoCD Deployment

### 1. Ensure ArgoCD is installed on your cluster

If you don't have ArgoCD installed:

```bash
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
```

### 2. Apply the ArgoCD application manifest

```bash
kubectl apply -f argocd/application.yaml
```

This creates an Application resource in ArgoCD that defines what to deploy and where.

### 3. Monitor the deployment in ArgoCD UI

```bash
#  edit the service directly to safely change the ports
kubectl edit svc argocd-server -n argocd
This opens the service in your default text editor (usually Vim). Now:

Find this block under spec.ports::
Change it to:

  ports:
  - name: http
    port: 8081
    protocol: TCP
    targetPort: 8080
  - name: https
    port: 8443
    protocol: TCP
    targetPort: 8080

# Port forward to access ArgoCD UI
kubectl port-forward service/argocd-server -n argocd 8081:8081 --address 0.0.0.0

# Access the UI at http://<IP_ADD>:8081
# Default credentials: username: admin, password: (can be obtained with:)
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d
```

### 4. Verify the application is synced and healthy

In the ArgoCD UI, check that:
- The application status is "Synced"
- The health status is "Healthy"

## Automating Deployments

ArgoCD can automatically detect changes to your Git repository and deploy them:

1. **Enable auto-sync in ArgoCD UI**: 
   - Navigate to your application
   - Click on "App Details"
   - Click on "Edit"
   - Check "Enable Auto-Sync" and select your preferred sync policy

2. **Using ArgoCD Image Updater**:
   - Install ArgoCD Image Updater:
     ```bash
     kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj-labs/argocd-image-updater/stable/manifests/install.yaml
     ```
   - Configure image update automation for your application

## Troubleshooting

If your application fails to sync:

1. Check the sync status in the ArgoCD UI
2. Look at the events for each resource
3. Check ArgoCD logs:
   ```bash
   kubectl -n argocd logs -l app.kubernetes.io/name=argocd-server
   ```
4. Check application logs:
   ```bash
   kubectl -n argocd logs -l app.kubernetes.io/name=argocd-application-controller
   ```
