# CineBooker - Cinema Booking Application

A modern cinema ticket booking application built with React, TypeScript, and Tailwind CSS.

## Overview

CineBooker is a web application for movie ticket booking that allows users to:
- Browse movie listings
- View movie details
- Select showtimes
- Choose seats
- Complete bookings

## Getting Started

### Development Setup

To set up the development environment:

```bash
# Clone the repository
git clone https://github.com/yourusername/cinebooker.git
cd cinebooker

# Install dependencies
npm install

# Start development server
npm run dev
```

## Deployment Options

CineBooker can be deployed in several ways:

- [Standalone Docker Container](./docs/docker-deployment.md)
- [Kubernetes Deployment](./docs/kubernetes-deployment.md)
- [ArgoCD Deployment](./docs/argocd-deployment.md)
- [Jenkins CI/CD Pipeline](./docs/jenkins-pipeline.md)

## Architecture

The CineBooker deployment architecture consists of:

- **Frontend**: React application served by Nginx
- **Infrastructure**:
  - Docker container for application packaging
  - Kubernetes for orchestration
  - ArgoCD for GitOps-based continuous delivery
  - Jenkins for CI/CD pipeline

## Need Help?

For troubleshooting information, please see our [Troubleshooting Guide](./docs/troubleshooting.md).