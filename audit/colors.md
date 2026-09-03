# Colors Audit — Pietro's Pizzeria

**Domain:** Colors (`better-colors`)
**Scope:** Full site — 15 pages
**Mode:** Full

## What's Working Well

- Primary brand color (red, `#C10000`) is used consistently for headings and CTAs
- White background provides good contrast for dark text
- Facebook brand blue (`#3b5998`) used correctly for social icon
- Star rating uses a distinct color (likely gold/yellow) to stand out

## Findings

### Star Rating Color vs. Count Mismatch

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| MEDIUM | `.rating-pill` — `.stars` | 5 filled stars in gold/yellow for a 4.3 rating | Show 4.3 stars visually (4 full + 30% partial) or use a numeric-only display | The visual shows 5 full stars in gold while the rating is 4.3. This creates a color+shape mismatch — the gold color implies "5-star" to sighted users. |

### Red Text on White Background — Verify Contrast

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| MEDIUM | Employment form heading, brand red elements | `color: #C10000` on white `#fff` background | Verify WCAG 2 AA contrast ratio (4.5:1 for normal text, 3:1 for large text) | `#C10000` is a deep red that may or may not meet the 4.5:1 threshold depending on exact rendering. Needs measurement. |

### Footer Policy Links — Low Contrast Gray

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| MEDIUM | `.footer-policy` links | Links appear in a muted/gray color on the dark footer background | Ensure at least 4.5:1 contrast ratio for link text | Footer legal links (Privacy Policy, Conditions of Use, etc.) need to be readable. Gray on dark backgrounds often fails WCAG AA. |

### reCAPTCHA Notice — Very Low Contrast

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| MEDIUM | `/contact` — reCAPTCHA text | `style="font-size:13px;color:#888"` on white background | Use `color: #595959` or darker for WCAG AA compliance | `#888` on `#fff` yields approximately 3.5:1 contrast — below the 4.5:1 AA threshold for normal text. |

### No Dark Mode / Appearance Variant

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| LOW | Site-wide | No `prefers-color-scheme` media query or dark mode toggle | Consider adding dark mode support | Not required for WCAG compliance, but increasingly expected by users. The site currently has no appearance adaptation. |

### Consistent Use of Brand Red

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| LOW | Employment form heading | `color: #C10000` applied via inline style | Move to CSS class for consistency | Inline color values bypass the project's styling system. The red should be a CSS custom property or Tailwind token. |

## Considered but Rejected

| Location | Candidate | Rejected because |
|----------|-----------|-----------------|
| Hero background image | Darken the overlay for better text contrast | The hero text appears to be positioned over a lighter area of the image. Without visual inspection, we can't confirm a contrast failure. |
| Menu prices | Use red for prices to draw attention | The current neutral color for prices is appropriate — red prices might imply "sale" or "discount". |
| Star rating | Change to a numeric display only | The star visual is a common pattern users understand. The issue is the count, not the color. |

## Verification

| Check | Result |
|-------|--------|
| Primary brand red contrast | ⚠️ Needs measurement (#C10000 on #fff) |
| Footer link contrast | ⚠️ Needs measurement (gray on dark) |
| reCAPTCHA text contrast | ❌ #888 on #fff is approximately 3.5:1 — below AA |
| Star rating color | ⚠️ Visual shows 5 stars for 4.3 rating |
| Dark mode support | ❌ None |
| Color token system | ⚠️ Some inline color values bypass CSS |

## Verdict

**Needs changes** — 3 MEDIUM findings (star color mismatch, footer contrast, reCAPTCHA contrast), 2 LOW findings. The reCAPTCHA text contrast is a confirmed WCAG AA failure. The footer links and brand red need measurement to confirm compliance.
