# ==============================================================================
# Multi-stage Dockerfile for QwenCore Pomodoro Timer
# Author: donny-devops
# ==============================================================================

# ------------------------------------------------------------------------------
# Stage 1: Build the application
# ------------------------------------------------------------------------------
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# ------------------------------------------------------------------------------
# Stage 2: Production image with nginx
# ------------------------------------------------------------------------------
FROM nginx:alpine AS production

# Copy custom nginx configuration
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:80/ || exit 1

# Expose port
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

# ------------------------------------------------------------------------------
# Stage 3: Development image (optional)
# ------------------------------------------------------------------------------
FROM node:20-alpine AS development

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (including dev dependencies)
RUN npm install

# Copy source code
COPY . .

# Expose Vite dev server port
EXPOSE 5173

# Start development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# Labels
LABEL maintainer="donny-devops"
LABEL org.opencontainers.image.source="https://github.com/donny-devops/qwencore"
LABEL org.opencontainers.image.description="QwenCore - Pomodoro Web Tool"
LABEL org.opencontainers.image.licenses="MIT"
