# Better Typography Audit

**Date:** 2026-10-07

## Scope

- All 14 site URLs.
- NOTE: `/apppetizers` 404s — the real page is `/appetizers`.
- Context: Next.js 16 + Tailwind present, but the site is styled in plain CSS (`app/globals.css`, 1887 lines). All fixes below are plain-CSS.
- Root layout: `lang="en"`, no `maximum-scale` meta (good — no viewport/user-scalable restrictions).
- Verification coverage: live HTML heading extraction done for 13/14 URLs; rendered checks partial (home body confirmed 16px/24px Source Sans Pro; desktop reload pending).

## Findings

### Measure (line length)

| Severity | Location | Before | After | Why |
|---|---|---|---|---|
| MEDIUM | `.intro p` (lines 424, 426); `.about-p` (lines 582, 583) | `max-width: 960px` centered — ≫75ch | Cap at ~65–75ch (`max-width: 75ch` or ~680px) | 960px at body size far exceeds the 75ch comfortable reading maximum; long lines tire the eye and hurt tracking. |

### Heading hierarchy

| Severity | Location | Before | After | Why |
|---|---|---|---|---|
| MEDIUM | Menu pages: `.menu-cat-title` (`h4`, 26px/700) under parent `h2` (26px/700); `/employment` empty `<h2></h2>` | `h1 → h2 → h4` skip; h4 visually identical to its h2; empty h2 on /employment | `h1 → h2 → h3` with a real size/weight step between h2 and h3; remove the empty `<h2></h2>` | Skipped levels break the document outline for screen readers/SEO; a heading identical in size and weight to its parent conveys no hierarchy. |
| — | Home `h1` "Roscoe's Favorite Pizzeria"; footer `h3`s | Consistent | No action | Correct, consistent hierarchy — no change needed. |

### Line-height

| Severity | Location | Before | After | Why |
|---|---|---|---|---|
| MEDIUM | `.banner h2` (line 401) | `17px` / `34px` line-height (2.0) | Unitless ~1.2–1.3 for a heading (≈22px) | 2.0 line-height is far too loose for a heading; it visually detaches lines and reads as body-leading on display text. |
| LOW | `body` (line 104) | Fixed `line-height: 24px` | Unitless (e.g. `1.5`) | A fixed px leading does not scale with font size, so any size change breaks vertical rhythm. |
| — | `.form-row input/textarea` (line 991) | Base 15px, `899px`-media override to 16px | No action | Mobile inputs are 16px — iOS zoom-on-focus is already avoided. |

### Font size floor

| Severity | Location | Before | After | Why |
|---|---|---|---|---|
| LOW | `.footer-policy` (line 824), `.footer-copy` (line 847) | Roboto 11px | ≥12px (prefer 12px+) | 11px is below the 12px minimum legibility floor, especially in a secondary face (Roboto) at small optical size. |

### Type scale & polish

| Severity | Location | Before | After | Why |
|---|---|---|---|---|
| LOW | `app/globals.css` (whole file) | One-off px sizes: 11, 13, 14, 15, 17, 18, 20, 22, 25, 26, 28, 30, 38, 40, plus clamps — no type scale | Establish a small modular scale (custom properties) and map sizes to it | No scale means no consistent rhythm; every size is a one-off decision that drifts. |
| LOW | Whole file | No `-webkit-font-smoothing` / `antialiased` anywhere | Set `-webkit-font-smoothing: antialiased` on body (macOS rendering consistency) | Missing standard smoothing control; rendering differs across platforms. |
| LOW | Whole file | No `text-wrap: balance` / `pretty` anywhere | `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs | Widows/orphans and ragged heading line breaks where the browser can fix them for free. |

### Good (no action)

- Prices already use `tabular-nums` (lines 474, 495) — aligned digits in price columns.
- No truncation issues found; no `ellipsis`/`clamp` needed.
- Root `lang="en"` set; no `maximum-scale` on viewport meta.
- Home body confirmed rendered at 16px/24px Source Sans Pro.

## Verification

| Check | Status |
|---|---|
| Source (`app/globals.css` + layouts/pages) | **Verified (full)** |
| Live HTML heading extraction | **13/14 URLs** (missing: `/apppetizers`, which 404s — real page is `/appetizers`) |
| Rendered/computed-style checks | **Partial** — home body 16px/24px Source Sans Pro confirmed; desktop reload **Not verified** |
| Desktop rendered pass | Not verified |

## Verdict

**Needs changes.** MEDIUM issues (measure, heading skip, banner line-height) should be fixed first, then the LOW items (font floor, unitless line-height, type scale, font smoothing, text-wrap).
