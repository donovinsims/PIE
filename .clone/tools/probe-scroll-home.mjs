import { chromium } from "/Users/forex/.config/ai-skills/pixel-perfect-clone/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: true });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 })).newPage();
await page.goto("https://www.pietrospizzeria.net/", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(4000);
// scroll in steps and let animations fire
for (let y = 0; y < 5200; y += 400) {
  await page.evaluate((y) => window.scrollTo(0, y), y);
  await page.waitForTimeout(220);
}
await page.waitForTimeout(1500);
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(1200);
await page.screenshot({ path: "/tmp/home-scrolled.png", fullPage: true });
const rows = await page.evaluate(() => [...document.querySelectorAll(".dmRespRow")].map((r) => { const re = r.getBoundingClientRect(); return (r.className || "").toString().slice(0, 44) + " y=" + Math.round(re.y) + " h=" + Math.round(re.height) + " op=" + getComputedStyle(r).opacity; }).slice(4, 30));
console.log(rows.join("\n"));
await browser.close();
