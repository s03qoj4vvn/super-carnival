const http = require("http");
const fs = require("fs");
const puppeteer = require("puppeteer");

http.createServer((req, res) => {
    fs.readFile("index.html", (err, data) => {
        if (err) {
            res.writeHead(500);
            return res.end(err.toString());
        }

        res.writeHead(200, {
            "Content-Type": "text/html"
        });

        res.end(data);
    });
}).listen(80, () => {
    console.log("Web running on :80");
});

(async () => {
    const browser = await puppeteer.launch({
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox"]
    });

    const page = await browser.newPage();
    await page.goto("http://localhost");

    console.log("Browser opened");
})();
