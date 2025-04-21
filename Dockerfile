FROM node:20-alpine AS builder
# Create app directory
RUN NODE_OPTIONS=--max-old-space-size=2048
WORKDIR /app
# add /app/node_modules/.bin to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./
RUN npm install --legacy-peer-deps
#To bundle your app’s source code inside the Docker image, use the COPY instruction:
COPY . /app
RUN npm run build

FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
WORKDIR /app
RUN chown -R nginx:nginx /app && chmod -R 755 /app && \
        chown -R nginx:nginx /var/cache/nginx && \
        chown -R nginx:nginx /var/log/nginx && \
        chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
        chown -R nginx:nginx /var/run/nginx.pid
USER root
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
