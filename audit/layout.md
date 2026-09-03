# Layout Audit — Pietro's Pizzeria

**Domain:** Layout (`better-layout`)
**Scope:** Full site — 15 pages
**Mode:** Full

## What's Working Well

- Consistent header/nav/footer across all pages
- Mobile quick actions bar provides persistent access to Order/Call/Directions
- Gallery uses responsive grid with `srcset` and `sizes` for different viewports
- Banner sections use background images with mobile-specific variants via `--mobile-background-image` custom property
- Footer columns group related information (Visit, Hours, Contact)

## Findings

### Identical Banner Pattern on Every Subpage

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| MEDIUM | All subpages (Menu, Gallery, Reviews, About, Contact, Employment, etc.) | Every page repeats: H1 + H3 subtitle + "Order Now" button + "Visit Us" button + Hours text | Remove the duplicate banner from content pages; keep a simplified page heading with one primary CTA. The hero banner pattern belongs on the homepage. | The repeated banner pushes the actual page content below the fold on every page. Users must scroll past identical boilerplate to reach page-specific content. This is wasted vertical space that harms efficiency. |

### Hero Section Structure on Homepage

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| MEDIUM | `/` — `.hero` + `.hero-content` | Hero background is a separate `<section>`, then `.hero-content` is a sibling `<div>` outside any section | Wrap both the hero background and content in a single `<section>` or `<div>` with proper grouping | The hero visual and its content are semantically disconnected. This makes the reading order confusing for assistive tech and breaks the visual-content relationship. |

### Footer Repeats Header Information

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| LOW | Site footer (all pages) | Footer repeats address, hours, phone — all of which appear in the header/banner | Keep footer minimal: just the essential legal links and a condensed contact block | Repetition isn't harmful but adds scroll distance. For a restaurant site, a sticky header with the phone number and Order CTA might be more useful than repeating the full info block. |

### No Visual Separation Between Menu Sections

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| LOW | `/menu`, `/appetizers`, `/sandwiches`, `/dinners`, `/desserts` | Menu sections (e.g., "Pietros Pizzeria", "Pietro's Deluxe", "Pietro's Thick Pizza") flow without visual separation | Add spacing or subtle dividers between menu categories | Principle 1: Group with space, not lines. The different pizza types and their pricing blocks run together, making it hard to scan. |

### Contact Page Map Section

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| LOW | `/contact` — `.contact-map-section` | Map section appears between the hero and the form, showing a link to Google Maps | This is a reasonable placeholder, but consider embedding an actual map for better UX | The map link is functional but requires a click-through. An embedded Google Map would provide spatial context immediately. |

### Mobile Quick Actions Bar Positioning

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| LOW | `.mobile-quick-actions` (all pages) | Fixed bottom bar with Order/Call/Directions | Ensure safe-area-inset padding for notched iPhones | The bar may overlap with page content on notched devices without proper safe-area handling. |

## Considered but Rejected

| Location | Candidate | Rejected because |
|----------|-----------|-----------------|
| `/menu` — price layout | Convert to a two-column table layout | The current single-column list with inline prices is readable and mobile-friendly. A table could improve scanning on desktop but would complicate the responsive layout. |
| `/gallery` — add lightbox | Add a click-to-expand lightbox on gallery images | This would be a UX improvement but is outside the layout domain — it's a UI interaction pattern. The current grid layout is functional. |
| Homepage testimonials | Stack testimonials vertically instead of side-by-side | Two testimonials side-by-side works at desktop width. On mobile they likely stack. The current layout is appropriate. |

## Verification

| Check | Result |
|-------|--------|
| Consistent header/footer | ✅ Identical across all 15 pages |
| Banner pattern | ⚠️ Identical on all subpages — may cause fatigue |
| Hero structure | ⚠️ Hero visual and content are separate DOM elements |
| Menu section grouping | ⚠️ No visual separation between categories |
| Mobile quick actions | ✅ Present on all pages |
| Gallery responsive | ✅ Uses srcset with 640w/1920w variants |
| Footer grouping | ✅ Three-column layout groups related info |

## Verdict

**Needs changes** — 2 MEDIUM findings (repeated banners, hero structure), 4 LOW findings. The layout is functional but the repeated banner pattern across all subpages is the most impactful issue — it wastes vertical space and reduces the prominence of page-specific content.
