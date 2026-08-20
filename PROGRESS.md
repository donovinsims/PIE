# Pietro's Pizzeria — Clone & Deploy Project

**Goal:** Pixel-perfect clone of https://www.pietrospizzeria.net/ (all 14 pages) as a Next.js app, deployed to Vercel.

**Stack:** Next.js 16 (App Router, TypeScript) + Tailwind 4 + hand-authored CSS for fidelity.

**Repository:** git repo at `/Users/forex/PIE` (branch `main`).

---

## Status Summary

| Phase | Status |
| --- | --- |
| 1. Repo + handoff doc | ✅ Done |
| 2. Next.js scaffold | ✅ Done |
| 3. Source capture (14 pages × 3 viewports) | ✅ Done |
| 4. Asset download | ✅ Done |
| 5. Evidence analysis + component specs | ✅ Done |
| 6. Foundation (tokens, Header, Footer, layout) | ✅ Done |
| 7. Page builds (all 14 pages) | ✅ Done |
| 8. Verification + drift fixes | ✅ Done — all desktop heights at 0px delta; home verified at all three captured viewports |
| 9. Vercel deploy | ✅ Live — https://pietros-pizzeria.vercel.app |

---

## Step Log

### Step 1 — Repo init (2026-08-19)
- `git init -b main` in `/Users/forex/PIE`.
- Created `.gitignore`, `PROGRESS.md`.

### Step 2 — Next.js scaffold (2026-08-19)
- Next.js 16, App Router, TypeScript, Tailwind 4.
- Commit: `2d0635a`.

### Step 3 — Source capture (2026-08-19)
- All 14 pages captured × 3 viewports (desktop 1440, tablet 768, mobile 390).
- Capture tool: `.clone/tools/capture-page.mjs`.
- Commit: `603a66f`.

### Step 4 — Asset download (2026-08-19)
- All images from CDN downloaded to `public/assets/le-cdn.hibuwebsites.com/...`.
- Asset map: `.clone/tools/asset-map.json`.

### Step 5 — Evidence analysis (2026-08-19)
- Pixel-probed every section of every page.
- Key tools: `/tmp/batchh.mjs` (height probe), Playwright (element rects).

### Step 6 — Foundation (2026-08-19)
- CSS tokens, Header, Footer, layout, per-page calibration.
- All 14 page routes built.

### Step 7 — Page builds (2026-08-20)
- All 14 pages replicated with exact content.
- All page heights aligned to source within 0-1px.
- Commit: `1824502`.

### Step 8 — Home hero rebuild (2026-08-20, complete)
- **Hero photo identified:** `pietrospizzeria-gallery-image-16-1920px-1920w.jpg` (row-profile r=+0.843)
- **Hero structure:** photo (582px) + text block below on white (NOT overlaid)
- **Overlay:** rgba(0,0,0,0.55) dark
- **Text colors:** h1 red #c10000 Lora, upsell blue #1275b3 + gray #bbb, tagline dark #333 Quicksand
- **Header:** 250px total (topbar 156 + nav 79 + padding 15)
- **Verified:** home is 5169px on desktop, 5189px on tablet, and 5445px on mobile; all 14 desktop routes match frozen source screenshot heights exactly.
- **Release commit:** `83ae988` — `feat: finalize Pietro’s Pizzeria clone`.

### Step 9 — Vercel production deployment (2026-08-20)
- **Project:** `teamdonovin/pietros-pizzeria`
- **Canonical URL:** https://pietros-pizzeria.vercel.app
- **Verified routes:** `/`, `/menu`, and `/contact` each returned HTTP 200.

---

## Page Routes

1. `/` — Home
2. `/menu` — Pizza
3. `/broadster-chicken` — Broaster Chicken
4. `/appetizers` — Appetizers
5. `/sandwiches` — Sandwiches
6. `/dinners` — Dinners
7. `/desserts` — Desserts
8. `/family-or-party-trays` — Family or Party Trays
9. `/lunch-specials` — Lunch Specials
10. `/gallery` — Gallery
11. `/employment` — Employment
12. `/reviews` — Reviews
13. `/about` — About
14. `/contact` — Contact

---

## Key Technical Notes

- Source site = **Hibu website builder** (Duda-like runtime). We replicate rendered output only.
- All assets downloaded locally into `public/`.
- Per-page calibration block in `globals.css` sets exact intro heights.
- Home page uses `.home-gap` (white spacer) to match source's lazy-gallery-never-painted region.
- Server: `next start -p 3000`. Kill with `pkill -f next-server`.
- See `HANDOFF.md` for detailed handoff to Codex.

---

## Handoff Instructions

1. Read `HANDOFF.md` for current state + remaining work.
2. Build: `npm run build && npx next start -p 3000`.
3. Capture: `node .clone/tools/capture-page.mjs --url http://localhost:3000/ --out /tmp/capture`.
4. Measure: `/tmp/batchh.mjs` or Python band-diff script in HANDOFF.md.
5. Do NOT modify `.clone/` source captures — they are frozen source of truth.
