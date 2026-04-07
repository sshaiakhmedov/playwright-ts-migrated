#!/bin/bash

# Simple script to build and run the Playwright tests in Docker

# Step 1: Build the Docker image
echo "Building the Playwright Docker image..."
docker build -t pw-tests .

# Step 2: Run the tests in the container
echo "Running tests in the Docker container..."
docker run --rm pw-tests
