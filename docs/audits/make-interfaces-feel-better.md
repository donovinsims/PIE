# Make Interfaces Feel Better — Audit

Full-mode audit of interaction feel, typography polish, motion, and touch ergonomics across the site.

**Stack:** Next.js 16.3.1 + React 19. Plain CSS in `app/globals.css` (1887 lines). Tailwind is installed but unused — **all fixes are plain CSS**.

## Scope / Coverage

| # | Page | URL | Reviewed | Live snapshot |
|---|------|-----|----------|---------------|
| 1 | Home | `/` | Yes | Verified |
| 2 | Menu | `/menu` | Yes | Verified |
| 3 | Broadster Chicken | `/broadster-chicken` | Yes (source only) | Not verified |
| 4 | Appetizers | `/apppetizers` → **404; real route is `/appetizers`** | Yes (source only) | Not verified |
| 5 | Sandwiches | `/sandwiches` | Yes (source only) | Not verified |
| 6 | Dinners | `/dinners` | Yes (source only) | Not verified |
| 7 | Desserts | `/desserts` | Yes (source only) | Not verified |
| 8 | Family or Party Trays | `/family-or-party-trays` | Yes (source only) | Not verified |
| 9 | Lunch Specials | `/lunch-specials` | Yes (source only) | Not verified |
| 10 | Gallery | `/gallery` | Yes (source only) | Not verified |
| 11 | Employment | `/employment` | Yes (source only) | Not verified |
| 12 | Reviews | `/reviews` | Yes (source only) | Not verified |
| 13 | About | `/about` | Yes (source only) | Not verified |
| 14 | Contact | `/contact` | Yes (source only) | Not verified |

Coverage: **14/14 pages reviewed via source; 2/14 verified against a live snapshot** (`/` and `/menu`). The other 12 pages are source-review only — findings touching them are marked **Live-unverified**.

## Findings

15 findings, grouped by principle. Severity | Location | Before | After | Why.

### Principle 8 — Font rendering

**1. Font smoothing missing** — `MEDIUM` — Systemic (`html`/root in `app/globals.css`)

- **Before:** No `-webkit-font-smoothing: antialiased` (and no `moz-osx-font-smoothing: grayscale`) set on `html`/root.
- **After:** Add `-webkit-font-smoothing: antialiased;` (plus `-moz-osx-font-smoothing: grayscale;` for Firefox) on the root element.
- **Why:** Text renders heavier/blurrier on macOS than the design intends; this is a one-line systemic fix affecting every page.

### Principle 10 — Text wrapping

**2. No `text-wrap` balance/pretty** — `MEDIUM` — `.banner h1`, `.stop-band h2`, `.menu-cat-title`; `body`

- **Before:** Headings render with ragged, unbalanced line breaks; body copy has no `text-wrap: pretty`.
- **After:** Add `text-wrap: balance` to `.banner h1`, `.stop-band h2`, `.menu-cat-title`; add `text-wrap: pretty` to `body`.
- **Why:** Balanced headings avoid single-word orphan lines and read as intentionally set type; `pretty` on body removes awkward wraps in paragraphs.

### Principle 12 — Scale on press

**3. Press scale off-spec** — `LOW` — `app/globals.css:352`, `.pill-btn:active`

- **Before:** `transform: scale(0.97)` on `:active`.
- **After:** `transform: scale(0.96)` — must be exactly `0.96` per spec.
- **Why:** Spec-mandated press feedback value; 0.97 is visibly subtler than the specified response.

**4. Scale-on-press missing on interactive elements** — `LOW` — `.tab`, `.gallery-thumb`, `.nav-link`, `.mobile-quick-actions a`

- **Before:** No `:active` scale feedback on these controls.
- **After:** Add `:active { transform: scale(0.96) }` (matching the spec value) to each.
- **Why:** Consistent tactile press feedback across all pressable controls; without it, some elements feel inert on tap. *(`.gallery-thumb` is on `/gallery` — **Live-unverified**; the rest confirmed in source.)*

### Principles 14/15 — Transitions and compositor discipline

**5. Transition specificity gaps** — `LOW` — `.pill-btn` (OK); `.tab`, `.nav-drop-link`, `.footer-policy a`; `.cat-card img` (needs check)

- **Before:** `.pill-btn` transitions are correct. `.tab`, `.nav-drop-link`, `.footer-policy a` have hovers with no transition; `.cat-card img` transition should be checked.
- **After:** Add transitions to the hover states of `.tab`, `.nav-drop-link`, `.footer-policy a`; verify `.cat-card img`.
- **Why:** Instant hover state jumps feel cheap next to elements that do transition. *(`.cat-card img` and `.nav-drop-link` live on pages beyond `/` and `/menu` — **Live-unverified**.)*

**6. Permanent `will-change`** — `LOW` — `app/globals.css:685`, `.cat-card img`

- **Before:** `will-change: transform` permanently applied.
- **After:** Remove it unless actual stutter is observed.
- **Why:** Permanent `will-change` pins the layer to the compositor and wastes memory for the element's whole lifetime; it should mark imminent animation, not sit idle.

### Principles 4/6 — Motion and reduced motion

**7. Lightbox keyframes incomplete; reduced-motion handled two ways** — `LOW` — `.gallery-lightbox[open]` (`/gallery`)

- **Before:** Enter keyframes exist on `.gallery-lightbox[open]` with no exit animation. Reduced motion is split between a CSS `prefers-reduced-motion` media query and a JS-driven `.no-motion` class.
- **After:** Add a matching exit animation; consolidate reduced-motion handling (one mechanism rather than split CSS + JS).
- **Why:** Enter-without-exit feels unbalanced; two parallel reduced-motion systems drift out of sync. **Live-unverified** (`/gallery` not snapshotted).

### Principle 3 — Depth: shadows, not borders

**8. Borders used for depth** — `LOW` — `.employment-form`, `.tally-card`, `.map-box`, `.tab`; `.review-card` (correct)

- **Before:** `.employment-form`, `.tally-card`, `map-box`, `.tab` use `1px solid #e5e5e5` / `#ccc` borders to convey elevation. `.review-card` uses `border-bottom` — **correctly kept** (a divider, not depth).
- **After:** Replace depth-simulating borders with shadows on the four offenders; leave `.review-card`'s `border-bottom` alone.
- **Why:** Borders read as outlines; elevation is communicated by shadow. Mixing both muddles the visual hierarchy. **Live-unverified** for all four offending pages (`/employment`, `/contact`, and menu-family pages not snapshotted); `.review-card` on `/reviews` also **Live-unverified**.

### Principle 1 — Concentric radius

**9. Incoherent radius nesting** — `LOW` — `.tally-card`, `.employment-form`, nested inputs, `.gallery-thumb`, `.gallery-lightbox`, testimonial card

- **Before:** `.tally-card` / `.employment-form` use `8px` radius with `32px`/`28px` padding, nested inputs at `5px`; `.gallery-thumb` is `2px` beside an `8px` lightbox; testimonial card is `10px`.
- **After:** Align nested radii to their containers so radii scale coherently inward (container ≥ nested element, in proportional steps).
- **Why:** A near-square `2px` thumb inside an `8px` lightbox, or `5px` inputs inside `8px` cards, breaks the concentric-radius logic the eye expects. **Live-unverified** (all three pages — `/gallery`, `/employment`, `/reviews` — not snapshotted).

### Principle 11 — Image outlines

**10. Image outlines missing** — `MEDIUM` — Systemic (all images)

- **Before:** Images have no outline against their backgrounds.
- **After:** Add `1px` outline/border: `oklch(0 0 0 / 0.1)` in light mode, `oklch(1 0 0 / 0.1)` in dark mode.
- **Why:** A hairline outline keeps images from bleeding into the page and gives them a deliberate edge in both themes.

### Principle 16 — Hit areas

**11. Undersized touch targets** — `MEDIUM` — Footer `.footer-policy a` (~17px), `.testimonial-video` (24px), phone link (20px); `.mobile-quick-actions`, lightbox controls (OK, 44px)

- **Before:** Footer policy links ≈17px tall, testimonial video control 24px, phone link 20px — all below the 40px (desktop) / 44px (touch) minimums. Quick actions and lightbox controls already pass at 44px.
- **After:** Pad/enlarge the three failing targets to ≥40px desktop, ≥44px touch.
- **Why:** Sub-40px targets cause mis-taps and fail basic ergonomics. **Live-unverified** for the three offenders (`/reviews`, footer sit on pages not snapshotted); the passing quick-action/lightbox elements are **Live-unverified** too — pass noted from source only.

### Principle 17 — Icon weight

**12. Icon stroke mismatched to text** — `LOW` — external-link icon (`strokeWidth={2}`) beside 16px/weight-400 text; hamburger and `▾` caret glyphs

- **Before:** External icon drawn at `strokeWidth={2}` next to 16px regular-400 text; hamburger and dropdown caret are text glyphs (`▾`) rather than SVG.
- **After:** Set the external icon to `strokeWidth={1.5}`; use SVG icons consistently instead of glyph characters.
- **Why:** A 2px stroke reads heavier than adjacent 400-weight text; glyphs render inconsistently across platforms versus SVG.

### Principle 9 — Tabular numerals

**13. Tabular-nums incomplete** — `LOW` — `.price`, `.price-sub` (present); `.rating-num`, `.lightbox-count`, `.rating-big` (missing)

- **Before:** `font-variant-numeric: tabular-nums` applied to `.price` and `.price-sub` but not to `.rating-num`, `.lightbox-count`, or `.rating-big`.
- **After:** Add `tabular-nums` to the three missing selectors.
- **Why:** Numbers that change or align (ratings, gallery counters) jitter with proportional figures. **Live-unverified** for `.rating-num`/`.rating-big` (`/reviews`) and `.lightbox-count` (`/gallery`).

### Principle 19 — Motion restraint

**14. Hover zoom heavier than needed** — `LOW` — `.cat-card:hover img` (`scale(1.04)`, `0.5s`)

- **Before:** Menu card images zoom to `scale(1.04)` over `0.5s` on hover — heavy for an effect fired repeatedly while scanning a menu grid. Reduced-motion handling is OK.
- **After:** Lighten the effect (smaller scale and/or shorter duration) for repeated-hover contexts.
- **Why:** Restrained motion avoids fatigue when the same animation fires dozens of times in one scan. **Live-unverified** (menu-family pages not snapshotted beyond `/menu` source).

### Content correctness

**15. Literal escape visible in menu data** — `MEDIUM` — `lib/menus.ts:9-10` (rendered on `/menu`)

- **Before:** Literal `10\"` (backslash-quote) in the GF Cheese entry is visible in the rendered menu.
- **After:** Fix the string in `lib/menus.ts` so the quote renders as `10"`.
- **Why:** A visible backslash is a plain content bug in the primary menu page. **Verified** on the `/menu` snapshot.

## Considered but Rejected

1. **Convert styles to Tailwind** — Tailwind is installed but unused; the audit scope is plain-CSS fixes in `globals.css`. Migrating the 1887-line stylesheet is a separate refactor with no feel-per-payoff ratio here.
2. **Global `*` rule for press scale / transitions** — A universal `:active { transform: scale(0.96) }` would hit non-interactive containers and layout elements. Per-selector application is more code but safer.
3. **Replace all borders with shadows, including dividers** — `.review-card`'s `border-bottom` is a genuine divider, not depth. Blanket replacement would flatten legitimate separation.
4. **Move all reduced-motion handling into CSS only** — Removing the JS `.no-motion` class entirely risks breaking any state that depends on it; consolidation was noted in finding 7 but a full removal was not scoped.

## Verification

- Source review complete for all 14 pages and `app/globals.css`.
- Live snapshots taken for **2/14 pages**: `/` and `/menu`.
- **Not verified against live pages (12):** `/broadster-chicken`, `/apppetizers` (404; real route `/appetizers`), `/sandwiches`, `/dinners`, `/desserts`, `/family-or-party-trays`, `/lunch-specials`, `/gallery`, `/employment`, `/reviews`, `/about`, `/contact`.
- Findings resting on those pages are marked **Live-unverified** inline. Finding 15 (visible `10\"` on `/menu`) and the systemic findings (1, 2) are confirmed on snapshots or by direct source.
- No code changes made in this audit.

## Verdict: Needs changes

15 findings — 5 MEDIUM (font smoothing, text-wrap, image outlines, hit areas, menu content bug) and 10 LOW. The content bug in `lib/menus.ts` and the sub-40px hit areas are the highest-value fixes; the rest are feel polish. 12 of 14 pages remain live-unverified — re-check after fixes on at least `/gallery`, `/employment`, `/reviews`, and `/contact`, which carry the majority of the findings.
