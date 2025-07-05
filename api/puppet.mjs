import puppeteer, {executablePath} from 'puppeteer-core';

export async function GET(request) {
    const browser = await puppeteer.launch({
        executablePath: executablePath()
    });

    const page = await browser.newPage();
    await page.goto('https://example.com');
    const title = await page.title();
    await browser.close();

    return new Response(title);
}