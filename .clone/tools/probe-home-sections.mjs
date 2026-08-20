import { chromium } from "/Users/forex/.config/ai-skills/pixel-perfect-clone/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: true });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 })).newPage();
await page.goto("https://www.pietrospizzeria.net/", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(4500);
const out = await page.evaluate(() => {
  const res = {};
  const rows = [...document.querySelectorAll(".dmRespRow")];
  res.rowYH = rows.map((r) => { const re = r.getBoundingClientRect(); return [Math.round(re.y), Math.round(re.height), (r.className || "").toString().slice(0, 40), (getComputedStyle(r).backgroundImage || "").slice(5, 80)]; });
  // caption buttons in about section (5 buttons)
  const caps = [...document.querySelectorAll("a[class*='dmButtonLink'], .dmButtonLink, [class*='caption']")].map((a) => ({ t: (a.textContent || "").trim().slice(0, 40), href: (a.href || "").slice(0, 90), cls: (a.className || "").toString().slice(0, 60), rect: (() => { const r = a.getBoundingClientRect(); return `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`; })() })).filter((x) => x.t && x.rect.startsWith("0,0") === false);
  res.captions = caps.slice(0, 16);
  res.videoLink = [...document.querySelectorAll("a")].filter((a) => /video|watch/i.test(a.textContent || "")).map((a) => ({ t: (a.textContent || "").trim().slice(0, 50), href: (a.href || "").slice(0, 120) }));
  return res;
});
console.log(JSON.stringify(out, null, 1));
await browser.close();
