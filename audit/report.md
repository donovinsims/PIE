# Consolidated Audit Report — Pietro's Pizzeria

**Site:** https://pietros-pizzeria.vercel.app
**Date:** September 2, 2026
**Pages audited:** 15
**Domains:** Accessibility, Layout, Writing, Typography, Colors, UI Polish

## Overall Score

| Domain | Verdict | HIGH | MEDIUM | LOW |
|--------|---------|------|--------|-----|
| Accessibility | ⚠️ Needs changes | 2 | 4 | 1 |
| Layout | ⚠️ Needs changes | 0 | 2 | 4 |
| Writing | ⚠️ Needs changes | 0 | 3 | 4 |
| Typography | ⚠️ Needs changes | 0 | 1 | 6 |
| Colors | ⚠️ Needs changes | 0 | 3 | 2 |
| UI Polish | ⚠️ Needs changes | 1 | 4 | 3 |
| **Total** | **Needs changes** | **3** | **17** | **20** |

## Priority 1 — HIGH (Fix immediately)

| # | Finding | Domain | Pages affected |
|---|---------|--------|----------------|
| 1 | **Gallery images have empty `alt=""`** — all 17 images are informative (food, restaurant) but invisible to screen readers | Accessibility | `/gallery` |
| 2 | **Broken background image on Employment CTA** — URL missing leading `/` (`url(le-cdn...` instead of `url(/assets/le-cdn...`) | Accessibility, UI | `/employment` |
| 3 | **Gallery has no lightbox/click-to-expand** — users expect to click gallery images to view full-size | UI | `/gallery` |

## Priority 2 — MEDIUM (Fix soon)

| # | Finding | Domain | Pages affected |
|---|---------|--------|----------------|
| 4 | **Heading hierarchy skips h2** — h1 → h3 on every page | Typography, Accessibility | All 15 pages |
| 5 | **Repeated banner pattern on all subpages** — identical H1 + subtitle + CTAs pushes content below fold | Layout | All subpages |
| 6 | **Star rating visual shows 5 stars for 4.3 rating** — misleading for sighted users | Colors, Accessibility | All pages (header) |
| 7 | **Inconsistent button labels** — "Reach Out To Us" (contact) vs "Contact Us" (employment) | Writing | `/contact`, `/employment` |
| 8 | **Employment form button says "Contact Us"** — should say "Submit Application" | Writing | `/employment` |
| 9 | **Identical meta descriptions on all 15 pages** — hurts SEO | Writing | All pages |
| 10 | **Contact form has no validation/error handling** — `action="#"` with no feedback | Accessibility | `/contact` |
| 11 | **Employment form has no validation** — same issue as contact form | Accessibility | `/employment` |
| 12 | **reCAPTCHA text contrast too low** — `#888` on `#fff` ≈ 3.5:1 (needs 4.5:1) | Colors | `/contact` |
| 13 | **Footer policy links may have low contrast** — gray on dark background | Colors | All pages (footer) |
| 14 | **Red text on white needs contrast verification** — `#C10000` on `#fff` | Colors | All pages (headings) |
| 15 | **No hover/focus states on buttons** — `.pill-btn` lacks visual state changes | UI | All pages |
| 16 | **Inline styles on employment form** — bypasses CSS system | UI | `/employment` |
| 17 | **Hero structure disconnects visual from content** — background and text in separate DOM elements | Layout | `/` |
| 18 | **No external link indicator on "Order Now"** — navigates away from site without warning | UI | All pages |

## Priority 3 — LOW (Backlog)

| # | Finding | Domain |
|---|---------|--------|
| 19 | Homepage hero section has no accessible name | Accessibility |
| 20 | Form inputs missing `autocomplete` attributes | Accessibility |
| 21 | Footer repeats header info (address, hours, phone) | Layout |
| 22 | No visual separation between menu sections | Layout |
| 23 | Contact page map section is just a link, not an embed | Layout |
| 24 | Mobile quick actions bar may overlap notched iPhones | Layout |
| 25 | Inconsistent capitalization (ALL CAPS in footer, hero) | Typography, Writing |
| 26 | Price typography — no tabular-nums for alignment | Typography |
| 27 | Banner subtitle font size hierarchy | Typography |
| 28 | Vague tagline "Carry Out-Delivery & Dining Area Available!" | Writing |
| 29 | "You won't be disappointed" filler copy | Writing |
| 30 | "Mozarella" misspelled on sandwiches page | Writing |
| 31 | No dark mode support | Colors |
| 32 | Inline color value bypasses CSS token system | Colors |
| 33 | No custom focus ring styles | UI |
| 34 | No loading states for external links | UI |

## What's Working Well

The site has solid fundamentals:

- **Skip-to-content link** on every page
- **Proper ARIA attributes** on mobile menu, submenu toggles, navigation
- **`aria-current="page"`** for active navigation state
- **Proper `<label for>` associations** on all form inputs
- **Consistent visual identity** — red brand color, Quicksand font, pill buttons
- **Responsive gallery** with `srcset` and `sizes`
- **Mobile quick actions bar** with Order/Call/Directions
- **Warm, family-friendly voice** appropriate for a local pizzeria
- **Direct address** ("you") in instructional copy
- **Verb-first CTAs** ("Order Now", "Get Directions")

## Recommended Fix Order

1. **Gallery alt text** — Quick win, high impact (17 images)
2. **Employment CTA background URL** — One-character fix, production bug
3. **Heading hierarchy** — h3 → h2 across all pages
4. **reCAPTCHA contrast** — Change `#888` to `#595959`
5. **Button labels** — Standardize to verb-first pattern
6. **Meta descriptions** — Write unique descriptions for each page
7. **Form validation** — Add client-side validation to contact and employment forms
8. **Button hover/focus states** — Add CSS state changes
9. **Gallery lightbox** — Add click-to-expand interaction
10. **Menu section dividers** — Add spacing between categories

## Pages Audited

| Page | URL | Screenshot |
|------|-----|------------|
| Home | `/` | `home.png` |
| Menu (Pizza) | `/menu` | `menu.png` |
| Appetizers | `/appetizers` | `appetizers.png` |
| Sandwiches | `/sandwiches` | `sandwiches.png` |
| Dinners | `/dinners` | `dinners.png` |
| Desserts | `/desserts` | `desserts.png` |
| Kids Menu | `/kids-menu` | `kids-menu.png` |
| Catering | `/catering` | `catering.png` |
| About | `/about` | `about.png` |
| Gallery | `/gallery` | `gallery.png` |
| Reviews | `/reviews` | `reviews.png` |
| Contact | `/contact` | `contact.png` |
| Employment | `/employment` | `employment.png` |
| Online Order | `/online-order` | `online-order.png` |
| Gift Cards | `/gift-cards` | `gift-cards.png` |

---

*Generated by better-interface audit — September 2, 2026*
