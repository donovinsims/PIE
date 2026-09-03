# UI Polish Audit — Pietro's Pizzeria

**Domain:** UI Polish (`better-ui`)
**Scope:** Full site — 15 pages
**Mode:** Full

## What's Working Well

- Consistent pill-shaped button style (`pill-btn`) across all pages
- Hero sections use full-bleed background images
- Gallery uses responsive grid with proper lazy loading
- Social media icon (Facebook) is an inline SVG with proper branding
- Mobile quick actions bar provides persistent access

## Findings

### Broken CTA Background Image on Employment Page

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| HIGH | `/employment` — `.cta-band` | `style="background-image:url(le-cdn.hibuwebsites.com/...)"` (missing leading `/`) | `style="background-image:url(/assets/le-cdn.hibuwebsites.com/...)"` | The URL is malformed — missing the leading `/`. The CTA section will show no background image, breaking the visual design. This is a production bug. |

### No Hover/Active States Visible on Buttons

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| MEDIUM | `.pill-btn` (all pages) | No visible hover, focus, or active state changes observed in CSS | Add hover (darker shade), focus-visible (outline), and active (scale 0.96) states | Principle 9: Scale on press gives tactile feedback. Buttons without state changes feel unresponsive. |

### Inline Styles on Employment Form

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| MEDIUM | `/employment` — `.widget-form` | `style="background:#fff;border-radius:8px;padding:28px;border:1px solid #e5e5e5"` | Move to CSS class (e.g., `.employment-form-card`) | Inline styles bypass the project's styling system, make the design harder to maintain, and prevent responsive adjustments. |

### Inline Style on reCAPTCHA Notice

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| MEDIUM | `/contact` — reCAPTCHA text | `style="font-size:13px;color:#888"` | Move to CSS class | Same issue — inline styles prevent consistent styling and maintenance. |

### No Image Lightbox on Gallery

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| MEDIUM | `/gallery` — `.gallery-grid` | Images displayed in a static grid with no click-to-expand | Add a lightbox/modal for full-size viewing | Users expect to click gallery images to see them larger. The current grid shows small thumbnails with no way to see full detail. This is a common UX pattern users look for. |

### Menu Section Dividers

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| LOW | All menu pages | Menu categories (e.g., "Pietros Pizzeria", "Pietro's Deluxe") flow without visual separation | Add subtle dividers or spacing between menu sections | Principle 1: Group with space, not lines. The different pizza types run together, making scanning difficult. |

### Missing Focus Ring Customization

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| LOW | Site-wide | No custom `:focus-visible` styles observed in CSS | Add visible focus indicators matching the brand | While browser defaults may provide some focus indication, custom focus rings ensure consistency across browsers and match the brand design. |

### No Loading States for External Links

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| LOW | "Order Now" links (all pages) | Links to external Toast ordering site have no visual indicator they open externally | Add a small external link icon or "Opens in new tab" indicator | Users may not realize the Order button navigates away from the site. An external link indicator sets proper expectations. |

## Considered but Rejected

| Location | Candidate | Rejected because |
|----------|-----------|-----------------|
| Hero section | Add parallax scrolling effect | Parallax can cause motion sickness and violates `prefers-reduced-motion`. Not appropriate for a local restaurant site. |
| Menu items | Add food photos to each item | While this would improve the menu experience, it requires photography and is a content decision, not a UI polish fix. |
| Reviews section | Add star rating icons to individual reviews | Reviews already show star ratings via the overall score. Individual review ratings are shown with Unicode stars. |
| Footer | Add a "Back to top" button | The mobile quick actions bar already provides navigation. A back-to-top button is unnecessary given the site's length. |

## Verification

| Check | Result |
|-------|--------|
| Employment CTA background | ❌ Broken URL — missing leading `/` |
| Button hover states | ⚠️ Not verified visually — needs browser testing |
| Inline styles | ❌ Found on employment form and contact reCAPTCHA |
| Gallery interaction | ❌ No lightbox or click-to-expand |
| Focus indicators | ⚠️ Not verified — needs keyboard testing |
| External link indicators | ❌ None present |

## Verdict

**Needs changes** — 1 HIGH finding (broken CTA background), 4 MEDIUM findings (button states, inline styles, gallery lightbox), 3 LOW findings. The broken background image on the employment page is a production bug that needs immediate attention.
