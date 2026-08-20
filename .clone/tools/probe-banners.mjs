import { chromium } from "/Users/forex/.config/ai-skills/pixel-perfect-clone/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: true });
const slugs = ["about", "contact", "employment", "gallery", "reviews"];
for (const slug of slugs) {
  const url = slug === "about" || slug === "contact" || slug === "employment" || slug === "gallery" || slug === "reviews" ? "https://www.pietrospizzeria.net/" + slug : "https://www.pietrospizzeria.net/" + slug;
  const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 })).newPage();
  await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
  await page.waitForTimeout(3500);
  const out = await page.evaluate((slug) => {
    const rows = [...document.querySelectorAll(".dmRespRow")];
    const first = rows.find((r) => r.getBoundingClientRect().y > 150 && r.getBoundingClientRect().y < 260 && r.getBoundingClientRect().height > 400);
    const getbg = (el) => (getComputedStyle(el).backgroundImage || "") + "|" + (getComputedStyle(el).backgroundColor || "");
    const info = { slug, rows: rows.slice(0, 3).map((r) => { const re = r.getBoundingClientRect(); return { y: Math.round(re.y), h: Math.round(re.height), bg: (getComputedStyle(r).backgroundImage || "").slice(5, 200) }; }) };
    const photos = [...document.querySelectorAll(".instagrammedia img, .photogallery img, [class*=photo] img, .u_1473224152 img, img[src*=opt]")].map((i) => (i.currentSrc || i.src).slice(-60)).slice(0, 6);
    return { ...info, photos };
  }, slug);
  console.log(JSON.stringify(out));
  await page.close();
}
await browser.close();
