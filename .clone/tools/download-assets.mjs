#!/usr/bin/env node
// Download every asset referenced by captured evidence (images, fonts, css bg images, video, favicon)
// into public/assets/<host>/<...path> so the clone never depends on the original CDN.
import { mkdir, readFile, writeFile, stat } from "node:fs/promises";
import { join, dirname, resolve } from "node:path";
import { glob } from "node:fs/promises";

const root = resolve(process.argv[2] || ".");
const cloneDir = join(root, ".clone");
const publicDir = join(root, "public", "assets");

// 1. Collect asset URLs from evidence assets.json
const urls = new Map(); // url -> contentType
for await (const file of glob(join(cloneDir, "*", "evidence", "assets.json"))) {
  const list = JSON.parse(await readFile(file, "utf8"));
  for (const a of list) if (!urls.has(a.url)) urls.set(a.url, a.contentType);
}

// 2. Collect url(...) references from rendered.html (CSS background images etc.)
for await (const file of glob(join(cloneDir, "*", "source", "rendered.html"))) {
  const html = await readFile(file, "utf8");
  for (const m of html.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) {
    const u = m[1];
    if (/^https?:\/\//.test(u)) urls.set(u, null);
  }
}

// 3. Favicon etc: also scan rendered html for link hrefs to cdn hosts
for await (const file of glob(join(cloneDir, "*", "source", "rendered.html"))) {
  const html = await readFile(file, "utf8");
  for (const m of html.matchAll(/(?:href|src)=["'](https:\/\/[^"']+)["']/g)) {
    const u = m[1];
    if (/cdn\.hibuwebsites\.com|le-cdn\.hibuwebsites\.com|static-res-cdn\.websites\.hibu\.com/.test(u) && /\.(png|jpe?g|webp|gif|svg|ico|woff2?|ttf|mp4|jpg|jpeg)$/i.test(u)) urls.set(u, null);
  }
}

console.log(`Collected ${urls.size} unique asset URLs`);
// Keep only CDN-hosted assets (external trackers etc. are not part of the site design)
const allowedHosts = ["cdn.hibuwebsites.com", "le-cdn.hibuwebsites.com", "static-res-cdn.websites.hibu.com"];
const targets = [...urls.entries()].filter(([u]) => {
  try { return allowedHosts.includes(new URL(u).hostname); } catch { return false; }
});
console.log(`${targets.length} CDN assets to download`);

let ok = 0, fail = 0, skip = 0;
const queue = [...targets];
const workers = Array.from({ length: 6 }, async () => {
  while (queue.length) {
    const [url, contentType] = queue.shift();
    const u = new URL(url);
    const rel = [u.hostname, ...u.pathname.split("/").filter(Boolean)].join("/");
    const dest = join(publicDir, rel);
    try {
      if (await stat(dest).then(() => true).catch(() => false)) { skip++; continue; }
      const res = await fetch(url, { redirect: "follow", headers: { "User-Agent": "Mozilla/5.0 (clone-archive)" } });
      if (!res.ok) { console.log(`  [fail ${res.status}] ${url}`); fail++; continue; }
      const buf = Buffer.from(await res.arrayBuffer());
      await mkdir(dirname(dest), { recursive: true });
      await writeFile(dest, buf);
      ok++;
    } catch (e) { console.log(`  [error] ${url}: ${e.message}`); fail++; }
  }
});
await Promise.all(workers);
console.log(`Done: ${ok} downloaded, ${skip} existed, ${fail} failed`);
// Emit a manifest mapping original URL -> local path
const mapping = [...targets].map(([url]) => ({ url, local: "/assets/" + new URL(url).hostname + new URL(url).pathname }));
await mkdir(join(cloneDir, "tools"), { recursive: true });
await writeFile(join(cloneDir, "tools", "asset-map.json"), JSON.stringify(mapping, null, 2) + "\n");
console.log("Wrote .clone/tools/asset-map.json");