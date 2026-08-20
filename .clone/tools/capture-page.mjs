#!/usr/bin/env node
// Patched page capture: same evidence layout as pixel-perfect-clone capture-source.mjs,
// but every settle await is bounded (the official script hangs forever on
// document.fonts.ready when a CDN font fetch stalls).
// Usage: node capture-page.mjs --url <URL> --out <dir>
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { VIEWPORTS, absolute, loadBrowser, parseArgs, requireOption, settle, stablePage, writeJson } from "/Users/forex/.config/ai-skills/pixel-perfect-clone/lib/core.mjs";

const args = parseArgs(process.argv.slice(2));
const url = requireOption(args, "url");
const out = absolute(args.out || ".clone");
const browser = await loadBrowser();
const assets = new Map();

const bounded = (promise, ms, label) => Promise.race([
  promise,
  new Promise((_, rej) => setTimeout(() => rej(new Error(`timeout: ${label} > ${ms}ms`)), ms)),
]);

const observation = (page) => page.evaluate(() => {
  const pick = ["display","position","top","right","bottom","left","width","height","minWidth","maxWidth","minHeight","maxHeight","margin","padding","gap","rowGap","columnGap","gridTemplateColumns","gridTemplateRows","flexDirection","justifyContent","alignItems","fontFamily","fontSize","fontWeight","fontStyle","lineHeight","letterSpacing","textAlign","textTransform","color","opacity","background","backgroundColor","backgroundImage","backgroundPosition","backgroundSize","border","borderRadius","boxShadow","filter","backdropFilter","transform","transformOrigin","overflow","objectFit","objectPosition","zIndex","transition","animation"];
  const style = (el, pseudo) => { const s = getComputedStyle(el, pseudo); return Object.fromEntries(pick.map((key) => [key, s[key]])); };
  const describe = (el, index) => { const r = el.getBoundingClientRect(); return { index, selector: el.id ? `#${CSS.escape(el.id)}` : `${el.tagName.toLowerCase()}${el.classList.length ? `.${[...el.classList].slice(0, 3).map(CSS.escape).join(".")}` : ""}`, tag: el.tagName.toLowerCase(), classes: [...el.classList].slice(0, 12), text: (el.innerText || "").trim().replace(/\s+/g, " ").slice(0, 220), rect: { x: Math.round(r.x), y: Math.round(r.y), width: Math.round(r.width), height: Math.round(r.height) }, style: style(el), before: style(el, "::before"), after: style(el, "::after") }; };
  const roots = [...document.querySelectorAll("body > header, main > *, body > footer")].filter((el) => el.getBoundingClientRect().height > 4); const sections = roots.length ? roots : [...document.querySelectorAll("main, [role=main], section")].filter((el) => el.getBoundingClientRect().height > 4);
  const interactive = [...document.querySelectorAll("a,button,input,select,textarea,[role=button],[role=tab],summary")].filter((el) => { const r = el.getBoundingClientRect(); return r.width && r.height; }).slice(0, 150);
  const media = [...document.querySelectorAll("img,source,video,svg,link[rel*=icon]")].map((el) => ({ tag: el.tagName.toLowerCase(), src: el.currentSrc || el.src || el.href || el.getAttribute("src") || null, alt: el.alt || null })).filter((x) => x.src);
  const variables = {}; for (const sheet of [...document.styleSheets]) { try { for (const rule of [...sheet.cssRules]) if (rule.selectorText === ":root") for (const name of rule.style) if (name.startsWith("--")) variables[name] = rule.style.getPropertyValue(name).trim(); } catch {} }
  return { title: document.title, route: location.pathname, page: { scrollWidth: document.documentElement.scrollWidth, scrollHeight: document.documentElement.scrollHeight, background: getComputedStyle(document.body).background }, fonts: [...document.fonts].map((f) => ({ family: f.family, status: f.status, weight: f.weight, style: f.style })), cssVariables: variables, sections: sections.map(describe), interactive: interactive.map(describe), media, headings: [...document.querySelectorAll("h1,h2,h3")].map((el) => el.textContent.trim()).filter(Boolean) };
});

async function mySettle(page, url) {
  await bounded(page.goto(url, { waitUntil: "domcontentloaded", timeout: 60_000 }), 75_000, "goto");
  await bounded(page.waitForLoadState("networkidle", { timeout: 10_000 }).catch(() => {}), 20_000, "networkidle");
  await bounded(page.evaluate(async () => {
    await Promise.race([document.fonts?.ready ?? Promise.resolve(), new Promise((r) => setTimeout(r, 8_000))]);
    const images = [...document.images].filter((i) => !i.complete);
    await Promise.all(images.map((i) => Promise.race([
      new Promise((done) => { i.addEventListener("load", done, { once: true }); i.addEventListener("error", done, { once: true }); }),
      new Promise((done) => setTimeout(done, 8_000)),
    ])));
    await new Promise((done) => requestAnimationFrame(() => requestAnimationFrame(done)));
  }), 25_000, "settle-evaluate");
}

try {
  await mkdir(join(out, "source", "screenshots"), { recursive: true });
  await mkdir(join(out, "evidence"), { recursive: true });
  const views = [];
  for (const [name, viewport] of Object.entries(VIEWPORTS)) {
    const { context, page } = await stablePage(browser, viewport);
    page.on("crash", () => console.error(`[warn] page crashed during ${name}`));
    page.on("response", (response) => {
      const type = response.headers()["content-type"] || "";
      if (/image|font|css|svg|video/i.test(type)) assets.set(response.url(), { url: response.url(), status: response.status(), contentType: type });
    });
    await mySettle(page, url);
    await bounded(page.screenshot({ path: join(out, "source", "screenshots", `${name}.png`), fullPage: true, animations: "disabled" }), 90_000, `screenshot-${name}`);
    const data = await bounded(observation(page), 30_000, `observation-${name}`);
    if (name === "desktop") await bounded(writeFile(join(out, "source", "rendered.html"), await page.content()), 30_000, "rendered.html");
    await writeJson(join(out, "evidence", `observation-${name}.json`), data);
    views.push({ name, viewport, sections: data.sections.length });
    await context.close();
    console.log(`  [ok] ${name} (${viewport.width}x${viewport.height}) sections=${data.sections.length} scrollHeight=${data.page.scrollHeight}`);
  }
  await writeJson(join(out, "evidence", "assets.json"), [...assets.values()].sort((a, b) => a.url.localeCompare(b.url)));
  await writeJson(join(out, "evidence", "manifest.json"), { version: 2, sourceUrl: url, capturedAt: new Date().toISOString(), viewports: views, safety: "Public rendering facts only; no copied scripts, credentials, headers, cookies, or response bodies.", tooling: "patched capture (bounded settle)" });
  console.log(`Captured ${views.length} responsive source views in ${out}`);
} finally {
  await browser.close().catch(() => {});
}