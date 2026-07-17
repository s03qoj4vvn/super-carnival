FROM nginx:alpine

# Copy web file
COPY index.html /usr/share/nginx/html/index.html

EXPOSE 80
