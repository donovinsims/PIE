// Live probe: footer structure + backgrounds
import { chromium } from "/Users/forex/.config/ai-skills/pixel-perfect-clone/node_modules/playwright/index.mjs";
const browser = await chromium.launch({ headless: true });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 })).newPage();
await page.goto("https://www.pietrospizzeria.net/menu", { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForTimeout(4500);
const out = await page.evaluate(() => {
  const footer = document.querySelector(".dmFooter");
  const desc = (el) => {
    if (!el) return null;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return { cls: (el.className || "").toString().slice(0, 70), rect: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`, bg: cs.backgroundColor + (cs.backgroundImage !== "none" ? "|" + cs.backgroundImage.slice(5, 70) : ""), color: cs.color, font: `${cs.fontFamily.split(",")[0]} ${cs.fontSize} w${cs.fontWeight}`, pad: cs.padding, align: cs.textAlign };
  };
  const rows = footer ? [...footer.querySelectorAll(".dmRespRow")].map(desc) : [];
  const inner = footer ? footer.querySelector(".dmFooterInner") : null;
  const cols = inner ? [...inner.querySelectorAll(".dmRespCol")].map(desc) : [];
  const links = footer ? [...footer.querySelectorAll("a")].map((a) => ({ text: (a.textContent || "").trim().slice(0, 40), href: a.href.slice(0, 80), y: Math.round(a.getBoundingClientRect().y), x: Math.round(a.getBoundingClientRect().x) })).filter((l) => l.text) : [];
  const imgs = footer ? [...footer.querySelectorAll("img")].map((i) => (i.currentSrc || i.src).split("/").pop()) : [];
  return { footer: desc(footer), inner: desc(inner), rows, cols, links, imgs };
});
console.log(JSON.stringify(out, null, 1));
await browser.close();