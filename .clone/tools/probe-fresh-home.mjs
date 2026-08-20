import { chromium } from "/Users/forex/.config/ai-skills/pixel-perfect-clone/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: true });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 })).newPage();
await page.goto("https://www.pietrospizzeria.net/", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(6000);
await page.screenshot({ path: "/tmp/home-fresh.png", fullPage: true });
// also check which images actually loaded
const info = await page.evaluate(() => {
  const imgs = [...document.querySelectorAll("img")].map((i) => ({ src: (i.currentSrc || i.src).split("/").pop().slice(0, 40), w: i.naturalWidth, h: i.naturalHeight, r: (() => { const b = i.getBoundingClientRect(); return `${Math.round(b.x)},${Math.round(b.y)} ${Math.round(b.width)}x${Math.round(b.height)}`; })() })).filter((i) => i.w > 0);
  const bg = [...document.querySelectorAll("[style*='background-image'], .hasBackgroundOverlay")].map((el) => ({ cls: (el.className || "").toString().slice(0, 50), bg: (getComputedStyle(el).backgroundImage || "").slice(5, 90) })).filter((b) => b.bg);
  return { imgs, bg };
});
console.log(JSON.stringify(info, null, 1));
await browser.close();
