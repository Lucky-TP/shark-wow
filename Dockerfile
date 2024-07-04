# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.11.0

################################################################################
# Use node image for base image for all stages.
FROM node:${NODE_VERSION}-alpine as base

# Set working directory for all build stages.
WORKDIR /app

################################################################################
# Create a stage for installing all dependencies.
FROM base as deps

# Copy package files
COPY package.json package-lock.json ./

# Install all dependencies, including devDependencies.
RUN npm ci

################################################################################
# Create a new stage for development
FROM deps as development

# Use development node environment by default.
ENV NODE_ENV=development

# Copy the rest of the source files into the image.
COPY . .

# Copy the service account key file
COPY servicekey.json .

# Set the GOOGLE_APPLICATION_CREDENTIALS environment variable
# ENV GOOGLE_APPLICATION_CREDENTIALS=/app/servicekey.json

# Expose the port that the application listens on.
EXPOSE 3000

# Run the application using Next.js development server.
CMD ["npm", "run", "dev"]

################################################################################
# # Create a new stage for production to keep things separated
# FROM deps as production

# # Use production node environment by default.
# ENV NODE_ENV=production

# # Copy the rest of the source files into the image.
# COPY . .

# # Copy the service account key file
# COPY servicekey.json .

# # Set the GOOGLE_APPLICATION_CREDENTIALS environment variable
# # ENV GOOGLE_APPLICATION_CREDENTIALS=./servicekey.json

# # Run the build script.
# RUN npm run build

# # Expose the port that the application listens on.
# EXPOSE 3000

# # Run the application.
# CMD ["npm", "start"]