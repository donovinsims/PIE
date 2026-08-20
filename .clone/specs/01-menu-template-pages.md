# TEMPLATE PAGES SPEC — menu-style pages

## Shared blueprint (all pages below)
1. **Banner** (fixed row, full-bleed, y=233 → 727, h=494): bg image + dark overlay, centered 940px column:
   - h1 "..." Quicksand 40px w400 color #111 (see per-page), `margin: 0`
   - tagline h3 Quicksand 20px WHITE: "Homemade Food | Fresh Ingredients | Delivery and Carry Out"
   - Button row: two red pill buttons 220×45 radius 39: `(815) 623-2112` (tel:) + `Visit Us at 5724 Elevator RD, Roscoe, IL` (Google Maps daddr link) — white text 16px
   - "Hours: Open • Closes 9:45 pm" white bold 16px (line under buttons)
   - h1 box: 250,443 940x60 · tagline: 250,513 940x34 · buttons y=571 · hours y=661 (measured on menu page)
2. **Spacer row** h=51 (transparent).
3. **Intro row** (y=727 h≈143–167): centered 940px:
   - h3 Quicksand 22px red `#C10000` (per-page title)
   - p Source Sans Pro 16px #252525 (paragraph, may include red links)
4. **Spacer row** h=51.
5. **Menu row** (y≈921, h varies): centered 940px:
   - category h3 "Menu" red 22px
   - one category per page with its own h3 title (red 22px: name as printed, e.g. "Pietros Pizzeria")
   - items list: one line per item, Source Sans Pro 15px w700 #252525 lh 24px; item + price inline ("12\" Medium $12.35" — price at end, sometimes separated by whitespace); some items show "$" on separate pseudo-lines (template artifact: e.g. pasta pages print "$9.85" on own line visually); treat as: name then price separated by a few tabs worth of space (use `justify-content: space-between` per line: name left, price right).
   - Empty `.menuItemPrice` styled as right-aligned price slot.
6. **Spacer row** h=51, then Footer.

Category TITLES on each page (from live DOM): appetizers→"Appetizers", sandwiches→"Sandwiches" (11 categories total incl. "Menu"), dinners→"Dinners"+"Extras", desserts→"Desserts".

## Per-page content (exact text: `.clone/evidence/page-text-<slug>.json` → `text`/`headings`)
Menu list items are in the `text` field starting after the intro paragraph (prices with `$`). REPRODUCE VERBATIM, keeping per-line item+price pairs.

### menu (Pizza Menu)
- h1: `Pizza Menu`; intro h3: `Never Say No to Freshly Made, Homemade Pizza!` (para: uses English phrases; includes red links e.g. bread)
- categories: `Pietros Pizzeria` (12" Medium $12.35 … 16" $14.35 … extra toppings .50), `Extras`, `Salads` (Antipasto Salad $8.50 etc. — from text file)
- banner bg: IMG_7606-2880w.jpg

### broadster-chicken (Broaster Chicken)
- h1: `Broaster Chicken`; intro h3 red; items: per text file (whole chickens, halves, sides — prices like $13.85)
- NOTE page name uses "Broaster" brand — copy text verbatim

### appetizers (Try Our Appetizers)
- h1 `Try Appetizers`; intro h3 `Satisfy Your Hunger Before Main Course`; items: Fried Pickles With Chipotle Ranch $7.00, French Fries $3.50, Onion Rings $5.25, Fried Mushrooms (price per text), etc. (verbatim from file)
- banner bg: IMG_7610-2880w.jpg

### sandwiches (Sandwich Menu)
- h1 `Sandwich Menu`; intro h3 `Are You Craving a Fresh Homemade Sandwich?`; items incl. names + $9.35/$9.15/$11.70 range (verbatim)
- banner bg: g1 (anime-young-woman-standing...; treat as any of the downloaded; use IMG_7577? — check row-brief bg field: 'g1')

### dinners (Dinner Menu)
- h1 `Dinner Menu`; intro h3 `Order Perfect Meal for Your Family`; sections `Dinners` (Spaghetti $9.85, Mostaccoli $9.85, Meat Lasagna $11.35…) + `Extras`
- banner bg: IMG_7609-2880w.jpg

### desserts (Dessert Menu)
- h1 `Dessert Menu`; intro h3 `Finish Meal Delectable Dessert`; items: Cannoli Cake $6.00, Red Velvet Cake $6.00, Vanilla Confetti Cake $6.00, Black & White Cake $6.00, Brownies… (verbatim)
- banner bg: pietrospizzeria-gallery-image-16-...jpg

### family-or-party-trays (Family or Party Trays)
- h1 `Family or Party Trays`; intro h3 → actually intro row y=727 h=167 (no h3 head detected; text `FAMILY PARTY TRAYS 16-20 $85 ...`): structure = menu items with `16-20" $85` style sizing + tray list (e.g., `16" FAMILY PARTY TRAY $85`, `20" FAMILY PARTY TRAY $115` etc. — verbatim from file)
- banner bg IMG_7601-2880w.jpg

### lunch-specials (Lunch Specials)
- h1 `Lunch Specials`; intro h3 `Try Our Homemade Lunch Specials`; items: `PERSONAL PIZZA 1 Topping Pop $5.50`, `Additional Toppings $.50/ea`, `Large Pizza With...` (verbatim)
- banner bg IMG_7628-2880w.jpg

## Implementation notes
- Shared component `MenuPage({ title, tagline, introTitle, introParagraph, categories: [{title, items: [{name, price?}]}] })` in one file; each page = thin wrapper with data.
- Intro paragraphs sometimes include `<a>` red links — keep links (hrefs from page-text links field, e.g. /appetizers).
- Item lines: `flex justify-between`; name left #252525 15px w700; price right same style. Multi-name items (e.g. "Fra Diavolo ($ sandwich)") keep verbatim.
- Banner Hours line text: `Hours: Open • Closes 9:45 pm`