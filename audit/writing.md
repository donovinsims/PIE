# Writing Audit — Pietro's Pizzeria

**Domain:** Writing (`better-writing`)
**Scope:** Full site — 15 pages
**Mode:** Full

## What's Working Well

- Consistent voice: warm, family-friendly, inviting
- Address the reader directly ("you") in most body copy
- Clear phone number and address throughout
- "Order Now" CTA is verb-first and action-oriented
- "Get Directions" link text describes its destination
- Business hours are clearly stated on every page

## Findings

### Inconsistent Button Labels Across Forms

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| MEDIUM | `/contact` vs `/employment` | Contact: "Reach Out To Us" / Employment: "Contact Us" | Contact: "Send Message" / Employment: "Submit Application" | Principle 6: Consistent flow vocabulary. Two different forms use different button labels that don't clearly describe their actions. "Reach Out To Us" is especially vague. |

### Employment Form Button Says "Contact Us" for Job Application

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| MEDIUM | `/employment` — submit button | "Contact Us" | "Submit Application" | Principle 5: Verb-first buttons. The button is on a job application form but says "Contact Us", which doesn't describe the action. Users expect "Submit" or "Apply". |

### Vague Tagline in Header

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| LOW | `.topbar-tagline` (all pages) | "Carry Out-Delivery & Dining Area Available!" | "Carry Out, Delivery & Dine-In Available" | Inconsistent hyphenation (hyphen vs "and"), and "Dining Area Available" is less natural than "Dine-In Available". Also missing space around the hyphen. |

### All-Caps Text in Hero and Headings

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| LOW | `/` — hero upsell, stop-band heading | "NEW DINING AREA NOW OPEN!", "Full Service Bar-GAMING-Sunday Ticket!", "STOP AND SMELL THE ROSES EVERY DAY!" | Use sentence case: "New dining area now open!", "Full service bar, gaming, Sunday ticket!", "Stop and smell the roses every day!" | Principle 8: One capitalization policy. Mixed casing (ALL CAPS, Title Case, sentence case) reads as inconsistent. ALL CAPS also reduces readability. |

### Inconsistent Menu Item Descriptions

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| LOW | `/sandwiches` — Calzone description | "Ham, Pepperoni, Salami, Mozarella & Special Sauce" (inline, not as a separate line) | Move description to a consistent location below the item name, or use a consistent format across all menu pages | Some menu items have ingredient lists, others don't. The calzone ingredients are crammed on the same line as the price. "Mozarella" is also misspelled (should be "Mozzarella"). |

### Generic Meta Descriptions

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| MEDIUM | All pages — `<meta name="description">` | "Pietro's Pizzeria — Homemade Food \| Fresh Ingredients \| Delivery and Carry Out in Roscoe, IL." (same on every page) | Unique, page-specific meta descriptions for each page | Identical meta descriptions across 15 pages hurt SEO and don't help users understand what each page offers. Each page should describe its specific content. |

### "You Won't Be Disappointed" — Filler Copy

| Severity | Location | Before | After | Why |
|----------|----------|--------|-------|-----|
| LOW | `/menu` (pizza page) | "You won't be disappointed." | Remove or replace with specific value prop | This is a generic claim that adds no information. Better to say something specific like "Gluten-free and cauliflower crust options available." |

## Considered but Rejected

| Location | Candidate | Rejected because |
|----------|-----------|-----------------|
| `/reviews` — review text | Standardize review card format | Reviews are user-generated content — the site shouldn't modify what customers said. The format is acceptable. |
| Footer legal links | Rename "Do Not Share My Information" to "Cookie Settings" | The current label is more descriptive for non-technical users. It's a valid choice for a local restaurant audience. |
| Menu prices | Add descriptions to all items | For a local pizzeria, most items are self-explanatory. Adding descriptions to "French Fries" or "Cannoli Cake" would be over-specification. |

## Verification

| Check | Result |
|-------|--------|
| Button label consistency | ❌ "Reach Out To Us" vs "Contact Us" on different forms |
| Capitalization consistency | ❌ Mixed ALL CAPS, Title Case, sentence case |
| Meta descriptions | ❌ Identical across all 15 pages |
| Spelling check | ❌ "Mozarella" misspelled on sandwiches page |
| Voice consistency | ✅ Warm, family-friendly throughout |
| Direct address | ✅ Uses "you" in instructional copy |
| Verb-first buttons | ✅ "Order Now", "Get Directions" |

## Verdict

**Needs changes** — 3 MEDIUM findings (button inconsistency, employment button, meta descriptions), 4 LOW findings. The writing is generally warm and appropriate for a local restaurant, but the inconsistent button labels and identical meta descriptions are the most actionable improvements.
