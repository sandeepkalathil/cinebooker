
provider "aws" {
  region = var.aws_region
}

# VPC and Networking
module "vpc" {
  source = "terraform-aws-modules/vpc/aws"

  name = "task-manager-vpc"
  cidr = "10.0.0.0/16"

  azs = ["${var.aws_region}a", "${var.aws_region}b"]

  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]

  enable_nat_gateway = true
  single_nat_gateway = true
}

# Jenkins Master EC2 Instance
resource "aws_instance" "jenkins_master" {
  ami           = "ami-09a9858973b288bdd" # Ubuntu 24.04 LTS for eu-north-1
  instance_type = "t3.medium"
  subnet_id     = module.vpc.public_subnets[0]
  associate_public_ip_address = true
  vpc_security_group_ids = [aws_security_group.jenkins_master.id]
  key_name              = "jenkins-node-key"
  iam_instance_profile = "MySessionManagerrole"
  root_block_device {
    volume_size = 50
    volume_type = "gp3"
  }

  user_data = <<-EOF
              #!/bin/bash
              # Install Java
              apt-get update
              
               # Install required packages
              apt-get update
              apt-get install -y gnupg curl

              # Add the correct Jenkins repository key
              curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io-2023.key | sudo tee \
                /usr/share/keyrings/jenkins-keyring.asc > /dev/null

              # Add Jenkins repository
              echo "deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] https://pkg.jenkins.io/debian-stable binary/" | sudo tee \
                /etc/apt/sources.list.d/jenkins.list > /dev/null

              # Update package lists again
              apt-get update

              # Install Java and Jenkins
              apt-get install -y openjdk-17-jdk jenkins

              # Enable and start Jenkins service
              systemctl enable jenkins
              systemctl start jenkins

              # Install AWS CLI
              apt-get install -y unzip
              curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
              unzip awscliv2.zip
              ./aws/install

             
              # Install Docker
              apt-get install -y apt-transport-https ca-certificates curl software-properties-common
              curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
              add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
              apt-get update
              apt-get install -y docker-ce docker-ce-cli containerd.io
              usermod -aG docker ubuntu
              usermod -aG docker jenkins

              # Install Docker Compose
              curl -L "https://github.com/docker/compose/releases/download/v2.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
              chmod +x /usr/local/bin/docker-compose
              EOF

  tags = {
    Name = "jenkins-master"
  }
}

# Security Group for Jenkins Master
resource "aws_security_group" "jenkins_master" {
  name        = "jenkins-master-sg"
  description = "Security group for Jenkins master"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Consider restricting to your IP in production
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Consider restricting to your IP in production
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Jenkins Build Node with SonarQube EC2 Instance
resource "aws_instance" "jenkins_node" {
  ami           = "ami-09a9858973b288bdd" # Ubuntu 24.04 LTS for eu-north-1
  instance_type = "t3.large" # Upgraded to large for SonarQube
  subnet_id     = module.vpc.public_subnets[0]
  associate_public_ip_address = true
  vpc_security_group_ids = [aws_security_group.jenkins_node.id]
  key_name              = "jenkins-node-key"
  iam_instance_profile = "MySessionManagerrole"
  root_block_device {
    volume_size = 50  # Increased for SonarQube
    volume_type = "gp3"
  }

  user_data = <<-EOF
              #!/bin/bash
              # Install Docker
              apt-get update
              apt-get install -y apt-transport-https ca-certificates curl software-properties-common
              curl -fsSL https://download.docker.com/linux/ubuntu/gpg | apt-key add -
              add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
              apt-get update
              apt-get install -y docker-ce docker-ce-cli containerd.io
              usermod -aG docker ubuntu

              # Install Java
              apt-get install -y openjdk-17-jdk

              # Install AWS CLI
              apt-get install -y unzip
              curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
              unzip awscliv2.zip
              ./aws/install

              # Create Jenkins workspace directory
              mkdir -p /home/ubuntu/jenkins-agent
              chown -R ubuntu:ubuntu /home/ubuntu/jenkins-agent

              # Install SonarQube using Docker
              mkdir -p /opt/sonarqube/data
              mkdir -p /opt/sonarqube/logs
              mkdir -p /opt/sonarqube/extensions
              
              chown -R 1000:1000 /opt/sonarqube

              cat > /opt/sonarqube/docker-compose.yml <<EOL
              version: '3'
              services:
                sonarqube:
                  image: sonarqube:latest
                  ports:
                    - "9000:9000"
                  environment:
                    - SONAR_JDBC_URL=jdbc:postgresql://db:5432/sonar
                    - SONAR_JDBC_USERNAME=sonar
                    - SONAR_JDBC_PASSWORD=sonar
                  volumes:
                    - /opt/sonarqube/data:/opt/sonarqube/data
                    - /opt/sonarqube/logs:/opt/sonarqube/logs
                    - /opt/sonarqube/extensions:/opt/sonarqube/extensions
                  depends_on:
                    - db
                db:
                  image: postgres:13
                  environment:
                    - POSTGRES_USER=sonar
                    - POSTGRES_PASSWORD=sonar
                    - POSTGRES_DB=sonar
                  volumes:
                    - postgresql_data:/var/lib/postgresql/data
              
              volumes:
                postgresql_data:
              EOL

              cd /opt/sonarqube
              docker-compose up -d
              EOF

  tags = {
    Name = "jenkins-node-sonarqube"
  }
}

# Security Group for Jenkins Node with SonarQube
resource "aws_security_group" "jenkins_node" {
  name        = "jenkins-node-sg"
  description = "Security group for Jenkins build node with SonarQube"
  vpc_id      = module.vpc.vpc_id

  ingress {
    from_port       = 22
    to_port         = 22
    protocol        = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 9000
    to_port     = 9000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # SonarQube UI port
  }

  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = [module.vpc.vpc_cidr_block]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# K3s Node with ArgoCD EC2 Instance
resource "aws_instance" "k3s_argocd" {
  ami           = "ami-09a9858973b288bdd" # Ubuntu 24.04 LTS for eu-north-1
  instance_type = "t3.medium"
  subnet_id     = module.vpc.public_subnets[0]
  associate_public_ip_address = true
  vpc_security_group_ids = [aws_security_group.k3s_argocd.id]
  key_name              = "jenkins-node-key"
  iam_instance_profile = "MySessionManagerrole"
  root_block_device {
    volume_size = 40
    volume_type = "gp3"
  }

  user_data = <<-EOF
              #!/bin/bash
              # Install K3s
              curl -sfL https://get.k3s.io | sh -

              # Wait for K3s to be ready
              sleep 30

              # Set up kubeconfig for the ubuntu user
              mkdir -p /home/ubuntu/.kube
              cp /etc/rancher/k3s/k3s.yaml /home/ubuntu/.kube/config
              chown -R ubuntu:ubuntu /home/ubuntu/.kube
              export KUBECONFIG=/home/ubuntu/.kube/config
              echo "export KUBECONFIG=/home/ubuntu/.kube/config" >> /home/ubuntu/.bashrc

              # Install kubectl
              curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
              chmod +x kubectl
              mv kubectl /usr/local/bin/

              # Install Helm
              curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

              # Install ArgoCD
              kubectl create namespace argocd
              kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml

              # Wait for ArgoCD to be ready
              sleep 60

              # Install ArgoCD CLI
              curl -sSL -o argocd-linux-amd64 https://github.com/argoproj/argo-cd/releases/latest/download/argocd-linux-amd64
              chmod +x argocd-linux-amd64
              mv argocd-linux-amd64 /usr/local/bin/argocd

              # Install ArgoCD Image Updater
              kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj-labs/argocd-image-updater/stable/manifests/install.yaml

              # Expose ArgoCD server
              kubectl patch svc argocd-server -n argocd -p '{"spec": {"type": "LoadBalancer", "ports": [{"port": 8081, "targetPort": 8080, "name": "http"}, {"port": 8443, "targetPort": 443, "name": "https"}]}}'

              # Get ArgoCD admin password and save it to a file
              echo "Waiting for ArgoCD password to be available..."
              sleep 30
              kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 -d > /home/ubuntu/argocd-password.txt
              chown ubuntu:ubuntu /home/ubuntu/argocd-password.txt
              sudo apt install docker.io -y

              # Start and enable Docker service
              sudo systemctl start docker
              sudo systemctl enable docker

              #grant access to your user to run the docker command, you should add the user to the Docker Linux group. Docker group is create by default when docker is installed.

              sudo usermod -aG docker ubuntu
              EOF

  tags = {
    Name = "k3s-argocd-node"
  }
}

# Security Group for K3s and ArgoCD
resource "aws_security_group" "k3s_argocd" {
  name        = "k3s-argocd-sg"
  description = "Security group for K3s with ArgoCD"
  vpc_id      = module.vpc.vpc_id

  # SSH access
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Consider restricting to your IP
  }

  # K3s API
  ingress {
    from_port   = 6443
    to_port     = 6443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Consider restricting in production
  }

  # ArgoCD UI
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 30000
    to_port     = 32767
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Allow all traffic from within the VPC
  ingress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = [module.vpc.vpc_cidr_block]
  }

  # All outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

# Output section
output "jenkins_master_public_ip" {
  value = aws_instance.jenkins_master.public_ip
  description = "Public IP of Jenkins Master"
}

output "jenkins_node_public_ip" {
  value = aws_instance.jenkins_node.public_ip
  description = "Public IP of Jenkins Node with SonarQube"
}

output "k3s_argocd_public_ip" {
  value = aws_instance.k3s_argocd.public_ip
  description = "Public IP of K3s Node with ArgoCD"
}
