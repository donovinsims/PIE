# Better UI Audit

**Date:** 2026-10-07
**Verdict:** Needs changes

## Scope and Coverage

- **Stack:** Next.js 16.3.1, Tailwind 4, no motion library (CSS-only patterns apply).
- **Pages audited:** all 14 — `/`, `/menu`, `/broadster-chicken`, `/apppetizers` (note: 404; the real page is `/appetizers`), `/sandwiches`, `/dinners`, `/desserts`, `/family-or-party-trays`, `/lunch-specials`, `/gallery`, `/employment`, `/reviews`, `/about`, `/contact`.
- **Method:** source review only. Live browser probe was attempted but blocked (see Verification).

## Findings

### Principle: Press scale

| Severity | Location | Before | After | Why |
|---|---|---|---|---|
| Medium | `globals.css:352` (`.pill-btn:active`) | `scale(0.97)` | `scale(0.96)` | Skill mandates exactly 0.96; current value violates the spec. |

### Principle: will-change usage

| Severity | Location | Before | After | Why |
|---|---|---|---|---|
| Low | `globals.css:685` (`.cat-card img`) | `will-change: transform` set permanently | Remove; apply sparingly, only when stutter is observed | Permanent `will-change` keeps a compositor layer alive for every card image — wasted memory; skill says use sparingly / only on stutter. |

### Principle: Image outlines (principle 8)

| Severity | Location | Before | After | Why |
|---|---|---|---|---|
| Medium | Home gallery, `/gallery`, banners, `.cat-card` images — no outlines anywhere in the codebase | No image outline | Add image outlines per principle 8 | Principle 8 unapplied across all image surfaces. |

### Principle: Borders for depth

| Severity | Location | Before | After | Why |
|---|---|---|---|---|
| Low | `.employment-form`, `.tally-card` | `border: 1px solid #e5e5e5` used as elevation | Replace border-as-elevation with shadow (shadow candidates) | Borders are for edges, not depth; dividers elsewhere are correctly kept. |

### Principle: Icon fills / currentColor

| Severity | Location | Before | After | Why |
|---|---|---|---|---|
| Medium | `Footer.tsx:38-44` (Facebook icon SVG) | Hardcoded `fill: #3b5998` / `#fff`, no hover state | `fill: currentColor` + hover state | Hardcoded fills violate the currentColor rule; icon has no hover feedback. |

### Principle: Text glyphs as icons

| Severity | Location | Before | After | Why |
|---|---|---|---|---|
| Medium | `GalleryGrid.tsx:105-112` (lightbox controls) | Text glyphs `‹` `✕` `›` | Real SVG icons | Text glyphs are not icons; inconsistent rendering and accessibility. |
| Low | `Header.tsx:114,126` (nav caret) | Text glyph `▾` | Real SVG icon | Same rule. |
| Low | Star ratings | Text glyphs `★★★★` | Real SVG icons | Same rule. |

### Principle: Interactive feedback (hover/press)

| Severity | Location | Before | After | Why |
|---|---|---|---|---|
| Medium | `.gallery-thumb` buttons; `.mobile-quick-actions a` | No press/hover feedback at all | Add hover + `:active` feedback | Interactive elements must confirm interaction. |

### Principle: Menu / overlay motion

| Severity | Location | Before | After | Why |
|---|---|---|---|---|
| Low | Mobile nav and `.nav-drop` menus | Display-toggled; no enter/exit animation | Add enter/exit transitions | Toggled display snaps open/closed with no motion. |
| Info | Lightbox | Enter keyframes present, no exit animation | — | Defensible as-is; noted for completeness. |

### Good (no change needed)

- No `transition: all` anywhere.
- `prefers-reduced-motion` respected in 3 places.

## Verification

- **Source review:** done — all findings above are from reading the source at the listed file/line locations.
- **Live probe:** **Not verified.** Playwright browser probe was blocked: installed Playwright Chromium is build 1223 while the cache holds 1243 (Node playwright 1.60.0 matches 1243). Recommended fix: pass an explicit `executable_path` to the cached 1243 Chromium binary when probing.

## Verdict: Needs changes

Scale constant, permanent `will-change`, missing image outlines, border-as-elevation, hardcoded SVG fills, text-glyph icons, and missing interactive feedback should be addressed; live-probe confirmation remains outstanding.
