#!/usr/bin/env node
// Extract full body text + link inventory + img inventory from each captured page (uses rendered.html, no browser).
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const slugs = process.argv.slice(2);
if (!slugs.length) { console.error("Usage: extract-text.mjs <slug> [slug...]"); process.exit(1); }

const strip = (s) => s.replace(/\s+/g, " ").trim();
const clean = (s) => s
  .replace(/<script[\s\S]*?<\/script>/gi, "")
  .replace(/<style[\s\S]*?<\/style>/gi, "")
  .replace(/<!--[\s\S]*?-->/g, "");

for (const slug of slugs) {
  const dir = join(".clone", slug, "source");
  const html = await readFile(join(dir, "rendered.html"), "utf8").catch(() => null);
  if (!html) { console.log(`SKIP ${slug}: no rendered.html`); continue; }
  const outDir = join(".clone", "evidence");
  await mkdir(outDir, { recursive: true });
  const h = clean(html);

  // Full visible text: mimic innerText by taking body and stripping tags (approximation)
  const bodyMatch = h.match(/<body[\s\S]*<\/body>/i);
  const body = bodyMatch ? bodyMatch[0] : h;
  const text = strip(body.replace(/<[^>]+>/g, " ")).replace(/\s{2,}/g, " ");

  // Headings
  const headings = [...html.matchAll(/<h([1-4])[^>]*>([\s\S]*?)<\/h\1>/gi)]
    .map((m) => ({ level: Number(m[1]), text: strip(m[2].replace(/<[^>]+>/g, " ")) }))
    .filter((h) => h.text);

  // Links: text + href (local + external)
  const links = [...html.matchAll(/<a\s+[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi)]
    .map((m) => ({ href: m[1], text: strip(m[2].replace(/<[^>]+>/g, " ")) }))
    .filter((l) => l.text && !l.href.includes("+item.") && !l.href.includes("#modal") && !l.href.includes("javascript"));

  // Images with alt
  const images = [...html.matchAll(/<img[^>]*>/gi)]
    .map((m) => {
      const src = (m[0].match(/src="([^"]*)"/) || [])[1] || (m[0].match(/data-src="([^"]*)"/) || [])[1] || "";
      const alt = (m[0].match(/alt="([^"]*)"/) || [])[1] || "";
      const classAttr = (m[0].match(/class="([^"]*)"/) || [])[1] || "";
      return { src, alt: strip(alt), class: classAttr.split(/\s+/).slice(0, 4).join(" ") };
    }).filter((i) => i.src && i.src.startsWith("http"));

  // Background image URLs in inline style or style blocks
  const bgImages = [...new Set([...html.matchAll(/url\(\s*['"]?(https:[^'")]+)['"]?\s*\)/g)].map((m) => m[1]))]
    .filter((u) => /\.(png|jpe?g|webp|gif)/i.test(u));

  const result = { slug, text, headings, links, images, bgImages };
  await writeFile(join(outDir, `page-text-${slug}.json`), JSON.stringify(result, null, 1) + "\n");
  console.log(`[ok] ${slug}: text=${text.length} chars, headings=${headings.length}, links=${links.length}, imgs=${images.length}, bg=${bgImages.length}`);
}