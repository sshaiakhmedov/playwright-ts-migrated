# Optimized for Playwright test execution
FROM mcr.microsoft.com/playwright:v1.52.0-jammy

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first for optimized layer caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Set CI environment variable to ensure headless mode and consolidated reports
ENV CI=true

# Default command to execute all tests (UI + API)
CMD ["npm", "run", "test:all:chrome"]
