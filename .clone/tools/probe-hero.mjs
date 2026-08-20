// Live probe v3: dump hero section element tree (first content row after header) with geometry + key styles.
import { chromium } from "/Users/forex/.config/ai-skills/pixel-perfect-clone/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: true });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 })).newPage();
await page.goto("https://www.pietrospizzeria.net/", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
await page.waitForTimeout(2500);
const out = await page.evaluate(() => {
  const rows = [...document.querySelectorAll(".dmContent .dmRespRow, .dmBody .dmRespRow")];
  const desc = (el) => {
    if (!el) return null;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const tag = el.tagName.toLowerCase();
    let text = "";
    if (["h1","h2","h3","h4","p","a","span","li","button","strong"].includes(tag)) text = (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 80);
    return { tag, cls: (el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className || "").toString().slice(0, 70), text, rect: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`, disp: cs.display, bg: cs.backgroundColor + (cs.backgroundImage !== "none" ? "|img:" + cs.backgroundImage.slice(0, 60) : ""), color: cs.color, font: `${cs.fontFamily.split(",")[0]} ${cs.fontSize} w${cs.fontWeight}`, radius: cs.borderRadius, shadow: cs.boxShadow.slice(0, 40), opacity: cs.opacity };
  };
  // First content row = hero (find row containing 'Roscoe')
  let heroRow = null;
  for (const r of rows) { if (r.textContent.includes("Roscoe's Favorite Pizzeria")) { heroRow = r; break; } }
  if (!heroRow) return { error: "hero row not found" };
  const walk = (el, depth, limit) => {
    const out = [];
    const kids = [...el.children];
    for (const k of kids) {
      const d = desc(k);
      if (!d) continue;
      out.push({ depth, row: d });
      if (depth < limit && k.children.length) out.push(...walk(k, depth + 1, limit));
    }
    return out;
  };
  // Rect 0 elements hidden by animation: also capture shown state
  const tree = walk(heroRow, 0, 5);
  // Full sec: also Next row after hero (About section 2)
  const heroIdx = rows.indexOf(heroRow);
  const after = rows.slice(heroIdx + 1, heroIdx + 6).map((r, i) => ({ i: i + 1, desc: desc(r), text: (r.textContent || "").replace(/\s+/g, " ").slice(0, 140) }));
  return { heroTree: tree, nextRows: after, heroRow: desc(heroRow) };
});
console.log(JSON.stringify(out, null, 1));
await browser.close();