FROM jenkins/jenkins:lts
USER root
RUN apt-get update && \
      apt-get -y install sudo
RUN useradd -m docker && echo "docker:docker" | chpasswd && adduser docker sudo
RUN curl -fsSL https://get.docker.com -o get-docker.sh
RUN sh get-docker.sh
RUN curl -L "https://github.com/docker/compose/releases/download/1.26.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
RUN chmod +x /usr/local/bin/docker-compose
RUN usermod -aG docker jenkins
USER jenkins
