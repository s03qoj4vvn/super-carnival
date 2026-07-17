FROM node:20-alpine

# Install nginx + dependencies
RUN apk add --no-cache nginx curl

# Copy files
COPY index.html /usr/share/nginx/html/index.html
COPY proxy.js /app/proxy.js

# Setup Nginx
RUN echo 'server { listen 80; root /usr/share/nginx/html; index index.html; }' > /etc/nginx/http.d/default.conf

# Install proxy deps
WORKDIR /app
RUN npm init -y && npm install ws

# Jalankan semuanya otomatis
CMD ["sh", "-c", "nginx && node proxy.js & tail -f /dev/null"]
