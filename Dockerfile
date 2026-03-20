# Supports both ARM and x86_64
FROM mcr.microsoft.com/playwright:v1.52.0-noble

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (for better cache)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the files
COPY . .

# Set CI environment variable to true
ENV CI=true

# Default command
CMD ["npm", "test"]
