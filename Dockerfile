# ---------- Stage 1: Build React App ----------
FROM node:20-alpine AS builder

# Set memory limit to avoid build failures
ENV NODE_OPTIONS=--max-old-space-size=2048

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy source files
COPY . .

# Build React app
RUN npm run build

# ---------- Stage 2: Nginx Web Server ----------
FROM nginx:alpine

# Copy built app from previous stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy updated Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set correct permissions (optional in many cases)
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d

# Expose HTTP (port 80) — no need for 8080 unless you're changing Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
