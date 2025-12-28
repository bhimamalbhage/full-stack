# Use Node.js Alpine for smallest image size
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (production only for faster builds)
RUN npm ci --only=production

# Copy application files
COPY server.js ./
COPY public ./public

# Expose port
EXPOSE 3000

# Health check for AWS
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Run the application
CMD ["node", "server.js"]
