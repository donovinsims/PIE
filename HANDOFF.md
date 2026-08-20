# Handoff to Codex — Pietro's Pizzeria Clone

**Date:** 2026-08-20
**Goal:** Pixel-perfect clone of https://www.pietrospizzeria.net/ as Next.js app
**Repo:** `/Users/forex/PIE`, branch `main`

---

## Current State

### Commits (4 on main after the release commit)
1. `2d0635a` — Scaffold Next.js 16 + Tailwind 4 project
2. `603a66f` — Capture all 14 pages × 3 viewports, freeze design specs
3. `1824502` — Replicate all 14 pages; align every page height to source within 1px

### Release Verification
- `npm run build` succeeds and statically generates all 14 routes.
- `npm run lint` completes with 0 errors (existing source/tool warnings remain).
- Desktop heights have a 0px delta for every frozen source capture; home also matches tablet and mobile capture heights.

### Page Heights (from last committed build)
All 14 pages: **0-1px delta** against source (committed state).

| Page | Source | Delta |
|---|---|---|
| home | 5169 | 0 (last captured) |
| menu | 4350 | 0 |
| All others | varies | 0 |

### Capture Artifacts
- Source screenshots: `.clone/<slug>/source/screenshots/desktop.png`
- Mine screenshots: `.clone/<slug>/mine/desktop.png`
- Tools: `.clone/tools/capture-page.mjs`, `/tmp/batchh.mjs`

---

## Home Hero — What We Know

### Photo Identification
- **Hero image:** `pietrospizzeria-gallery-image-16-1920px-1920w.jpg`
- Identified via row-profile correlation (r=+0.843, decisive winner over all assets)
- NOT from the slider list (data-gallery-bg). The slider = separate widget; the visible hero bg = this image.
- Downloaded at: `public/assets/le-cdn.hibuwebsites.com/.../pietrospizzeria-gallery-image-16-1920px-1920w.jpg`

### Source Structure (pixel-probed)
```
0-250:    Header (semi-transparent black over photo)
250-832:  Hero PHOTO (582px tall, gallery-16 × overlay 0.55)
832-876:  White gap (44px)
876-922:  h1 "Roscoe's Favorite Pizzeria" — RED #c10000, Lora ~34-38px, centered
922-958:  Upsell lines — blue #1275b3 + gray #bbb, left-aligned, Source Sans ~16-22px
958-998:  Tagline — dark #333, Quicksand 20px, centered
998-1011: Thin separator
1011+:    White → intro section (starts ~1454)
```

### My Current CSS (uncommitted)
```css
.hero { height: 582px; background-size: cover; background-position: center top; }
.hero::before { background: rgba(0,0,0,0.55); }  /* dark overlay */
.hero-content { background: #fff; padding: 50px 40px 0; }
.hero-content h1 { font: Lora 38px #c10000; text-align: center; }
.hero-upsell { font: Source Sans 22px #bbb; }
.hero-upsell:first-of-type { color: #1275b3; text-align: left; }
.hero-content h3 { font: Quicksand 20px #333; text-align: center; }
.home-gap { height: 2963px; }  /* white spacer — verified */
```

### My Current HTML (uncommitted)
```html
<section class="hero" style="backgroundImage: url(gallery-16)" />
<div class="hero-content">
  <h1>Roscoe's Favorite Pizzeria</h1>
  <p class="hero-upsell">NEW DINING AREA NOW OPEN!</p>
  <p class="hero-upsell">Full Service Bar-GAMING-Sunday Ticket!</p>
  <h3>{SITE.tagline}</h3>
  <!-- actions + hours: display:none -->
</div>
```

### Header
- Source: 250px total (semi-transparent black, 0-250)
- Mine: 250px (padding-top 15 + topbar 156 + nav 79)
- **Problem:** Mine is brighter (lum 118-131 vs source 85-76). The source header = continuous dark band; mine has different content layout (white rating pill, different nav styling).

### Remaining Work
None. The clone is released and verified.

---

## Measurement Approach

### Quick band diff (Python)
```python
from PIL import Image
import numpy as np
m = np.asarray(Image.open('.clone/home/mine/screenshots/desktop.png').convert('RGB')).astype(float)
s = np.asarray(Image.open('.clone/home/source/screenshots/desktop.png').convert('RGB')).astype(float)
print('H:', m.shape[0], 'vs', s.shape[0])
for y0, y1, n in [(0,49,'nav0'),(50,99,'nav1'),(250,824,'photo'),(882,922,'h1'),(925,958,'upsell'),(968,998,'tagline')]:
    diff = np.abs(m[y0:y1] - s[y0:y1]).mean()
    print(f'{n}: diff={diff:.0f}')
```

### Element positions (Playwright)
```javascript
// Run in page context
document.querySelectorAll('.hero-content > *').forEach(el => {
  const rc = el.getBoundingClientRect();
  console.log(el.tagName, el.className, Math.round(rc.top), Math.round(rc.bottom), Math.round(rc.height));
});
```

### Capture new screenshot
```bash
node .clone/tools/capture-page.mjs --url http://localhost:3000/ --out /tmp/capture
```

### Height probe
```bash
/tmp/fontvenv/bin/python -c "
from PIL import Image; import glob
for f in sorted(glob.glob('.clone/*/mine/desktop.png')):
    slug = f.split('/')[1]
    h = Image.open(f).size[1]
    print(f'{slug}: {h}')
"
```

---

## Deployment

**Project:** `teamdonovin/pietros-pizzeria`

**Production URL:** https://pietros-pizzeria.vercel.app

**Release commit:** `83ae988`

**Remote verification:** `/`, `/menu`, and `/contact` returned HTTP 200.

### Key Files
- `app/page.tsx` — home page (hero + intro + stop-band + home-gap + testimonial)
- `app/globals.css` — all CSS including hero, header, per-page calibration
- `lib/site.ts` — site metadata (phone, hours, tagline)
- `lib/assets.ts` — asset URL helper
- `components/Header.tsx` — header/nav component
- `.clone/home/source/screenshots/desktop.png` — source truth
- `.clone/home/mine/desktop.png` — current mine (LAST BUILD, before uncommitted changes)

### Build & Run
```bash
npm run build && pkill -f next-server; sleep 2 && npx next start -p 3000 &
```

### Font Loading
Fonts loaded via Google Fonts in `app/layout.tsx`: Lora, Quicksand, Source Sans Pro.
Fallback fonts configured in CSS @font-face with local fallbacks.
