
# Docker Deployment Guide

This guide describes how to deploy CineBooker as a standalone Docker container.

## Prerequisites

- Docker installed on your server
- Access to the internet to pull images
- Basic knowledge of Docker commands

## Deployment Steps

### 1. Build the Docker image

```bash
docker build -t cinebooker:latest .
```

This command builds a Docker image using the `Dockerfile` in the root directory.

### 2. Run the container

```bash
docker run -d -p 80:80 --name cinebooker cinebooker:latest
```

This command:
- `-d`: Runs the container in detached mode
- `-p 80:80`: Maps port 80 on the host to port 80 in the container
- `--name cinebooker`: Names the container "cinebooker"
- `cinebooker:latest`: Uses the image we built in the previous step

### 3. Access the application

Open your browser and navigate to `http://localhost:80` or the IP address of your server.

## Configuration Options

You can configure the container by passing environment variables:

```bash
docker run -d -p 80:80 \
  -e NGINX_HOST=mycinema.example.com \
  -e NGINX_PORT=80 \
  --name cinebooker cinebooker:latest
```

## Health Checks

To verify that the container is running properly:

```bash
docker ps | grep cinebooker  # Should show the container running
docker logs cinebooker       # View container logs
```

## Stopping and Removing

To stop and remove the container:

```bash
docker stop cinebooker
docker rm cinebooker
```

## Updating the Application

To update to a new version:

```bash
# Pull the latest code
git pull

# Build a new image
docker build -t cinebooker:latest .

# Stop and remove the old container
docker stop cinebooker
docker rm cinebooker

# Run a new container with the updated image
docker run -d -p 80:80 --name cinebooker cinebooker:latest
```
