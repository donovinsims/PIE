# Pietro's Pizzeria — Clone & Deploy Project

**Goal:** Pixel-perfect clone of https://www.pietrospizzeria.net/ (all 13 pages) as a Next.js app, deployed to Vercel.

**Stack:** Next.js (App Router, TypeScript) + Tailwind CSS + hand-authored CSS for fidelity. Static export-compatible client-side routing.

**Repository:** git repo initialized at `/Users/forex/PIE` (branch `main`).

---

## Status Summary (updated at end of each step)

| Phase | Status |
| --- | --- |
| 1. Repo + handoff doc | ✅ Done |
| 2. Next.js scaffold | 🔄 In progress |
| 3. Source capture (13 pages × 3 viewports) | ⏳ Pending |
| 4. Asset download | ⏳ Pending |
| 5. Evidence analysis + component specs | ⏳ Pending |
| 6. Foundation (tokens, Header, Footer, layout) | ⏳ Pending |
| 7. Page builds | ⏳ Pending |
| 8. Verification + drift fixes | ⏳ Pending |
| 9. Vercel deploy | ⏳ Pending |

---

## Step Log

### Step 1 — Repo init + handoff doc (2026-08-19)
- `git init -b main` in `/Users/forex/PIE`.
- Created this `PROGRESS.md`.
- Created `.gitignore` (next/node artifacts — see below).

---

## Page Routes (from user-provided URL list)

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

External links preserved: Facebook, Messenger, mailto, tel:(815) 623-2112, Google Maps directions, Hibu policy links.

---

## Key Technical Notes

- Source site is built on **Hibu's website builder platform** (Duda-like runtime). Heavy JS; we only replicate *rendered* output (HTML/CSS/images), never copy their scripts.
- Capture tool: `pixel-perfect-clone` toolkit at `/Users/forex/.config/opencode/skills/pixel-perfect-clone`.
- Capture command form: `node scripts/capture-source.mjs --url <URL> --out <dir>` (serial, one page at a time).
- Verification: `node scripts/verify-clone.mjs --source <dir> --clone-url <local>` — screenshot diff + geometry report.
- Original site CDNs: `cdn.hibuwebsites.com`, `le-cdn.hibuwebsites.com`, `static-res-cdn.websites.hibu.com`. All assets downloaded locally into `public/`.
- Phone: (815) 623-2112 · Email: myaunke75@gmail.com · Facebook: facebook.com/259108440870825

---

## Handoff Instructions (for another AI agent)

1. Read this file + `.clone/evidence/*` for frozen source facts.
2. Dev server: `npm run dev` → http://localhost:3000
3. Build: `npm run build` then `npm start` (or `vercel --prod` to deploy).
4. Verification commands live in `.clone/` per page (see Step 3 log once done).
5. Do NOT modify `.clone/` captured evidence — it is the frozen source of truth.