# Better Layout Audit — donovinsims/PIE

**Date:** 2026-10-07
**Skill:** better-layout (grouping-and-alignment, spacing-and-adaptivity)
**Format:** Severity | Location | Before | After | Why, grouped by principle.

---

## Scope and Coverage

Repo is the site itself (donovinsims/PIE, Next.js 16 + Tailwind 4).

**Source reviewed:**

- `app/globals.css` (1887 lines)
- `components/`: `Header`, `Footer`, `Banner`, `MobileQuickActions`, `GalleryGrid`
- Pages: `app/page.tsx`, `app/menu/page.tsx`, and the `contact`, `employment`, `reviews`, `about`, `gallery` pages, plus 7 menu pages

**All 14 URLs:**

1. `/`
2. `/menu`
3. `/appetizers`
4. `/broadster-chicken`
5. `/desserts`
6. `/dinners`
7. `/family-or-party-trays`
8. `/lunch-specials`
9. `/sandwiches`
10. `/contact`
11. `/employment`
12. `/reviews`
13. `/about`
14. `/gallery`

**Route note:** `/apppetizers` (three p's) returns **404** — the real route is `/appetizers`. Any earlier reference to `/apppetizers` is a typo, not a coverage gap.

---

## Findings

### Principle: RTL and logical properties

All findings below are **source-level — need live verification** unless marked otherwise.

| Severity | Location | Before | After | Why |
|---|---|---|---|---|
| Medium | `globals.css:473` (`.price`) | `padding-left: 24px` (physical) | `padding-inline-end: 24px` | Physical props break under `dir="rtl"`; logical props follow text direction automatically |
| Medium | `globals.css:285` (`.nav-caret`) | `margin-left: 6px` | `margin-inline-start: 6px` | Same RTL breakage; caret lands on wrong side in RTL |
| Medium | `globals.css:296` (`.nav-drop`) | `left: 0` | `inset-inline-start: 0` | Dropdown pins to wrong edge in RTL |
| Low | `globals.css:656` (`.skip-link`) | `left: 16px` | `inset-inline-start: 16px` | Skip link off-screen-position in RTL |
| Low | `globals.css:201` (`.topbar-center`) | `left: 50%` (with translate) | `inset-inline-start: 50%` | Centering math assumes LTR |
| Medium | `globals.css:469, 642` (`.menu-item`, `.testimonial-card`) | `text-align: left` | `text-align: start` | Text hugs wrong edge in RTL |
| — | whole document | No `dir="rtl"` handling anywhere | Audit for `dir` support or document LTR-only intent | No RTL path exists at all |

### Principle: Growth and clipping (fixed heights)

Source-level — needs live verification.

| Severity | Location | Before | After | Why |
|---|---|---|---|---|
| High | `globals.css:767` (`.footer-band`) | Fixed `height: 237px` | `min-height` (or auto + padding) | Content growth clips instead of pushing layout |
| Medium | `globals.css:816` (`.footer-directions`) | Fixed `height: 100px` | `min-height` | Address/directions text overflow clips on desktop |
| Medium | `globals.css:836` (`.footer-policy`) | Fixed `height: 76px` | `min-height` | Policy links wrap → clipped |
| Low | `globals.css:853` (`.footer-copy`) | Fixed `height: 40px` | `min-height` | Copyright line wrap clips |
| Medium | `globals.css:366` (`.banner`) | Fixed `height: 360px` | `min-height` | Long page titles clip in banner |
| Medium | `globals.css:162` (`.topbar`) | Fixed `height: 140px` (non-hero) | `min-height` | See overlap finding below; fixed height forces overflow |

Note: some of these heights are auto on mobile but fixed on desktop — desktop is the exposure.

### Principle: Overlap

Source-level — needs live verification.

| Severity | Location | Before | After | Why |
|---|---|---|---|---|
| High | `globals.css:154-156, 162, 200-216` (`.topbar-logo` vs `.topbar`) | `.topbar-logo` is 155px tall inside a 140px non-hero `.topbar`, absolutely positioned at `top: 0` → overflows 15px. `body:has(.hero)` bumps topbar to 156px; inner pages get no fix | Give inner-page topbar the same growth (or `min-height` matching logo) | Logo overflows the topbar on every non-hero (inner) page; hero pages are accidentally correct |

### Principle: Controls vs content

Source-level — needs live verification.

| Severity | Location | Before | After | Why |
|---|---|---|---|---|
| High | `app/reviews/page.tsx`, `globals.css:902-913` | Reviews tabs are static `<span class="tab">` pill buttons — non-interactive; second tab is unlabeled `"(4.4 / 649 Ratings)"` | Real buttons/links with accessible labels; rating goes in tab panel, not tab label | Looks clickable, isn't; unlabeled tab fails basic control semantics |
| Low | `app/reviews/page.tsx` | "Write Review" pill has no CSS rule, inline `marginTop: 14`, inherits center alignment | Class-based styling consistent with other pills | Inconsistent spacing source; inline style bypasses the design system |
| Medium | `globals.css:1359-1360` (`.menu-jumps`) | Bare bold red text, `gap: 8px 14px` — below the 24px clearance; reads like body copy | Style as a distinct jump-nav control (chip/pill) with ≥24px clearance | Grouping/affordance failure: navigation looks like prose |
| Low | `globals.css:1663-1670` (`.hero-actions .pill-btn`), `globals.css:1858-1886` (`.mobile-quick-actions`) | Hero button `width: 100%` full-bleed inside 20px padding (OK); quick-actions `inset-inline: 0` edge-to-edge with no separators | Keep hero as-is; add separators or inset to quick-actions | Edge-to-edge tap targets with no visual division reduce scannability |

### Principle: Grouping and separation

Source-level — needs live verification.

| Severity | Location | Before | After | Why |
|---|---|---|---|---|
| Medium | `globals.css:454-458` (`.menu-cat + .menu-cat`) | `border-top` **and** `margin-top: 24px` **and** `padding-top: 8px` — separator plus gap stacked | Pick one signal: border with modest padding, or gap without border | Double separation reads as two sections between one boundary |
| Low | `globals.css:918` (`.review-card`) | `border-bottom` used similarly as sole separator with tight spacing | Consistent separator rhythm shared with `.menu-cat` | Inconsistent gap/border cadence across lists |

### Principle: Progressive disclosure

Source-level — needs live verification (peek amount not measured).

| Severity | Location | Before | After | Why |
|---|---|---|---|---|
| Low | `globals.css:1783-1789` (`.reviews-tabs`, mobile) | `overflow-x: auto` with negative margin, peek 16–32px (unverified) | Verify peek is ≥16px and add scroll affordance (fade/mask) | Hidden overflow needs a visible hint that more tabs exist |

### Principle: Breakpoints and dead code

Source-level — band behavior unverified.

| Severity | Location | Before | After | Why |
|---|---|---|---|---|
| Medium | `globals.css:1343-1353` | Single 899px + 1100px breakpoints; 900–1100px band: `.cat-card` at 420px, `.topbar` wraps (unverified) | Verify the mid-band; consider intermediate step or fluid sizing | Mid-width band may wrap/overflow between mobile and desktop rules |
| Low | `globals.css:1376` | Dead CSS: `.cards-row`, `.cat-card`, `.photo-grid` rules with no matching markup | Remove | Dead rules obscure the real cascade and invite accidental reuse |

### Principle: Contrast (cross-domain note)

Source-level — needs live verification.

| Severity | Location | Before | After | Why |
|---|---|---|---|---|
| High | `globals.css:397, 1357` (`.page-contact .banner`) | `.banner h1` is `#111` on a `#333` banner background — near-invisible | Light text on dark banner (or lighten banner) | Text effectively unreadable on `/contact`; primarily a contrast defect, logged here because it surfaced during layout review |

---

## Considered but Rejected

1. **Hero pill button full-bleed (`width: 100%` inside 20px padding).** It fills the padded content box, not the viewport — alignment is correct. Rejected as a non-issue.
2. **Mobile `.footer-*` auto heights.** Mobile already lets footer sections size to content; only desktop fixes them. Rejected mobile-side changes; the finding is scoped to desktop.
3. **Rewriting the single-899px breakpoint system wholesale.** Only the 900–1100px band shows plausible stress; a full breakpoint refactor is out of scope for this audit. Rejected pending live measurement of that band.

---

## Verification

What was actually run:

1. **Source review** — `app/globals.css` (1887 lines) plus `components/Header`, `Footer`, `Banner`, `MobileQuickActions`, `GalleryGrid`, `app/page.tsx`, `app/menu/page.tsx`, and the contact/employment/reviews/about/gallery and 7 menu pages.
2. **Live snapshots — 2 total:** `/` and `/menu`, each at mobile 390×844 and desktop 1440×900.

**Not verified (live measurement required):**

- All fixed-height clipping findings (`.footer-band` 237px, `.footer-directions` 100px, `.footer-policy` 76px, `.footer-copy` 40px, `.banner` 360px, `.topbar` 140px) — source-level only.
- Topbar logo 15px overflow on inner pages — source-level only.
- Reviews tab interactivity and unlabeled second tab — source-level only.
- 900–1100px band behavior (`.cat-card` 420px, topbar wrap) — unverified.
- `.reviews-tabs` scroll peek (16–32px) — unverified.
- Contact banner `#111`-on-`#333` rendering — source-level only.
- All RTL findings — source-level (no RTL rendering exercised).

---

## Verdict

**Needs changes.** The audit surfaced source-level defects across every principle reviewed — fixed heights that clip on desktop, a topbar logo overflowing inner pages, non-interactive review tabs, a near-invisible contact banner heading, and widespread physical CSS properties with no RTL handling. Findings are grounded in source reading plus two route snapshots; exact rendered impact (overflow pixels, mid-band wrap, scroll peek) is **pending live measurement** before fixes are prioritized.
