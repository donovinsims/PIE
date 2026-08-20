# SPECIAL PAGES SPEC — home, gallery, reviews, about, contact, employment

## home (/)
Structure (all measured at 1440):
1. **Hero row** u_1948017386 full-bleed y=0..830 h=830, bg slideshow (2 slides: girls-jumping-fashion-cloths-1920w.jpg, IMG_7604-1920w.jpg), black overlay rgba(0,0,0,.27). CONTAINS THE HEADER (topbar + nav are inside this row, black bg #000 not transparent):
   - Topbar (y15–155): [rating link 306×61 at 240,45: "4.3" + ●●●●● (stars FontAwesome) + "(783 Ratings & Reviews)" 14px white] [logo center 240×155] [right: "(815) 623-2112" white 655-16 + "Carry Out-Delivery & Dining Area Available!" 15px]
   - Nav (y155–234): pills as foundation spec
   - Hero content centered 940px at y~300+:
     - h1 "Roscoe's Favorite Pizzeria" Quicksand 48px w700 WHITE centered
     - p upsell Source Sans Pro 30px w700 white: `NEW DINING AREA NOW OPEN!` and `Full Service Bar-GAMING-Sunday Ticket!`
     - tagline h3 Quicksand 20px white: `Homemade Food | Fresh Ingredients | Delivery and Carry Out` (desktop, single line)
     - buttons y571: `(815) 623-2112` and `Visit Us at 5724 Elevator RD, Roscoe, IL` (220×45 red pills)
     - `Hours: Open • Closes 9:45 pm` white 700 y=657
2. **About row** y=830..1048: 960px: h3 red `About Pietro's Pizzeria` + 2 paragraphs (from page-text-home) + 5 caption buttons red text (wifi/phone icons etc. — STYLIZE SIMPLY: 5 red links with Font Awesome icons, e.g. fa-wifi, fa-phone; text verbatim: e.g. "Order Online / Call Us / ..." per text file)
3. **Testimonial strip** (row with bg image IMG_7602? + overlay): `TESTIMONIALS` Quicksand 30px white; cards: [4.0 "Great Food!" text] [4.3 "Excellent Food &amp; Service" text]; `WATCH OUR VIDEO HERE` red/yellow link + YouTube icon. Two quote cards each ~300x140 rounded white bg with name.
4. **Menu Category Cards** (2 rows full-bleed): 3 cards/row 480px cols: [Pizza→/menu] [Appetizers→/appetizers] [Sandwiches→/sandwiches]; [Dinners→/dinners] [Desserts→/desserts] [Family or Party Trays→/family-or-party-trays]; each card: solid-color bg (white) with IMG on top (rounded), name Quicksand 22px, blurb 16px, `Learn More` red pill 170×40 (radius 39).
   - Card images (from live DOM): pizza: IMG_7604-800w? — verify against row-brief.json home imgs; use the 3 card imgs listed for row (y=946.. kids=26)
5. **CTA row**: `Learn More About Pietro's Pizzeria` red link centered + paragraph; maybe buttons.
6. **Footer** (shared).

## gallery (/gallery)
- Banner (h1 `Pietro's Pizzeria Gallery`, bg IMG_7580+(1)-2880w.jpg)
- Row y=728 h=1767: h3 red `Check Out Great Food Options` + p + **masonry grid of images** (kids=26 incl. ~16-20 img nodes; real photos from /dms3rep/multi/opt/ + /files/ — reconstruct grid 3-4 columns, evenly spaced, images natural size cropped)
- Grid images list: from page-text-gallery `images` field (exact URLs → local paths via asset-map.json).

## reviews (/reviews)
- Banner (h1 `Pietro's Pizzeria Customer Reviews`, bg IMG_7580+(1))
- Row y=727 h=2184 (white bg): 
  - Header line: h3 red `Here's what our satisfied customers are saying` + big rating `( 4.3 )` Quicksand + `Overall Rating` + stars + red `Write Review` pill button (links to https://www.pietrospizzeria.net/reviews# write-review; placeholder — link to google review URL)
  - Filter tabs: `All` (4.3, 783) | `Google` (4.4, 649) — pill outline buttons
  - Review cards (26 kids: ~10 visible cards): name, date, 5 star icons, text; from `page-text-reviews.json` `text` (verbatim cards; author+date both bold-ish; then review text)
  - `Load More` centered red pill button (loads more; clone shows same count)
- Review JSON-LD in text field — skip.

## about (/about)
- Banner: h1 `About Pietro's Pizzeria` + tagline + buttons + hours (banner bg: Logo-fb5a2597-2880w.png is bright — verify contrast; likely placed on living-room bg like others)
- Row y=768 h=470 `bg rgb(255,255,255)`: Yext-style white card, 2-col: left h3 red `About Us` + paragraphs (verbatim from page-text-about); right column: `Year Established` / `Products` / `Services Pizza Sandwiches Appetizers Gaming` / `Specialties` / `Associations` / `Brands` / `Business Hours` (per-day list) / `Payment Types American Express Cash Check Discover MasterCard Visa` / `Attributes` / `Languages English` — label Quicksand 22 red, value Source Sans Pro 16 #252525
- `Hibu FB Page` + facebook iframe/embed link row → simple: Facebook logo + `Facebook` link (https://www.facebook.com/259108440870825) + `Hibu FB Page` label if in DOM text
- Footer.

## contact (/contact)
- Banner (h1 `Contact Pietro's Pizzeria` h=580 — includes extra row content: 2 phone/CTA columns? kids=20: copy: phone number big + address; plus buttons)
- Row y=814 h=485 white: **Contact form** `Get In Touch With Us` h3 red + `Send Us Message Free Text` p + fields: First name, Last name?/Email, Mobile/Phone, Message + red submit `Reach Out To Us` (formaction mailto myaunke75@gmail.com? per live DOM: form action email). Copy field order from page-text-contact + kids.
- Row y=1299 #EAEAEA: hours strip (Mon-Thu/Sun 10-9:45, Fri/Sat 10-10:45) + address + phone + `Get Directions` links + social (6 icons) — reconstruct from page-text-contact text.
- Mapbox iframe (dark-styled map, center 42.428, -89.00559; leaflet-style) — REPLACE with static map image: use OSM static? No external calls: use plain styled div w/ pin + link (acceptable deviation; document in PROGRESS).

## employment (/employment)
- Banner (h1 `Pietro's Pizzeria Jobs`, bg IMG_7629?/g11)
- Row y=727 h=627: h3 red `Looking for New Job?` + paragraphs + **Application form**: Name/Email/Phone/Message + `Attach Resume` file input + red submit (form fields verbatim from page-text-employment; form action mailto myaunke75@gmail.com) — copy FORM VERBATIM from rendered.html (form classes dmform)
- Row y=1354 bg IMG: `Learn More About Pietro's Pizzeria` red link + paragraph (y=1354..1695)
- Footer.

## Shared components (used by all)
- `Header` (topbar + nav, black; nav from foundation spec; links: /, /menu, /menu#pizza? NO — dropdown items are pages: /menu /menu# /broadster-chicken /appetizers /sandwiches /dinners /desserts; others: /family-or-party-trays /lunch-specials /gallery /employment /reviews /about /contact)
- `Footer`
- `Banner({ title, bg, tagline, buttons, hours })`
- `RedPill({ href, children, size })` — button
- `MenuList` (template pages)