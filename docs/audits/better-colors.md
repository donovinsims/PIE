# Audit: better-colors

**Date:** 2026-10-07
**Status:** Complete (source-level audit; no runtime measurement performed)
**Site changes made:** None.

---

## Scope

- Color/token review of the hex token system (notation is hex, **not OKLCH** — preserved throughout).
- Tokens reviewed in `:root`: `--accent #c10000`, `--page-bg #eeeeee`, `--text #252525`, `--footer-dark #333333`, plus a `prefers-color-scheme: dark` block (~line 1260) with ~60 hex overrides (e.g. `a`/`.pill-btn` → `#e54545`).
- Live CSS matches the repo (only `rgba` → hex minification diffs). Zero `oklch()`/`lab()` values found → no gamut-mapping or P3 concerns; everything is sRGB.
- 14 URLs fetched via `curl` for source-level inspection.
- `/apppetizers` returns 404 (typo route); the real `/appetizers` returns 200.
- Inline colors exist only in `app/about/page.tsx` (`#C10000` / `#252525`, bypassing `var(--accent)`).
- Contact page is a Tally iframe (form contents not auditable at source level).
- All contrast pairs below were derived from source reading with **estimated** ratios. No APCA or WCAG contrast calculation was executed. Every pair is marked **Not verified**.

---

## Findings

| Severity | Location (URL + component) | Before | After (suggestion) | Why (estimated ratio · threshold · status) |
|---|---|---|---|---|
| HIGH candidate | `/` — hero upsell text (`.hero-upsell` or equivalent) | `#bbb` on `#fff` | Darken to ≥ `#767676` for AA | Est. ~1.9:1 vs WCAG AA 4.5:1 (text) / UI 3:1 — large deficit if confirmed. **Not verified.** |
| HIGH candidate | Contact — banner `h1` over `#333`→`~#292929` gradient | `#111` on `#333`→`~#292929` | Light text (e.g. `#fff`) on dark band | Est. ~1.3:1 vs 4.5:1 — near-invisible if confirmed. **Not verified.** |
| MEDIUM candidate | Dark mode — `.pill-btn` background | `#fff` text on dark `#e54545` | Darker button or darker text pairing | Est. ~3.9:1, fails AA 4.5:1 for normal text (passes 3:1 only for large/bold). **Not verified.** |
| MEDIUM candidate | Dark mode — `a` links on `#1a1a1a` | `#e54545` on `#1a1a1a` | Brighten link color in dark block | Est. ~4.4:1 — marginal, just under AA 4.5:1. **Not verified.** |
| MEDIUM candidate | `.footer-band p` | `#777` on `#fff` | `#767676` or darker | Est. 4.04:1 vs AA 4.5:1. **Not verified.** |
| MEDIUM candidate | Star rating display | `#f7b600` on white | Darker gold for text/icon use | Est. ~1.8:1 vs UI component 3:1 (1.4.11) — fails if confirmed. **Not verified.** |
| MEDIUM candidate | Input / tab borders | `#ccc` on white | `#949494` or darker | Est. 1.6:1 vs UI 3:1 (1.4.11; 1.6:1 also under the 1.4.11 common 3:1 floor) — fails if confirmed. **Not verified.** |
| MEDIUM candidate | Banner `h1` over hero photos | `#111` over photos with `0.27` overlay | Photo-dependent; verify per image | Contrast is photo-dependent; overlay is thin (0.27). **Not verified.** |
| INFO | `app/about/page.tsx` | Inline `#C10000` / `#252525` bypass `var(--accent)`/`var(--text)` | Use CSS variables | Consistency issue (dark-mode overrides won't apply); no contrast claim. **Not verified.** |
| INFO | ~15 additional pairs noted during review | — | — | Judged passing by eye, but unmeasured. **Not verified.** |

Notes:

- No pair is asserted as a confirmed failure: all ratios are source-derived estimates.
- The two HIGH rows are candidates only; they become blockers only after measurement.
- Dark-block values are overrides applied under `prefers-color-scheme: dark`; pairs listed under dark mode assume that block is active.

---

## Verification

| Check | Status |
|---|---|
| CSS + HTML fetched (14 URLs via `curl`); live CSS vs repo diff (rgba→hex minify only) | **Done** |
| APCA computation (apca-w3@0.1.9, `APCAcontrast`/`sRGBtoY`) | **Not verified** (tooling extracted, not run) |
| WCAG contrast ratio computation | **Not verified** (estimated only) |
| Browser visits (Playwright 1.60.x + chromium) | **Not verified** (not run) |
| Screenshots | **Not verified** (none captured) |
| Dark-mode pass (`prefers-color-scheme: dark` render check) | **Not verified** |
| PIL pixel sampling of rendered surfaces | **Not verified** |

Tooling prepared but unused:

- `apca-w3@0.1.9` extracted (`APCAcontrast`, `sRGBtoY` available).
- PIL available for pixel sampling.
- Playwright 1.60–1.61.1 with cached `chromium-1243`. The bundled toolkit copy expects `chromium-1228` — use the 1.60.0 browser copies or pass an explicit `executablePath`.

---

## Verdict

**Needs changes** — no confirmed HIGH issues; nothing blocks on measurement alone.

- All listed pairs are candidates with estimated ratios, tagged **Not verified**.
- Next step: run APCA/WCAG measurement over the candidate pairs (especially the two HIGH candidates) before treating any as a required fix.
