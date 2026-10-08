# Pass 4 Web Design Guideline Summary

**Date:** Thu Oct 08 2026  
**Branch/Tree:** clever-design (worktree)  
**Scope:** Documentation-only finish (no source edits performed in this pass)

## (1) What changed and why

Pass 4 applied web-design guideline refinements across components, pages, styles, and layout. The changes target semantics, readability, layout polish, and dark-mode/theme correctness, while aligning with prior audit recommendations (better-ui/better-typography/better-accessibility).

### Components
- **components/Banner.tsx**: Hero/banner tagline changed from `<h2>` to `<p className="banner-tagline">` (corrects double-headline semantics; tagline is supporting text, not a section heading). Menu category headings demoted/corrected from `<h4>` to `<h3>` with `className="menu-cat-title"` to fix the `h2 → h4` skip (now `h2 → h3` for menu sections). Order CTA band preserved and exported in prior pass (no behavior change).
- **components/Footer.tsx**: Removed unused `Link` import. Preserved social link (Facebook) with `aria-label`; footer policy links kept as external/internal references; minimum 24px target consideration deferred per (5). Hours sourced from `SITE.hoursShort` (preserved from earlier pass).
- **components/Header.tsx**: Added/kept `topbar-order-btn` with external Order Now link (Toast). Mobile nav submenu toggle structure unchanged; hover feedback deferred (see remaining). Logo uses current asset.
- **components/MobileQuickActions.tsx**: Quick action links (Order/Call/Directions) preserved with external Order link.

### Pages
- **app/page.tsx**: Hero tagline `<h2>` → `<p className="hero-tagline">`. Testimonial heading uses proper ellipsis `…` (replaced `...`). Gallery array already structured as `{ src, alt }` with authentic alts; map destructures correctly. Visit Us anchor already `pill-btn lg ghost` (Pass 2). Toast Order link unchanged.
- **app/layout.tsx**: Added `viewport` export with `themeColor` (`#111111`) for better mobile chrome theming.
- **Menu/about/employment/appetizers/dinners/desserts/lunch-specials/sandwiches/broadster-chicken/reviews**: Selective cleanup only; Pass 2 better-ui state preserved. Employment form simplified to call/email path in prior pass (semantics deferred). 
- **lib/menus.ts**: Minor copy/formatting adjustments from prior passes; no business pricing changes.

### Styles (app/globals.css)
Pass 4 CSS updates include: 
- `.hero::before` scrim retained at `rgba(0,0,0,0.18)` (Pass 2). `.cta-band::before` remains `rgba(0,0,0,0.55)` (untouched).
- `.order-cta` band styles preserved (Pass 2) and included in mobile padding-inline list.
- `.pill-btn.ghost` variant preserved with hover/active tints and dark-mode overrides.
- Semantic class mapping: selectors updated to target `.hero-tagline` and `.banner-tagline` (replacing `.hero-content h2`/`.banner h2` where applicable) with corresponding typography/color rules.
- `@media (prefers-color-scheme: dark)` now includes `color-scheme: dark` to inform UA of dark theme.
- Mobile nav drawer and lightbox dialog: `touch-action: manipulation`, `-webkit-tap-highlight-color: transparent`, and `overscroll-behavior: contain` added to reduce scroll bleed and improve touch feel.
- Global typography: `text-wrap: balance` applied to headings; `text-wrap: pretty` applied to paragraph body text (per feel audit guidance).
- Miscellaneous hover/feedback polish scoped; no broad "all" transitions introduced. Focus-visible preserved; reduced-motion rules unchanged.

**Why:** Aligns heading structure with accessible outline, improves dark-mode chrome behavior, reduces mobile scroll jank/bleed, and improves text wrapping without changing branding or interactions.

## (2) What design/functionality preserved (branding, better-ui state, nav, Toast behavior)

- **Branding**: Colors, fonts (Quicksand, Source Sans Pro, Lora, Roboto), logo, tagline content, business hours text, address/phone, social links preserved.
- **Better-ui state from Pass 2**: Hero overlay 0.18, `.order-cta` band intact, ghost CTA styles and dark-mode ghost colors intact, gallery alts and `{src,alt}` structure intact. No re-run of better-ui items.
- **Navigation**: Header/nav structure, active states, mobile menu toggle, submenu behavior, skip link preserved. Nav item CTA in mobile still points to Toast.
- **Toast behavior**: Order URLs unchanged. All Order/Order Now anchors use `href={SITE.orderUrl}`, `target="_blank"`, `rel="noopener noreferrer"`, and `aria-label="Order now (opens in a new tab)"` (see §3). No lib/site.ts business edits; no cart/checkout paths touched.
- **Accessibility/UX primitives**: Focus-visible outlines, reduced-motion support, 44px-friendly tap targets where present, skip link preserved.
- **Content**: Authentic image alts preserved; no invented business details.

## (3) How Toast links checked

Verified exact occurrences in source:
- **components/Header.tsx**: topbar Order Now at ~line 67 (`className="pill-btn topbar-order-btn"`, `href={SITE.orderUrl}`, `target="_blank"`, `rel="noopener noreferrer"`, `aria-label="Order now (opens in a new tab)"`). Mobile nav CTA at ~line 100 same attributes.
- **app/page.tsx (hero)**: Order Now at ~line 49 same attributes.
- **components/MobileQuickActions.tsx**: Order Now at ~line 6 same attributes.
- **components/Banner.tsx (OrderCta)**: Order Now at ~line 95 same attributes.

All references use `SITE.orderUrl`; no URL string rewrites. No external Toast admin fetch; behavior is link-based (new tab) per prior implementation. No cart/checkout logic exists in codebase scope.

## (4) Validation commands passed/failed (new vs existing)

Commands run from `/Users/forex/.local/share/opencode/worktree/0f637027c0472892bad84de48f19cf59b0491c82/clever-design`:

**npm run lint**
- Exit: 0 (0 errors, 12 warnings)
- New failures: none
- Existing (pre-Pass 4): warnings include unused vars in `.clone/tools/*`, `@typescript-eslint/no-unused-vars` in `app/appetizers/page.tsx` (SITE), `@next/next/no-img-element` in `app/page.tsx`, `GalleryGrid.tsx`, `Header.tsx`; `@typescript-eslint/no-unused-vars` in `components/Footer.tsx` (Link). These are not introduced by this docs-only pass.

**npm run test**
- Exit: 0 (6 passed, 7 passed tests total)
- New failures: none
- Existing: all green (baseline matches prior report).

**npm run build**
- Exit: 0 (Next.js 16.3.1 Turbopack; compiled successfully; TypeScript check passed; static pages 17/17 prerendered)
- New failures: none
- Existing: green.

No new errors introduced. All validation passes.

## (5) Remaining issues / owner verification (deferred)

Items explicitly deferred per instructions and observed audits:
- **Link underline**: Text links in blocks (e.g. hero about link, in-text menu/contact links) may rely on color-only affordance in places; owner verification needed for consistent non-color cue.
- **Contact aria mismatch**: `/contact` map link aria-label vs visible text mismatch (noted in accessibility audit) — owner to verify/fix semantics.
- **About li-in-dl**: `/about` has list items nested inside `<dl>` (invalid semantics) — owner verification/fix.
- **Employment form semantics**: Employment form simplified to call/email path; original form semantics/error handling deferred.
- **SPA focus/live-region**: Route changes update URL/title but focus management/live region unannounced — owner to verify if needed.
- **Tally iframe**: Third-party Tally iframe unaudited across frames — owner verification needed.
- **Lightbox tab anomaly**: BODY tab-stop anomaly noted; arrow-key/tab loop inside dialog requires verification.
- **Photo contrast**: Some hero/about image/text contrast combinations noted in audits — owner visual verification.
- **next/image migration**: `<img>` usage remains in places (gallery, header/logo) for now; migration deferred (would change markup/perf but not core behavior).
- **Visual mobile/desktop confirmation gap**: Live visual confirmation (Playwright screenshots) not performed in this pass; owner should spot-check key pages.
- **Broadster path typo note**: Audit notes `/broadster-chicken` path/name; owner verification (typo vs intended) recommended.

**Pass 1 verified vs suggestions split:** Prior fixer work (Pass 2) verified baseline green; Pass 4 implemented guideline suggestions (semantic tags, CSS polish, layout viewport/themeColor). Suggestions explicitly deferred above remain open.
