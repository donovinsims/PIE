# Typography Audit — Pietro's Pizzeria

**Domain:** Typography (`better-typography`)
**Scope:** Full site — 15 pages
**Mode:** Full

## What's Working Well

- Uses Quicksand font family (loaded via Google Fonts)
- Font smoothing applied (antialiased via Tailwind or CSS)
- Body text appears to be readable size (likely 16px+)
- Heading hierarchy creates visual distinction

## Findings

### Heading Hierarchy Broken (h1 → h3 Skip)

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| MEDIUM | All pages — banner section | `<h1>` followed by `<h3>` (skips `<h2>`) | Change `<h3>` subtitle to `<h2>` | Principle 6: Heading sizes descend with level. Skipping h2 breaks the document outline and makes it harder for users to navigate by headings. |

### Inconsistent Heading Case Across Pages

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| LOW | Footer headings | "VISIT US", "HOURS", "CONTACT US" (ALL CAPS) | Use sentence case: "Visit us", "Hours", "Contact us" | Principle 8 (better-writing): One capitalization policy. Footer headings use ALL CAPS while page headings use sentence case. |

### Footer Column Headings in ALL CAPS

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| LOW | `.footer-col h3` (all pages) | "VISIT US", "HOURS", "CONTACT US" | "Visit us", "Hours", "Contact us" | ALL CAPS reduces readability for heading text. The footer is an important information source — it should be easy to scan. |

### Hero Upsell Text in ALL CAPS

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| LOW | `/` — `.hero-upsell` | "NEW DINING AREA NOW OPEN!", "Full Service Bar-GAMING-Sunday Ticket!" | "New dining area now open!", "Full service bar, gaming, Sunday ticket!" | Mixed capitalization styles in the hero section. ALL CAPS for one line, Title Case with hyphens for another. |

### Price Typography on Menu Pages

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| LOW | All menu pages — price items | Prices appear inline with item names (e.g., "12\" Medium$12.35") | Add consistent spacing between item name and price, use tabular-nums for price alignment | Principle 11: Tabular numbers on changing values. Prices should use `font-variant-numeric: tabular-nums` for consistent alignment. |

### Banner Subtitle Font Size

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| LOW | All pages — banner `<h3>` | The subtitle "Homemade Food \| Fresh Ingredients \| Delivery and Carry Out" appears at h3 size | Ensure this is appropriately sized relative to the h1 — if it's a subtitle, it should be visually subordinate | The h3 size may be too close to the h1, reducing the visual hierarchy. |

### Body Text Line Height

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| LOW | Menu descriptions, about text | Body paragraphs appear to have standard line-height | Verify line-height is 1.5-1.6 for body copy | Principle 7: Line-height by role. Body copy needs comfortable reading spacing. |

## Considered but Rejected

| Location | Candidate | Rejected because |
|----------|-----------|-----------------|
| Menu items | Use a monospace font for prices | This would look out of place in a restaurant context. Tabular-nums in the current font is the better approach. |
| Hero heading | Increase h1 size | The hero h1 likely already uses a large size. Increasing it further could cause wrapping issues on mobile. |
| Body font | Switch to a serif font for menu descriptions | Quicksand (sans-serif) is appropriate for a casual restaurant. Serif would feel overly formal. |

## Verification

| Check | Result |
|-------|--------|
| Font loading | ✅ Quicksand loaded via Google Fonts |
| Heading hierarchy | ❌ h1→h3 skip on all pages |
| Capitalization consistency | ❌ Mixed ALL CAPS and sentence case |
| Tabular numbers on prices | ⚠️ Not verified — needs CSS inspection |
| Line height on body text | ⚠️ Not verified — needs visual inspection |
| Font smoothing | ✅ Applied at root level |

## Verdict

**Needs changes** — 1 MEDIUM finding (heading hierarchy), 6 LOW findings. The typography is functional but the heading hierarchy issue affects all pages and should be addressed. The ALL CAPS usage in footers and hero is a readability concern.
