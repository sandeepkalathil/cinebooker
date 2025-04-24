
# Jenkins Shared Library for CineBooker

This shared library contains reusable pipeline steps for the CineBooker CI/CD pipeline.

## Directory Structure

- `vars/`: Contains global variables/functions that can be called from a Jenkinsfile
  - `buildAndTest.groovy`: Handles npm build and test steps
  - `sonarAnalysis.groovy`: Runs SonarQube analysis
  - `buildDockerImage.groovy`: Builds and scans Docker images
  - `pushToDockerHub.groovy`: Pushes images to Docker Hub
  - `updateArgoCD.groovy`: Notifies ArgoCD about new images
  - `cleanup.groovy`: Cleans up resources after pipeline execution

## Required Jenkins Plugins

For this shared library to work correctly, you need the following plugins installed on your Jenkins master:

1. **Pipeline plugins**:
   - Pipeline
   - Pipeline: API
   - Pipeline: Basic Steps
   - Pipeline: Groovy
   - Pipeline: Job
   - Pipeline: Stage Step

2. **Docker integration**:
   - Docker
   - Docker Pipeline

3. **SonarQube integration**:
   - SonarQube Scanner

4. **Credential management**:
   - Credentials Binding

5. **Reporting plugins**:
   - JUnit
   - HTML Publisher

## Usage

To use this shared library in your Jenkins instance:

1. In Jenkins, navigate to "Manage Jenkins" > "Configure System"
2. Under "Global Pipeline Libraries", add a new library:
   - Name: `cinebooker-pipeline-library`
   - Default version: `main`
   - Retrieval method: "Modern SCM"
   - Select "Git" and provide the repository URL

Once configured, you can use the library in your Jenkinsfile:

```groovy
@Library('cinebooker-pipeline-library') _

pipeline {
    // ... your pipeline configuration
    
    stages {
        stage('Build & Test') {
            steps {
                buildAndTest()
            }
        }
        
        // ... other stages using shared library functions
    }
}
```

## Extending the Library

To add new functionality:

1. Create a new `.groovy` file in the `vars/` directory
2. Define a `call()` method with any necessary parameters
3. Implement the functionality you need
4. Commit and push to the shared library repository

