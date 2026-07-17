FROM node:20-alpine

# Install nginx
RUN apk add --no-cache nginx

# Copy files
COPY index.html /usr/share/nginx/html/index.html
COPY proxy.js /app/proxy.js

# Setup Nginx dengan proxy pass ke /ws
RUN echo 'server { \
    listen 80; \
    root /usr/share/nginx/html; \
    index index.html; \
    location / { try_files $uri $uri/ =404; } \
    location /ws { \
        proxy_pass http://127.0.0.1:8080; \
        proxy_http_version 1.1; \
        proxy_set_header Upgrade $http_upgrade; \
        proxy_set_header Connection "upgrade"; \
    } \
}' > /etc/nginx/http.d/default.conf

# Setup Proxy
WORKDIR /app
RUN npm init -y && npm install ws

# Jalankan nginx + proxy
CMD ["sh", "-c", "nginx && node proxy.js & tail -f /dev/null"]
