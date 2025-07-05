import puppeteer from 'puppeteer';

export async function GET(request) {
    const browser = await puppeteer.launch({executablePath: '/vercel/.cache/puppeteer/chrome/linux-138.0.7204.92/chrome-linux64/chrome'});

    const page = await browser.newPage();
    await page.goto('https://example.com');
    const title = await page.title();
    await browser.close();

    return new Response(title);
}