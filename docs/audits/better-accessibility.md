# Accessibility Audit — clever-design

**Date:** 2026-10-07
**Scope:** 14 URLs rendered server-side and driven in Chrome for Testing (playwright-core + axe-core). One path note: `/apppetizers` (double-p) 404s with the site's 404 page (h1 "404"); the real path `/appetizers` returns 200 but was **not** exercised by the harness — its results are **Not verified** pending a follow-up run.
**Method:** automated axe-core A/AA scans per page, keyboard passes at 1280px, hit-area measurement, 320px/640px reflow proxy, reduced-motion checks, and interactive-component tests (lightbox, mobile nav, employment form). Screenshots were captured to a temp harness directory but **not viewed**.

---

## Findings

### Perceivable

| # | Severity | Location | Before | After | Why |
|---|----------|----------|--------|-------|-----|
| 1 | HIGH (candidate) | `/contact` — `a[aria-label="Open directions in Google Maps"]` | aria-label "Open directions in Google Maps" — visible text not contained in the accessible name | Derive the accessible name from the visible text (or include it verbatim in the label) | axe `label-content-name-mismatch`: users who rely on visible labels (low vision, cognitive) must see the name they hear/read; visible text missing from the name violates WCAG 2.5.3. |
| 2 | HIGH (candidate) | Home `.hero-upsell` — `#bbb` on `#fff`, 22px (plus `#999` and `#6db3e8` variants) | 1.91:1 contrast (variants also failing) | Darken text to ≥ 3:1 (large text) or ≥ 4.5:1 as applicable | axe `color-contrast`: primary hero upsell copy is effectively unreadable for low-vision users; WCAG 1.4.3. |
| 3 | HIGH (candidate) | Home `.about-p > a[href$="menu"]` — `#c10000` on `#252525` | 2.38:1, no underline; link distinguishable by color alone | Raise contrast to ≥ 4.5:1 **and** add a non-color affordance (underline) | Two failures in one: `color-contrast` and `link-in-text-block` (WCAG 1.4.3 + 1.4.1). |
| 4 | MEDIUM | `/family-or-party-trays` — `p > a[href$="contact"]` | Link in text block distinguished by color only | Underline (or equivalent non-color cue) | axe `link-in-text-block`; WCAG 1.4.1. |

### Structure & Semantics

| # | Severity | Location | Before | After | Why |
|---|----------|----------|--------|-------|-----|
| 5 | HIGH (candidate) | `/about` — definition list markup | 20 × `dlitem` + 10 × `listitem` violations: `<li>` elements nested inside `<dl>` | Move `<li>` out of `<dl>`; use proper `<dt>`/`<dd>` pairs (or switch the container to a list if it is truly a list) | Invalid nesting breaks the semantics assistive tech exposes for both lists and description lists (WCAG 1.3.1). |
| 6 | LOW | Heading hierarchy (site-wide) | Occasional `h2 → h4` skips observed | Use sequential heading levels | Heading jumps impair screen-reader navigation; minor while headings still convey visual hierarchy. |

### Operable (Keyboard & Hit Areas)

| # | Severity | Location | Before | After | Why |
|---|----------|----------|--------|-------|-----|
| 7 | MEDIUM (anomaly) | Lightbox | Native `dialog` + `showModal`: focus-in on open, Esc closes, focus restore all pass — **but one BODY tab-stop anomaly** observed (next-Tab landing unverified) | Re-test tab loop in follow-up; ensure focus lands on/in the dialog and tabs cycle within it | If focus escapes to `BODY` or behind the dialog, keyboard users can lose their place; potential trap-adjacent failure (WCAG 2.1.1 / 2.4.3). |
| 8 | MEDIUM | Footer policy links (all pages) | 17px height ×5 | ≥ 24px (ideally 44px) target height | Below the 24×24 minimum of WCAG 2.5.8 (AA); phone/inline links at 19–22px fall under the inline exception. Footer **non-inline** spacing exception was not measured (Not verified). |
| 9 | Verified pass | Skip link / focus ring | First Tab = skip link on every page; focus ring solid 2px (`rgb(193,0,0)` on light, white in header nav) at every stop; no `outline:none` anywhere | — (no change needed) | Focus visibility and skip navigation both meet intent (WCAG 2.4.1, 2.4.7). Open sub-item: activating skip sets `#main-content` but `activeElement` stays `BODY` — next-Tab landing is **unverified**. |

### Understandable

| # | Severity | Location | Before | After | Why |
|---|----------|----------|--------|-------|-----|
| 10 | MEDIUM | Employment form — error handling | Empty submit relies on native HTML5 validation only: focus moves to first invalid control (good) but no `aria-invalid`, no `aria-describedby`, no inline error text, no live region | Add inline error messages wired via `aria-describedby`, `aria-invalid="true"`, announced in an `aria-live` region | Native bubbles are invisible to screen readers after focus moves and vanish on scroll; WCAG 3.3.1/3.3.3 need programmatic, persistent error identification. Valid submit path **untested**. |
| 11 | MEDIUM | SPA route changes | URL and document title update correctly, but focus stays on the clicked link and nothing is announced (no live region) | Move focus to the new view's main heading/`main`, or announce the route via a polite live region | Single-page navigation is silent for screen-reader and switch users; WCAG 4.1.3 (status messages) / 2.4.3 (focus management). |
| 12 | HIGH (candidate) | `/contact` Tally form (lazy `tally.so` iframe) | iframe has a `title`; cross-frame content not audited — axe cannot reach inside the third-party frame | Run the dedicated follow-up script (`followup.js`) covering Tally, or replace/overlay with a first-party form if findings are HIGH | Third-party embeds are the user's responsibility when used; findings unknown until the follow-up runs. |

### Robust (Reduced Motion) — pass

Reduced-motion on `/`, `/menu`, `/gallery`, `/contact`: 0 transitions > 50ms, `scroll-behavior: auto`. Kill-switch at `globals.css:1230`. No changes needed (WCAG 2.3.3).

---

## Verification

**Verified by the harness run (playwright-core + axe-core, Chrome for Testing):**

- SSR/HTML on all 14 URLs: `lang=en`, viewport `initial-scale=1` (no zoom block), exactly one `h1` per page, skip link present, `header`/`main`/`footer` landmarks, labeled navs, meaningful `img` alt everywhere, no positive `tabindex`, no unnamed links/buttons.
- Keyboard pass at 1280px: skip link first, visible 2px focus ring at every stop, no `outline:none`.
- axe A/AA scans per page (findings above; other rules clean).
- Hit areas: footer policy links 17px ×5; phone/inline 19–22px (inline exception).
- Reflow: `scrollWidth − clientWidth = 0` at 320px and 640px (200% proxy) on all 14 pages.
- Reduced motion on 4 key pages (pass).
- Lightbox: `showModal` semantics, focus-in, Esc, focus-restore pass.
- Mobile nav at 390px: labeled toggle, focus enters nav, sane order, Esc closes and refocuses toggle.
- Employment form: `for`-associated labels, autocomplete, `email`/`tel`/`file` types, enabled submit, native invalid-focus behavior.

**Not verified (follow-up `followup.js` not run):**

- `/appetizers` real-path pass (the 404-path run does not count).
- Skip-link next-Tab landing after activation (activeElement stays `BODY`).
- Lightbox BODY tab-stop anomaly re-test; arrow-key navigation inside lightbox.
- Tally iframe cross-frame audit.
- `aria-current` state on nav.
- Hero-upsell contrast variant details (`#999`, `#6db3e8`).
- Footer mobile hit areas and non-inline spacing exception measurement.
- Valid employment-form submit path.
- 4 captured screenshots — not viewed.

---

## Verdict

**Needs changes.**

The site's foundations are solid (landmarks, skip links, focus visibility, reflow, reduced motion, mobile nav), but there are HIGH-severity candidates — contact label-in-name, `/about` list semantics, color-only/low-contrast links, and unaudited Tally embed — plus MEDIUM issues (native-only form errors, unannounced SPA navigation, lightbox tab anomaly, 17px footer targets).

Escalate to **Block** only if the follow-up confirms a keyboard trap or a HIGH failure on `/appetizers`; escalate/de-escalate after `followup.js` runs and the screenshots are reviewed. **Approve** is not available until the HIGH items are fixed and re-verified.
