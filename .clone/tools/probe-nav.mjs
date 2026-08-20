import { chromium } from "/Users/forex/.config/ai-skills/pixel-perfect-clone/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: true });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 })).newPage();
await page.goto("https://www.pietrospizzeria.net/menu", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(4000);
const snap = (label) => page.evaluate((label) => {
  const nav = document.querySelector(".main-navigation");
  const items = [...nav.querySelectorAll(".unifiednav__item")].map((el) => {
    const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
    return { t: (el.textContent || "").trim().slice(0, 24), x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), display: cs.display, vis: cs.visibility, bg: cs.backgroundColor, sel: el.classList.contains("dmNavItemSelected") };
  });
  const subs = [...nav.querySelectorAll("[data-depth='1'], [data-sub-nav-menu]")].map((el) => {
    const r = el.getBoundingClientRect();
    return { t: (el.textContent || "").trim().slice(0, 24), x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height), display: getComputedStyle(el).display, vis: getComputedStyle(el).visibility };
  });
  const container = nav.querySelector(".unifiednav__container");
  const cr = container ? container.getBoundingClientRect() : null;
  return { label, container: cr ? [Math.round(cr.x), Math.round(cr.y), Math.round(cr.width), Math.round(cr.height)] : null, items, subs };
}, label);
console.log(JSON.stringify(await snap("at-rest"), null, 1));
const menu = page.locator(".unifiednav__item", { hasText: "Menu" }).first();
await menu.hover(); await page.waitForTimeout(900);
console.log(JSON.stringify(await snap("hover-menu"), null, 1));
await browser.close();
