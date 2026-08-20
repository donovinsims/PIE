// Live probe v2: ancestor chain walk from nav row up to document.body, plus heading styles.
import { chromium } from "/Users/forex/.config/ai-skills/pixel-perfect-clone/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: true });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 })).newPage();
await page.goto("https://www.pietrospizzeria.net/", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
await page.waitForTimeout(3000);
const out = await page.evaluate(() => {
  const pick = ["backgroundColor","backgroundImage","backgroundPosition","backgroundSize","color","fontFamily","fontSize","fontWeight","lineHeight","padding","margin","boxShadow","display","position","alignItems","justifyContent","flexDirection"];
  const desc = (el) => {
    if (!el || el === document.documentElement) return null;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const o = {}; for (const k of pick) o[k] = cs[k];
    return { cls: (el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className) || el.tagName, bg: o.backgroundColor + (o.backgroundImage !== "none" ? " | " + o.backgroundImage.slice(0, 80) : ""), color: o.color, font: `${o.fontFamily.split(",")[0]} ${o.fontSize}`, padding: o.padding, display: o.display, rect: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}` };
  };
  const navRow = document.querySelector('[id="1828082348"]');
  const chain = [];
  let el = navRow;
  while (el && el !== document.body) { chain.push(desc(el)); el = el.parentElement; }
  chain.push(desc(document.body));
  const h1 = document.querySelector("h1");
  const h2 = document.querySelector("h2");
  const h3 = document.querySelector("h3");
  const heads = (el) => { if (!el) return null; const cs = getComputedStyle(el); const r = el.getBoundingClientRect(); return { text: (el.textContent || "").trim().slice(0, 60), font: cs.fontFamily.split(",")[0], size: cs.fontSize, weight: cs.fontWeight, color: cs.color, ls: cs.letterSpacing, align: cs.textAlign, rect: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`, bg: cs.backgroundColor }; };
  const heroEl = navRow ? navRow.parentElement.querySelectorAll(".u_1944995444, [id='1944995444'], .dmRespRow") : [];
  return {
    readyState: document.readyState, scrollH: document.documentElement.scrollHeight,
    navRowChain: chain,
    firstRows: [...document.querySelectorAll("#dm .dmInner > div, #dm .dmInner > .dmRespRow, #dm .dmInner > div > .dmRespRow")].slice(0, 8).map(desc),
    h1: heads(h1), h2: heads(h2), h3: heads(h3),
    hasNav: !!navRow,
    allNavItems: [...document.querySelectorAll("a.unifiednav__item")].map((a) => a.textContent.trim().slice(0, 30)),
    imagesOnPage: [...document.images].map((i) => ({ src: (i.currentSrc || i.src).split("/").pop(), w: i.naturalWidth, h: i.naturalHeight, alt: (i.alt || "").slice(0, 40) })).slice(0, 40),
  };
});
console.log(JSON.stringify(out, null, 1));
await browser.close();