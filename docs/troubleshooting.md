
# Troubleshooting Guide

This guide provides solutions to common issues you might encounter when deploying or running CineBooker.

## Docker Issues

### Container not starting

**Symptoms**: Docker container exits immediately or fails to start

**Solutions**:
1. Check Docker logs:
   ```bash
   docker logs cinebooker
   ```
2. Verify the image exists:
   ```bash
   docker images | grep cinebooker
   ```
3. Ensure ports are not in use:
   ```bash
   netstat -tuln | grep 80
   ```
4. Check if the container has enough resources:
   ```bash
   docker stats
   ```

### Image not found

**Symptoms**: "Image not found" error when running the container

**Solutions**:
1. Check if the image exists locally:
   ```bash
   docker images | grep cinebooker
   ```
2. Pull the image from Docker Hub:
   ```bash
   docker pull yourusername/cinebooker:latest
   ```
3. Verify Docker Hub credentials if using a private repository:
   ```bash
   docker login
   ```

## Kubernetes Issues

### Pods not running

**Symptoms**: Pods show status "Pending", "CrashLoopBackOff", or "Error"

**Solutions**:
1. Check pod status:
   ```bash
   kubectl -n cinebooker get pods
   ```
2. Check pod details:
   ```bash
   kubectl -n cinebooker describe pod <pod-name>
   ```
3. Check pod logs:
   ```bash
   kubectl -n cinebooker logs <pod-name>
   ```
4. Verify cluster resources:
   ```bash
   kubectl top nodes
   ```

### Service issues

**Symptoms**: Unable to access the application through the service

**Solutions**:
1. Verify service exists:
   ```bash
   kubectl -n cinebooker get service cinebooker
   ```
2. Check service details:
   ```bash
   kubectl -n cinebooker describe service cinebooker
   ```
3. Ensure service selector matches pod labels:
   ```bash
   kubectl -n cinebooker get pods --show-labels
   ```

### Ingress problems

**Symptoms**: Unable to access the application through the domain name

**Solutions**:
1. Check ingress configuration:
   ```bash
   kubectl -n cinebooker describe ingress cinebooker
   ```
2. Verify DNS resolution:
   ```bash
   nslookup cinebooker.yourdomain.com
   ```
3. Check ingress controller logs:
   ```bash
   kubectl -n ingress-nginx logs -l app.kubernetes.io/name=ingress-nginx
   ```

## Jenkins Pipeline Issues

**Symptoms**: Pipeline fails at a specific stage

**Solutions**:
1. Check Jenkins console output for detailed error messages
2. Verify credentials are correctly set up in Jenkins
3. Ensure Jenkins has sufficient permissions to access required resources
4. Check connectivity to external services:
   - GitHub: `curl -I https://github.com`
   - SonarQube: `curl -I https://sonarqube.your-domain.com`
   - Docker Hub: `curl -I https://hub.docker.com`
   - ArgoCD: `curl -I http://argocd-image-updater.argocd:8080`

## ArgoCD Issues

**Symptoms**: Application not syncing or not deploying correctly

**Solutions**:
1. Check application status in ArgoCD UI
2. Verify Git repository access and configuration
3. Check ArgoCD logs:
   ```bash
   kubectl -n argocd logs -l app.kubernetes.io/name=argocd-server
   ```
4. Check application logs:
   ```bash
   kubectl -n argocd logs -l app.kubernetes.io/name=argocd-application-controller
   ```
5. Verify the application manifest:
   ```bash
   kubectl -n argocd get application cinebooker -o yaml
   ```

## Additional Help

If you continue to experience issues:

1. Check GitHub Issues for similar problems and solutions
2. Contact your system administrator or DevOps team
3. Consult the documentation for the specific tool or service that's causing issues
