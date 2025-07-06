const http = require('http');
const fs = require('fs');
const puppeteer = require("puppeteer");
const path = require('path');

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

let PAGE = undefined;

async function open_the_browser() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    PAGE = page;
}

open_the_browser().then(() => console.log("the browser & a new page opened")).catch(err => console.error(`something happened`));

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
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
