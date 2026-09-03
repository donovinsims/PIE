# Accessibility Audit — Pietro's Pizzeria

**Domain:** Accessibility (`better-accessibility`)
**Scope:** Full site — 15 pages
**Mode:** Full

## What's Working Well

- Skip-to-content link present on every page (`<a class="skip-link" href="#main-content">`)
- `lang="en"` set on `<html>` element
- `<main>` landmark present with `id="main-content"`
- Navigation labeled with `aria-label="Main navigation"`
- Logo link has `aria-label="Pietro's Pizzeria home"`
- Rating stars have `aria-label="4.3 out of 5 stars"`
- Mobile menu toggle has proper `aria-label`, `aria-controls`, `aria-expanded`
- Submenu toggle has proper `aria-label`, `aria-controls`, `aria-expanded`
- Active page marked with `aria-current="page"`
- Contact form uses proper `<label for>` associations
- Form inputs use `required` attribute
- Footer Facebook link has `aria-label="Facebook"` and icon SVG is `aria-hidden="true"`
- Mobile quick actions bar labeled with `aria-label="Quick actions"`

## Findings

### Missing Alt Text on Gallery Images

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| HIGH | `/gallery` — all 17 `<img>` elements | `alt=""` (empty) | Descriptive alt text (e.g., `alt="Pietro's pizza with sausage and pepperoni toppings"`) | Gallery images are informative (food, dining area, restaurant interior) — they communicate the restaurant's quality and atmosphere. Empty `alt` makes them invisible to screen readers. Principle 12: Alt text by purpose. |

**Affected locations:** All `<img>` tags in `.gallery-grid` section on `/gallery`

### Heading Hierarchy Skips Levels

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| MEDIUM | All pages: hero/banner section | `<h1>` followed by `<h3>` (skips `<h2>`) | Use `<h2>` for the subtitle "Homemade Food \| Fresh Ingredients \| Delivery and Carry Out" | Heading levels must descend logically. Screen readers and assistive tech rely on heading hierarchy for navigation. Skipping from h1 to h3 breaks the document outline. Principle 13: Structure is navigation. |

**Affected locations:** Every page's banner section. The `<h3>` directly under `<h1>` should be `<h2>`.

### Misleading Star Rating Visual

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| MEDIUM | `site-header` — `.rating-pill` | 5 filled Unicode stars (★★★★★) displayed for a 4.3 rating | Show 4 filled + 1 partially filled/empty star, or use a visual that represents 4.3/5 | While the `aria-label` correctly says "4.3 out of 5 stars", sighted users see 5 full stars, which is misleading. This creates a discrepancy between what screen readers announce and what sighted users perceive. |

### Contact Form Has No Validation or Error Handling

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| MEDIUM | `/contact` — `.widget-form` | `action="#"` with no JS validation, no `aria-invalid`, no error messages | Add client-side validation with `aria-invalid="true"`, `aria-describedby` pointing to inline error text, focus management on first error | Principle 7: Errors that announce. Users get no feedback if they submit incomplete or malformed data. The form appears to be non-functional (action="#"). |

### Employment Form Button Label Mismatch

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| MEDIUM | `/employment` — form submit button | `<button type="submit">Contact Us</button>` | `<button type="submit">Submit Application</button>` | The button text should describe its action. "Contact Us" is ambiguous on a job application form. Principle 5 (better-writing): Verb-first buttons that name the specific action. |

### Employment Form Has No Validation

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| MEDIUM | `/employment` — `.widget-form` | `action="#"`, no validation feedback, no `aria-invalid` | Add validation with inline error messages, `aria-describedby`, and `aria-invalid` | Same as contact form — users get no feedback on submission errors. |

### Broken Background Image on Employment CTA

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| HIGH | `/employment` — `.cta-band` section | `style="background-image:url(le-cdn.hibuwebsites.com/...)"` (missing leading `/`) | `style="background-image:url(/assets/le-cdn.hibuwebsites.com/...)"` | The broken URL means the CTA background won't load. This is a broken visual that also affects any alt-text fallback. |

### Home Page Hero Section Has No Accessible Name

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| LOW | `/` — `.hero` section | `<section class="hero">` with no heading inside it | Add `aria-label="Hero banner"` or wrap the hero content in the section | The hero section is a decorative background-only section, but the content after it (h1, actions) is outside the section element. This is minor since the content is accessible. |

### Form Inputs Missing Autocomplete Attributes

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| LOW | `/contact` and `/employment` — all text/email/tel inputs | No `autocomplete` attribute | Add `autocomplete="name"`, `autocomplete="email"`, `autocomplete="tel"` as appropriate | Principle 6: Label and type every control. Autocomplete helps users fill forms faster and assists password managers. |

## Considered but Rejected

| Location | Candidate | Rejected because |
|----------|-----------|-----------------|
| `/reviews` — review cards | Add `role="article"` to review cards | The cards already use `<article>` elements, which have implicit article role. Adding `role="article"` would be redundant. |
| `/menu` — price items | Add `role="list"` to menu sections | Menu items are not interactive lists — they're static content sections. Adding list semantics would be misleading. |
| Footer nav | Add `role="contentinfo"` to footer | The `<footer>` element already has implicit `contentinfo` role. |
| Mobile quick actions | Convert to `<ul>` list | The 3-link bar is simple enough that list semantics add no navigational value for screen readers. |

## Verification

| Check | Result |
|-------|--------|
| Skip-to-content link | ✅ Present and functional on all pages |
| Heading hierarchy | ❌ h1→h3 skip on all pages |
| Form label associations | ✅ All inputs have `<label for>` |
| Gallery image alt text | ❌ All 17 images have empty `alt=""` |
| Star rating accuracy | ⚠️ aria-label correct, visual misleading |
| Mobile menu ARIA | ✅ Proper aria-label, controls, expanded states |
| Keyboard navigation | ✅ All interactive elements are focusable links/buttons |
| Focus indicators | ⚠️ Not verified visually (needs browser testing) |

## Verdict

**Needs changes** — 2 HIGH findings (gallery alt text, broken employment CTA image), 4 MEDIUM findings. No BLOCK-level issues that prevent task completion, but the gallery alt text gap is a systemic accessibility failure affecting 17 images across the site's most visual page.
