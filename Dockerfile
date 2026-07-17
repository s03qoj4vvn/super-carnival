FROM node:20

RUN apt-get update && \
    apt-get install -y chromium --no-install-recommends && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json* ./
RUN npm init -y && npm install ws puppeteer

COPY index.html .
COPY proxy.js .
COPY server.js .

CMD sh -c "node proxy.js & node server.js"
