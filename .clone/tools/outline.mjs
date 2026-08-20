#!/usr/bin/env node
// Print a compact structural outline of a rendered.html: element tree with ids/classes and short text.
// Usage: node outline.mjs <rendered.html> [--max-depth N] [--interesting-only]
import { readFile } from "node:fs/promises";
const file = process.argv[2];
const maxDepth = Number((process.argv.find((a) => a.startsWith("--max-depth=")) || "9").split("=")[1] || 9);
const interesting = process.argv.includes("--interesting-only");
const html = await readFile(file, "utf8");

const VOID = new Set(["meta", "link", "img", "input", "br", "hr", "source", "wbr", "area", "base", "col", "embed", "track", "param"]);
const SKIP = new Set(["script", "style", "noscript", "template", "iframe", "canvas"]);
const CLASSES = ["header", "footer", "nav", "hero", "widget", "section", "inner", "content", "menu", "logo", "button", "banner", "title", "subtitle", "text", "image", "photo", "gallery", "graphic", "map", "form", "icon", "social", "cta", "container", "column", "row", "grid", "flex", "wrapper", "overlay", "float", "card"];

const tokens = html.replace(/<!--[\s\S]*?-->/g, "").match(/<\/?[a-zA-Z][^>]*>/g) || [];
let depth = 0;
let out = [];
let lines = 0;
for (const raw of tokens) {
  const closing = raw.startsWith("</");
  const m = raw.match(/^<\/?([a-zA-Z0-9-]+)([^>]*)>?$/);
  if (!m) continue;
  const tag = m[1].toLowerCase();
  if (SKIP.has(tag)) { if (!closing) { depth++; } else { depth = Math.max(0, depth - 1); } continue; }
  const attrs = m[2];
  const id = (attrs.match(/id="([^"]*)"/) || [])[1];
  const cl = (attrs.match(/class="([^"]*)"/) || [])[1] || "";
  const cls = cl.split(/\s+/).filter(Boolean).slice(0, 6);
  if (!closing) {
    const isVoid = VOID.has(tag);
    const text = isVoid ? "" : "";
    if (depth <= maxDepth) {
      const interestingHit = cls.some((c) => CLASSES.some((k) => c.toLowerCase().includes(k)));
      const hasId = !!id;
      if ((interesting && (interestingHit || hasId)) || !interesting) {
        out.push("  ".repeat(depth) + `<${tag}${id ? ` #${id}` : ""}${cls.length ? ` .${cls.join(".")}` : ""}>`);
        lines++;
      }
    }
    if (!isVoid) depth++;
    if (lines > 1500) { out.push("...TRUNCATED..."); break; }
  } else {
    depth = Math.max(0, depth - 1);
  }
}
console.log(out.join("\n"));