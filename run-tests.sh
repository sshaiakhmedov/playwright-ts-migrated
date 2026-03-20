#!/bin/bash

# Check if the --skip-build flag is passed
SKIP_BUILD=false
if [[ "$1" == "--skip-build" ]]; then
  SKIP_BUILD=true
fi

# Step 1: Build the Docker image (if not skipping)
if [ "$SKIP_BUILD" = false ]; then
  echo "Building the Docker image..."
  docker build --platform linux/amd64 -t pw-tests .
else
  echo "Skipping Docker image build..."
fi

# Step 2: Run the container and execute tests
echo "Running Playwright tests in Docker container..."
docker run --platform linux/amd64 --rm pw-tests
