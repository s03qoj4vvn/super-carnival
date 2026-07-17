FROM node:20

RUN apt-get update && apt-get install -y \
    chromium \
    --no-install-recommends && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY index.html .
COPY proxy.js .

RUN npm init -y && npm install ws puppeteer

# Jalankan semua service
CMD ["sh", "-c", "node proxy.js & node -e '
const http = require(\"http\");
const fs = require(\"fs\");
http.createServer((req, res) => {
  fs.readFile(\"index.html\", (err, data) => {
    res.writeHead(200, {\"Content-Type\": \"text/html\"});
    res.end(data);
  });
}).listen(80);

const puppeteer = require(\"puppeteer\");
(async () => {
  const browser = await puppeteer.launch({ headless: true, args: [\"--no-sandbox\"] });
  const page = await browser.newPage();
  await page.goto(\"http://localhost\");
  console.log(\"✅ Browser opened and mining started\");
})();
' & tail -f /dev/null"]
