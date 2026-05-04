#!/bin/bash

sudo apt update -y
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker

sudo usermod -aG docker ubuntu

sleep 10

docker pull khokhar95/flic-ai:latest

docker run -d \
  --name flic-ai \
  --restart always \
  -p 3000:3000 \
  khokhar95/flic-ai:latest