// Live probe: exact computed styles of shared chrome (header wrapper, top bar, nav, footer) on the source site.
import { chromium } from "/Users/forex/.config/ai-skills/pixel-perfect-clone/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: true });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 })).newPage();
await page.goto("https://www.pietrospizzeria.net/", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(4000);
const probe = await page.evaluate(() => {
  const pick = ["backgroundColor","backgroundImage","backgroundPosition","backgroundSize","color","fontFamily","fontSize","fontWeight","lineHeight","letterSpacing","textAlign","height","minHeight","padding","margin","borderTop","borderBottom","display","position","flexDirection","justifyContent","alignItems","gap","maxWidth","width"];
  const s = (el, pseudo) => {
    if (!el) return null;
    const cs = getComputedStyle(el, pseudo);
    const o = {}; for (const k of pick) o[k] = cs[k];
    const r = el.getBoundingClientRect();
    return { ...o, rect: { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) } };
  };
  const q = (sel) => document.querySelector(sel);
  const qa = (sel) => [...document.querySelectorAll(sel)];
  return {
    headerWrapper: s(q(".dmHeaderContainer")) || s(q("header")) || s(q(".p_hfcontainer")),
    topBarRow: s(q('.u_1944995444, [id="1944995444"]')),
    ratingWidget: s(q(".u_1190611476")),
    logoCol: s(q(".u_1187518544")),
    logoImg: s(q("img[alt*='logo']")),
    navRow: s(q(".u_1828082348")),
    nav: s(q("nav.u_1426433218")),
    navItem: s(q("nav.u_1426433218 .unifiednav__item")),
    navCurrent: s(q("nav.u_1426433218 .dmNavItemSelected")),
    hero: s(q("[id*='hero']")) || s(q(".dmHomePage")),
    body: s(document.body),
    dmContent: s(q(".dmContent")),
    footerInner: s(q(".dmFooterInner")) || s(q("footer")),
    footerRows: qa(".dmFooter .dmRespRow").map((el) => { const r = el.getBoundingClientRect(); return { cls: el.className.slice(0, 60), y: Math.round(r.y), h: Math.round(r.height) }; }),
    copyright: s(q(".dmFooterInner p, .p_hfcontainer p")),
    headings: [...document.querySelectorAll("h1,h2,h3")].slice(0, 12).map((el) => { const cs = getComputedStyle(el); return { tag: el.tagName, text: el.textContent.trim().slice(0, 50), font: cs.fontFamily.split(",")[0], size: cs.fontSize, weight: cs.fontWeight, color: cs.color, lineHeight: cs.lineHeight, transform: cs.textTransform, ls: cs.letterSpacing }; }),
  };
});
console.log(JSON.stringify(probe, null, 1));
await browser.close();