// Numeric verification: screenshot my clone and diff against captured source screenshots
import { chromium } from "/Users/forex/.config/ai-skills/pixel-perfect-clone/node_modules/playwright/index.mjs";
import { execSync } from "child_process";
import fs from "fs";

const slugs = ["home", "menu", "broadster-chicken", "appetizers", "sandwiches", "dinners", "desserts", "family-or-party-trays", "lunch-specials", "gallery", "employment", "reviews", "about", "contact"];
const BASE = "http://localhost:3000";
const VIEWPORTS = { desktop: { width: 1440, height: 1000 }, tablet: { width: 768, height: 1024 }, mobile: { width: 390, height: 844 } };

const browser = await chromium.launch({ headless: true });
const out = [];
for (const slug of slugs) {
  const page = await (await browser.newContext({ viewport: VIEWPORTS.desktop, deviceScaleFactor: 1 })).newPage();
  try {
    await page.goto(`${BASE}/${slug === "home" ? "" : slug}`, { waitUntil: "networkidle", timeout: 60000 });
  } catch { /* images might keep loading */ }
  await page.waitForTimeout(1200);
  fs.mkdirSync(`/tmp/clone-shots/${slug}`, { recursive: true });
  await page.screenshot({ path: `/tmp/clone-shots/${slug}/desktop.png`, fullPage: true });
  await page.close();
  // diff vs captured source
  const src = `.clone/${slug}/source/screenshots/desktop.png`;
  if (fs.existsSync(src)) {
    const script = `import sys
from PIL import Image, ImageChops
import math
def scale(tsize, img):
    if tsize == img.size: return img
    return img.resize(tsize)
a = Image.open("SRCA").convert("RGB")
b = scale(a.size, Image.open("CLONEA").convert("RGB"))
diff = ImageChops.difference(a, b)
hist = diff.convert("L").histogram()
total = sum(hist)
diffpx = sum(hist[25:])
print(f"{diffpx/total*100:.1f}% pixels differ (>25/255)")
sq = sum(v * (i/255)**2 for i, v in enumerate(hist))
print(f"mean-diff={math.sqrt(sq/total):.1f}/255")`;
    fs.writeFileSync(
      "/tmp/diffround.py",
      script.replace("SRCA", `${process.cwd()}/.clone/${slug}/source/screenshots/desktop.png`).replace("CLONEA", `/tmp/clone-shots/${slug}/desktop.png`)
    );
    try {
      const r = execSync(`/tmp/fontvenv/bin/python /tmp/diffround.py`, { encoding: "utf8" }).trim().replace(/\n/g, " | ");
      out.push(`${slug}: ${r}`);
    } catch (e) {
      out.push(`${slug}: DIFF ERR ${String(e).slice(0, 120)}`);
    }
  }
}
await browser.close();
console.log(out.join("\n"));
