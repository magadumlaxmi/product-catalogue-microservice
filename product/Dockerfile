# Stage 1: Build Stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

# Stage 2: Production Stage
FROM node:20-slim
WORKDIR /app

# Copy only built app from builder stage
COPY --from=builder /app .

# Expose port
EXPOSE 3000

# Set environment variable (optional)
ENV NODE_ENV=production

# Add healthcheck (optional for Docker monitoring)
HEALTHCHECK --interval=30s --timeout=5s CMD curl -f http://localhost:3000/health || exit 1

# Run the app
CMD ["node", "server.js"]
