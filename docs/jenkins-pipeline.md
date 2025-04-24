
# Jenkins CI/CD Pipeline Guide

This guide describes how to set up and use the Jenkins pipeline for CineBooker's continuous integration and deployment.

## Prerequisites

- Jenkins server with pipeline support
- Docker installed on Jenkins nodes
- Node.js installed on Jenkins nodes
- SonarQube server for code quality analysis
- Access to Docker Hub or another container registry
- Kubernetes cluster with ArgoCD installed

## Required Jenkins Plugins

The following plugins need to be installed on your Jenkins master:

1. **Pipeline plugins**:
   - Pipeline
   - Pipeline: API
   - Pipeline: Basic Steps
   - Pipeline: Groovy
   - Pipeline: Job
   - Pipeline: Stage Step
   - Pipeline: Stage View
   - Pipeline: REST API

2. **Git integration**:
   - Git
   - Git Client
   - GitHub Integration

3. **Docker integration**:
   - Docker
   - Docker Pipeline
   - Docker API

4. **Build tools & integration**:
   - NodeJS
   - SonarQube Scanner

5. **Credential management**:
   - Credentials
   - Credentials Binding

6. **Workspace management**:
   - Workspace Cleanup

7. **Test & reporting**:
   - JUnit
   - HTML Publisher

8. **UI & visualization**:
   - Blue Ocean (optional but recommended for better pipeline visualization)

9. **Agent management**:
   - SSH Build Agents

## Setting Up Jenkins Pipeline

### 1. Prerequisites Configuration

Create credentials in Jenkins for:
- GitHub access (`github-credentials`)
- Docker Hub access (`docker-hub-credentials`)
- SonarQube access (`sonar-token`)

### 2. Set up the pipeline

1. Create a new Pipeline job in Jenkins
2. Configure it to use the Jenkinsfile from the repository
3. Specify the branch to build (default: `main`)

### 3. Configure Pipeline Parameters

Configure the following parameters:
- `BRANCH_NAME`: Git branch to build (default: `main`)
- `DOCKER_TAG`: Docker image tag (default: `latest`)
- `DOCKER_REGISTRY`: Docker registry (default: `docker.io`)
- `DOCKER_REPO`: Docker repository (default: `yourusername/cinebooker`)
- `SONAR_PROJECT_KEY`: SonarQube project key (default: `cinebooker`)
- `ARGOCD_UPDATER_URL`: ArgoCD Image Updater URL

### 4. Tool Configuration

In "Manage Jenkins" > "Global Tool Configuration":
1. Configure NodeJS installation
2. Configure SonarQube Scanner

### 5. Run the pipeline

The pipeline will:
- Check out code from the git repository
- Install dependencies and run tests
- Analyze code with SonarQube
- Build and scan a Docker image
- Push the image to Docker Hub
- Notify ArgoCD Image Updater to deploy the new version

## Pipeline Stages

The pipeline consists of these main stages:

1. **Code Checkout**: Pulls the code from the repository
2. **Build & Test**: Builds the application and runs tests
3. **SonarQube Analysis**: Analyzes code quality
4. **Docker Image Build & Security Scan**: Builds and scans the Docker image
5. **Push to Docker Hub**: Pushes the image to Docker Hub
6. **Update ArgoCD Image Updater**: Notifies ArgoCD to deploy the new version

## Troubleshooting

If the pipeline fails:

1. Check the Jenkins console output for detailed error messages
2. Verify credentials are correctly set up in Jenkins
3. Ensure Jenkins has sufficient permissions to access required resources
4. Check that all required tools (Node.js, Docker, etc.) are properly installed
5. Verify connectivity to external services (SonarQube, Docker Hub, ArgoCD)
