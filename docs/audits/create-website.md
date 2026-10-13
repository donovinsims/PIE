# create-website Audit

**Date:** 2026-10-07
**Status:** Transcribed from completed audit. No re-audit performed.

## Scope

All 14 in-scope URLs fetched (HTTP status recorded per section):

1. `/`
2. `/menu`
3. `/appetizers`
4. `/broadster-chicken`
5. `/sandwiches`
6. `/dinners`
7. `/desserts`
8. `/family-or-party-trays`
9. `/lunch-specials`
10. `/gallery`
11. `/employment`
12. `/reviews`
13. `/about`
14. `/contact`

Scope note: the brief's `/apppetizers` (triple-p) returned **404**; the real
`/appetizers` returns **200** with 19 items + prices. The 404 is a typo in the
brief's URL, not a site defect; the live page is audited below.

Site chrome (header, footer, 404 route, `lib/site.ts`) was inspected alongside
the pages and is folded into the CTA, proof, cut-list and verdict sections.

---

## `/` (Home) — 200

**Issue:** H1 reads "Roscoe's Favorite Pizzeria" — a claim about the business,
not an outcome for the visitor. Home CTAs are "Order Now" (opens Toast in a new
tab) and "Visit Us at 5724 Elevator RD"; the secondary band is transitional
copy ("View pizza menu", "Full Gallery", "Read all reviews").

**Issue:** 2 testimonials (Cristy L, Chad P) carry no dates and no source.

**Issue:** Hours are present as a line of text.

**Severity:** High (H1 claim-not-outcome); Medium (undated/unsourced
testimonials); Info (hours line present — satisfies Timing partially, see Big-5).

**Fix:** Rewrite the H1 around the visitor's outcome (what they get, for whom),
keep the brand name as support. Attach a date and a source (Google/Toast/
platform) to each testimonial, or drop them. Promote hours into the Timing
pattern used on `/about`.

**Status:** Open.

---

## `/menu` — 200

**Issue:** 5 anchor tabs, prices present, GF/cauliflower callout present,
"grate-own-cheese" callout present. No conversion CTA at the point where a
visitor has decided (see CTA audit).

**Severity:** Low (content complete); Medium for the missing CTA (see CTA
audit).

**Fix:** Add an Order CTA at the end of the price list and per category anchor.

**Status:** Open.

---

## `/appetizers` — 200

**Issue:** 19 items with prices — content complete. No CTA at the friction
point.

**Severity:** Medium (CTA absence only).

**Fix:** Add an Order CTA after the last item.

**Status:** Open.

---

## `/broadster-chicken` — 200

**Issue:** Slug is misspelled relative to the nav label "Broaster Chicken"
(`broadster` vs `Broaster`). 48/96-piece orders require 24h advance notice.

**Severity:** High (slug/nav mismatch — permanent URL, affects links, SEO and
user trust in navigation).

**Fix:** Keep the old URL as a redirect, publish `/broaster-chicken`, and align
the nav label. Surface the 24h advance requirement near the order action, not
only in copy.

**Status:** Open.

---

## `/sandwiches` — 200

**Issue:** Full price list present. No in-copy Order CTA (only
`/family-or-party-trays` has one).

**Severity:** Medium.

**Fix:** Add an Order CTA after the price list.

**Status:** Open.

---

## `/dinners` — 200

**Issue:** Full price list present. No in-copy Order CTA.

**Severity:** Medium.

**Fix:** Add an Order CTA after the price list.

**Status:** Open.

---

## `/desserts` — 200

**Issue:** Full price list present. No in-copy Order CTA.

**Severity:** Medium.

**Fix:** Add an Order CTA after the price list.

**Status:** Open.

---

## `/family-or-party-trays` — 200

**Issue:** Full price list present. This is the **only** menu page with an
in-copy "Order now" — and it points to `/contact`, not to the Toast order flow
used by the home "Order Now" button. Two different Order destinations on one
site.

**Severity:** High (inconsistent conversion path).

**Fix:** Decide one order destination (Toast, or contact for trays because they
need confirmation) and label each CTA with what it does: "Order on Toast" vs
"Request a tray quote".

**Status:** Open.

---

## `/lunch-specials` — 200

**Issue:** Full price list present. No in-copy Order CTA.

**Severity:** Medium.

**Fix:** Add an Order CTA after the price list, with the lunch serving window
next to it.

**Status:** Open.

---

## `/gallery` — 200

**Issue:** Copy is 65 words; the image grid is client-rendered, so the page has
almost no server-rendered content for visitors or crawlers.

**Severity:** Medium (thin content + no alt/context text evidenced from copy
alone).

**Fix:** Add captions or a short descriptive paragraph per section and render
the grid server-side or provide static fallback markup.

**Status:** Open.

---

## `/employment` — 200

**Issue:** Form `action="#"` with **no submit handler** — no `onSubmit`, no
`fetch`, no API route. The form cannot submit: a dead-end job application.

**Severity:** Critical (blocking).

**Fix:** Wire the form to a real endpoint (API route or form provider), add
validation and a success/error state, and test a real submission end to end.

**Status:** Open — blocking for verdict.

---

## `/reviews` — 200

**Issue:** Shows 4.3 / 783 ratings with 4 dated sample reviews (good proof
pattern), but links out to an external `pietrospizzeria.net` — a third-party
domain in the review path.

**Severity:** Medium (off-domain link in the trust flow; verify it is
intentional and same-owner).

**Fix:** Confirm ownership of the external domain and label the link as the
source, or host the reviews source on the site's own domain.

**Status:** Open.

---

## `/about` — 200

**Issue:** Good facts present (Est. 1991, hours, payments). Three fields render
empty with em-dashes: "Products —", "Associations —", "Business Attributes —".

**Severity:** Medium (visible empty scaffolding reads as unfinished).

**Fix:** Fill the three fields or remove the section entirely (see cut list).

**Status:** Open.

---

## `/contact` — 200

**Issue:** Contact form is a Tally.so iframe (`data-tally-src`, `embed.js` via
`lazyOnload`) — JavaScript-dependent with **no static fallback** (no visible
phone/email alternative rendered as fallback content in the evidence). The
contact test asserts only the embed URL, so it passes even if the form never
renders for a visitor.

**Severity:** Critical (blocking — JS-only contact channel; test verifies the
wrong thing).

**Fix:** Render a static fallback (phone, email, address) that exists without
JS, load the embed eagerly or on interaction, and change the test to assert a
usable contact path, not the embed URL string.

**Status:** Open — blocking for verdict.

---

## Site chrome (header, footer, 404, `lib/site.ts`)

**Issue:** Desktop header has **no Order Now** — the CTA exists only when
`mobileMenuOpen` (`Header.tsx:87-99`). Rating pill, phone and tagline are
present.

**Issue:** Footer carries address/hours/phone/directions, Facebook, **5 hibu
`budurl.com` policy links**, ©2026.

**Issue:** The 404 route is the default Next.js page: no nav, no search, no
menu link, no phone — zero recovery paths.

**Issue:** Mobile has a quick-actions bar (Order / Call / Directions) — desktop
does not get the equivalent persistent bar.

**Severity:** Critical (404 zero-recovery); High (desktop header lacks Order
Now).

**Fix:** Add a persistent desktop Order Now in the header; add nav + phone +
menu links + search to the 404 page; replace the 5 hibu `budurl.com` links
with first-party policy pages.

**Status:** Open — blocking for verdict (404, desktop header).

---

## Big-5 Objection / Counter Summary

| # | Objection | State | Evidence |
|---|-----------|-------|----------|
| 1 | Trust | **Partial** | Rating pill 4.3/783 and 4 dated reviews help; 2 home testimonials lack dates/source; since-1991 lives only on `/about`; footer links are lowest-tier proof. |
| 2 | Price | **Served** | Prices present on menu, appetizers, sandwiches, dinners, desserts, party trays, lunch specials. |
| 3 | Fit | **Weak** | No "what to order first" guidance anywhere in the fetched copy — a first-time visitor cannot choose. |
| 4 | Timing | **Served** | Hours present (home line, `/about`, footer); 24h advance note on large chicken orders. |
| 5 | Effort | **Weak** | No delivery zone, no delivery fee, no order minimum evidenced — the cost of ordering is unknown. |

**Counter summary:** Price and Timing are answered. Trust is partial and
inconsistent across pages. Fit and Effort — the two objections a first-time
visitor raises before paying — are unanswered, and they sit directly on the
path of the Order CTA.

---

## Proof Hierarchy Note

- **Strong:** named + dated proof (4 dated reviews on `/reviews`) — the best
  pattern on the site; extend it.
- **Weak:** the rating pill hardcodes `--pct: 30%` — the displayed share is a
  CSS constant, not derived from the 4.3/783 data. If ratings change, the pill
  does not.
- **Missed:** "since 1991" (Est. 1991) appears **only on `/about`** — the
  longest-serving trust asset is hidden on the lowest-traffic page.
- **Lowest tier:** the footer's 5 hibu `budurl.com` policy links —
  third-party-domain links carrying the site's policy/trust content.

---

## CTA Audit

- **Home (`/`):** 1 direct CTA — "Order Now" (Toast, new tab) — with "Visit Us
  at 5724 Elevator RD" acting as the secondary. That is the correct 1 + 1
  shape, and it is the only page with it.
- **Menu pages (`/menu`, `/appetizers`, `/broadster-chicken`, `/sandwiches`,
  `/dinners`, `/desserts`, `/lunch-specials`):** **zero CTAs at the friction
  point** — the moment the visitor has read prices and decided. Only
  `/family-or-party-trays` has any in-copy CTA, and it points to `/contact`
  rather than the Toast flow.
- **Header:** desktop nav has **no Order Now**; the CTA appears only inside the
  open mobile menu (`Header.tsx:87-99`). Mobile compensates with a
  quick-actions bar (Order / Call / Directions); desktop has no equivalent.
- **Net:** the site's single strongest conversion asset (the Order button) is
  present on exactly one page and hidden in the desktop header.

---

## Cut List

1. **Empty About dashes** — "Products —", "Associations —",
   "Business Attributes —": fill or delete the whole block.
2. **"STOP AND SMELL THE ROSES"** — off-message for a pizzeria order path;
   remove.
3. **5 hibu `budurl.com` links** in the footer — third-party policy links;
   replace with first-party pages.
4. **Duplicated phone band on `/employment`** — phone presented twice on one
   page; keep one.
5. **Typo exposure** — `/broadster-chicken` slug vs nav "Broaster Chicken",
   and the brief's `/apppetizers` misspelling revealed how easily the path
   breaks; fix the slug and redirect.
6. **`rwg_token` baked into `lib/site.ts` `orderUrl`** — a token in client
   source; move it server-side or remove it.

---

## Verdict

# NOT DONE

**Blocking:**

1. **Dead employment form** — `action="#"`, no submit handler; applications
   cannot be sent (`/employment`).
2. **JS-only contact** — Tally.so iframe with no static fallback, and a test
   that only asserts the embed URL (`/contact`).
3. **Zero-recovery 404** — default Next.js page: no nav, no menu, no phone, no
   search.
4. **Claim-not-outcome H1** — "Roscoe's Favorite Pizzeria" states a claim
   instead of the visitor's outcome (`/`).
5. **Desktop header lacks Order Now** — the CTA exists only when
   `mobileMenuOpen` (`Header.tsx:87-99`).

Non-blocking but required for the Big-5 gaps: Fit (no what-to-order-first) and
Effort (no delivery zone/fee/minimum) remain unanswered.

---
*Transcribed 2026-10-07 from the completed create-website audit. No evidence
beyond the audit record is asserted (Rule 8).*
