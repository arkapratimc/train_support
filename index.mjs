import http from 'http';
import fs from 'fs'; // or `import * as fs from 'fs';` if using fs methods directly
import puppeteer from 'puppeteer';
import path from 'path';
import querystring from 'querystring';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



/* async function test() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Navigate the page to a URL
    await page.goto('https://developer.chrome.com/');

    // Set screen size
    await page.setViewport({ width: 1080, height: 1024 });

    // Type into search box
    await page.type('.devsite-search-field', 'automate beyond recorder');

    // Wait and click on first result
    const searchResultSelector = '.devsite-result-item-link';
    await page.waitForSelector(searchResultSelector);
    await page.click(searchResultSelector);

    // Locate the full title with a unique string
    const textSelector = await page.waitForSelector(
        'text/Customize and automate',
    );
    const fullTitle = await textSelector?.evaluate(el => el.textContent);

    // Print the full title
    console.log('The title of this blog post is "%s".', fullTitle);

    await browser.close();
}
test().catch(err => console.error(err))
*/



const browser = await puppeteer.launch();
const PAGE = await browser.newPage();
await PAGE.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36");


function serveFile(filePath, contentType, res) {
    fs.readFile(path.join(__dirname, filePath), (err, data) => {
        if (err) {
            res.writeHead(500);
            return res.end('500 Server Error');
        }
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
}


const server = http.createServer((req, res) => {
    // Simple routing
    if (req.url === '/' || req.url === '/index.html') {
        serveFile('public/index.html', 'text/html', res);
    } else if (req.url === '/style.css') {
        serveFile('public/style.css', 'text/css', res);
    } else if (req.url === '/code.js') {
        serveFile('public/code.js', 'text/javascript', res);
    } else if (req.method === "POST" && req.url === "/train-number-check") {
        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", async () => {
            const data = querystring.parse(body);
            console.log(data);
            /* PAGE.goto("https://enquiry.indianrail.gov.in/mntes/").then((res) => {
                console.log(res);
            })
            .catch(err => {
                console.error(err);
            }) */
            await PAGE.goto("https://enquiry.indianrail.gov.in/mntes/", { waitUntil: 'networkidle2' });
            await PAGE.screenshot({ path: 'example.png' });  // ⬅️ Get the page's <title>

            
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(`Received train number: ${data.train_number}`);
        });
    } else if (req.url === "/favicon.ico") {
        res.writeHead(204); // No Content
        return res.end();
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});


function handleExit(type, err) {
  console.log(`💥 Exiting due to: ${type}`);
  if (err) console.error(err);
  // your cleanup logic here
  browser.close().catch(err => console.error(err))
  process.exit(1);
}

// Attach all relevant handlers
process.on('exit', () => handleExit('exit'));
process.on('SIGINT', () => handleExit('SIGINT'));
process.on('SIGTERM', () => handleExit('SIGTERM'));
process.on('uncaughtException', err => handleExit('uncaughtException', err));
process.on('unhandledRejection', reason => handleExit('unhandledRejection', reason));
