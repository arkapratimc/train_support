import { chromium } from 'playwright';

export async function GET(request) {
    // lets try with playwright ??
    const browser = await chromium.launch();
    const page = await browser.newPage();

    await page.goto('https://example.com');

    const title = await page.title();
    console.log('Page title:', title);

    await browser.close();

    return new Response(title);
}