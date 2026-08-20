// Live probe (general): full page row inventory with geometry + styles. Usage: node probe-page.mjs <url> [out.json]
import { chromium } from "/Users/forex/.config/ai-skills/pixel-perfect-clone/node_modules/playwright/index.mjs";
import { writeFile } from "node:fs/promises";
const url = process.argv[2];
const outFile = process.argv[3] || "page-topology.json";
const browser = await chromium.launch({ headless: true });
const page = await (await browser.newContext({ viewport: { width: 1440, height: 1000 }, deviceScaleFactor: 1 })).newPage();
await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
await page.waitForLoadState("networkidle", { timeout: 15000 }).catch(() => {});
await page.waitForTimeout(2500);
const out = await page.evaluate(() => {
  const desc = (el) => {
    const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
    const cls = (el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className || "").toString();
    let text = (el.textContent || "").trim().replace(/\s+/g, " ").slice(0, 110);
    const bg = cs.backgroundColor + (cs.backgroundImage !== "none" ? "|img:" + cs.backgroundImage.slice(5, 90) : "");
    return { cls: cls.slice(0, 65), text, rect: `${Math.round(r.x)},${Math.round(r.y)} ${Math.round(r.width)}x${Math.round(r.height)}`, bg, color: cs.color, font: `${cs.fontFamily.split(",")[0]} ${cs.fontSize} w${cs.fontWeight}`, pad: cs.padding !== "0px" ? cs.padding : "", radius: cs.borderRadius !== "0px" ? cs.borderRadius : "" };
  };
  const rows = [...document.querySelectorAll(".dmContent .dmRespRow")].filter((r) => r.getBoundingClientRect().width > 0);
  const inventory = rows.map((r, i) => ({ i, ...desc(r), kids: [...r.querySelectorAll("h1,h2,h3,h4,p,a,button,img,input,textarea,label,iframe")].slice(0, 26).map((k) => {
    const cs = getComputedStyle(k); const rr = k.getBoundingClientRect();
    let t = (k.textContent || "").trim().replace(/\s+/g, " ").slice(0, 60);
    if (k.tagName === "IMG") t = "IMG:" + ((k.currentSrc || k.src || "").split("/").pop() || "");
    if (k.tagName === "INPUT" || k.tagName === "TEXTAREA") t = (k.type || k.tagName) + " ph=" + (k.placeholder || "");
    if (k.tagName === "IFRAME") t = "IFRAME:" + (k.src || "").slice(0, 80);
    return { tag: k.tagName.toLowerCase(), t, rect: `${Math.round(rr.x)},${Math.round(rr.y)} ${Math.round(rr.width)}x${Math.round(rr.height)}`, bg: cs.backgroundColor + (cs.backgroundImage !== "none" ? "|img" : ""), color: cs.color, font: `${cs.fontFamily.split(",")[0]} ${cs.fontSize} w${cs.fontWeight}`, radius: cs.borderRadius !== "0px" ? cs.borderRadius : "", border: cs.borderTopWidth !== "0px" || cs.borderBottomWidth !== "0px" ? `${cs.borderTopWidth} ${cs.borderTopColor} / ${cs.borderBottomWidth} ${cs.borderBottomColor}` : "" };
  }) }));
  const bgSlides = [...document.querySelectorAll(".bgGallerySlide")].map((s) => getComputedStyle(s).backgroundImage.slice(5, 100));
  const h1 = document.querySelector(".dmContent h1");
  return { url: location.href, title: document.title, rows: inventory, bgSlides, totalH: document.documentElement.scrollHeight, h1: h1 ? h1.textContent.trim() : null, bannerBgs: bgSlides };
});
await writeFile(outFile, JSON.stringify(out, null, 1));
console.log("Wrote", outFile, "rows:", out.rows.length);
await browser.close();
