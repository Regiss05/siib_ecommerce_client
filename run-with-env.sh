#!/bin/bash

CONTAINER_NAME=siib-frontend
IMAGE_NAME=ecomerce-frontend:latest

# Ensure .env exists
if [ ! -f .env ]; then
  echo "❌ .env file not found!"
  exit 1
fi

# Stop and remove existing container (if running)
if [ "$(docker ps -aq -f name=^${CONTAINER_NAME}$)" ]; then
  echo "🛑 Stopping and removing existing container: $CONTAINER_NAME"
  docker rm -f $CONTAINER_NAME
fi

# Run container with .env
echo "🚀 Starting container $CONTAINER_NAME from image $IMAGE_NAME..."
docker run --name $CONTAINER_NAME \
  -p 3000:8080 \
  -d  $IMAGE_NAME
echo "✅ Container $CONTAINER_NAME started successfully in detached mode."
