# Better Interface Audit — `clever-design`

## Scope and Coverage

| Field | Value |
| --- | --- |
| Mode | full |
| Domains | 6: accessibility, layout, writing, typography, colors, ui |
| Stack | Next.js 16 App Router + Tailwind 4; hand-authored `app/globals.css` (1887 lines); 14 routes |
| Convention docs | `AGENTS.md` (Next.js harness only), `HANDOFF.md`, `PROGRESS.md`, README boilerplate; no CONTRIBUTING / design-system doc |
| Prior audit-fix commit | `37f7d8a` |

**Domain coverage**

| Domain | Coverage |
| --- | --- |
| accessibility | Structural pass on all 14 routes (jsdom); form-name and heading-order checks |
| layout | Partial — structural landmarks only; 320px clipping Not verified |
| writing | Title/heading pattern review across routes |
| typography | Heading hierarchy + document titles reviewed; measurements Not verified |
| colors | Not verified — no contrast measurement taken |
| ui | Not verified — focus/hover/active/empty states not exercised |

**URL note:** the task's URL list referenced `/apppetizers`. Live check: `/apppetizers` returns **404** (title `Pietro's Pizzeria`, `h1` `404`). The real route is `/appetizers`. Findings below use the real route.

## Findings

### #1 — HIGH · escalation trigger · accessibility · task URL list + live heading (route `/apppetizers`)

- **Location:** task URL list; live heading of the 404 response for `/apppetizers`
- **Before:** `/apppetizers` returns 404 — title `Pietro's Pizzeria`, `h1` `404`
- **After:** all task/audit URL references corrected to `/appetizers`; no route should point at the misspelled path
- **Why:** any check, crawler, or reviewer walking the task URL list hits a hard 404 and sees a live 404 `h1`, invalidating the page-level results for that entry. Escalation trigger: dead route in the audit's own source of truth.

### #2 — HIGH · escalation trigger · accessibility · `/employment` form

- **Location:** `/employment` — controls `#j-name`, `#j-email`, `#j-phone`, `#j-message`, `#j-resume`
- **Before:** 5 form controls with no accessible name (no `<label for>`, no `aria-label`)
- **After:** each control associated with a visible `<label>` (or `aria-label` where a visible label is genuinely impossible, e.g. icon-only)
- **Why:** WCAG 4.1.2 (Name, Role, Value) failure on every control in the form; screen-reader users hear only "edit text, blank" per field, and the resume input has no announced purpose. Escalation trigger: primary conversion form is unusable non-visually.

### #3 — MEDIUM · accessibility / typography · heading jump h2→h4 on 7 pages

- **Location:** `/menu`, `/broadster-chicken`, `/sandwiches`, `/dinners`, `/desserts`, `/family-or-party-trays`, `/lunch-specials`
- **Before:** heading order jumps from `h2` to `h4`, skipping `h3`
- **After:** restructure the outline so levels descend one step at a time (either promote the `h4`s to `h3`, or introduce the missing `h3` parent)
- **Why:** WCAG 1.3.1 / 2.4.6 — assistive technology heading navigation implies level structure; a skipped level misrepresents page hierarchy on 7 of 14 routes (half the site).

### #4 — LOW · writing / typography · document title patterns

- **Location:** home page and 404 page `<title>`; `/reviews` title ordering
- **Before:** home + 404 use bare `Pietro's Pizzeria`, while the other 12 pages follow one shared title pattern; `/reviews` title order differs from that pattern
- **After:** align home, 404, and `/reviews` with the pattern used by the other 12 pages
- **Why:** inconsistent titles weaken the browser tab/SERP scan pattern users rely on to tell pages apart; LOW because it is cosmetic and the current titles are still non-empty and unique.

### #5 — PASSING · accessibility · all pages (structural)

- **Location:** all 14 routes
- **Result:** `lang="en"` on every page; exactly one `h1` per page; no zoom-blocking viewport meta; all images have `alt`; single `<main>` landmark; no other nameless controls beyond finding #2; no `target="_blank"` without `rel`
- **Why it stays listed:** these were checked, not assumed — recorded so a future pass does not re-litigate them.

## Considered but Rejected

1. **Using `placeholder` attributes to fix #2 quickly.** Rejected: placeholder is not an accessible name substitute for these controls and disappears on input; the durable fix is real `<label for>` elements.
2. **Retitling all 14 pages to one pattern in this pass.** Rejected: #4 is LOW and `/reviews`' target pattern needs an owner decision first; renaming 12 working pages to chase a 2-page inconsistency risks churn without evidence anyone is affected.
3. **Restyling hover/active/empty states across `globals.css` now.** Rejected: those states are Not verified (no snapshots, no interaction pass). Fixing what was never observed is guesswork on an 1887-line hand-authored stylesheet.

## Verification

**Done**

- jsdom structural pass across all 14 routes — the checks behind finding #5, plus heading-level extraction that surfaced finding #3 and title collection for finding #4.
- Live route check confirming finding #1 (`/apppetizers` → 404 with `h1` `404`; `/appetizers` is real).

**Not verified** (no evidence taken; do not treat as passing or failing)

- Source file:line citations — `globals.css` focus/outline rules, `prefers-reduced-motion`, 320px media queries; `Header` / `Footer` / `MobileQuickActions` / `Banner` / contact / employment components.
- 320px viewport clipping.
- 200% zoom behavior.
- Contrast measurement (colors domain).
- Focus visibility.
- Hover / active / empty states.
- Visual snapshots of the remaining 13 pages.

## Verdict: **Block**

2 HIGH escalation triggers must be fixed before this passes:

1. #1 — `/apppetizers` 404 in the audit's own URL list (misdirected route, live 404 `h1`).
2. #2 — `/employment` form: 5 controls with no accessible name.

#3 (7-page heading jump) and #4 (title patterns) follow; #5 items are checked and passing. Items in *Not verified* remain open scope, not clean bills.
