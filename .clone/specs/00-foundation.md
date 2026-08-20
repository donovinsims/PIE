# FOUNDATION SPEC — Pietro's Pizzeria clone (frozen evidence)

Source: pietrospizzeria.net, captured 2026-08-19. Evidence: `.clone/evidence/*topology-live.json`, `.clone/<slug>/evidence/observation-*.json`, `.clone/evidence/page-text-*.json`, `.clone/tools/asset-map.json`.

## Design tokens
- Accent red: `#C10000` (rgb(193,0,0)) — nav current pill, headings (h3), buttons, links
- Page bg: `#EEEEEE` (body) · content card bg: `#FFFFFF` (dmInner)
- Body text: `#252525`, Source Sans Pro 16px/24px, w400
- Dark text (hero h1): `#111111`; hero h1 is WHITE (inline style, bold) on dark image
- Header bg: `#000000` (black) · topbar text: `#463939` (rating widget)
- Footer wrapper bg: `#333333`; footer bands: `#FFFFFF` + `#EAEAEA`
- Footer policy links: Open Sans 11px w500 `#666666`
- Hero overlay: black `rgba(0,0,0,0.27)` over bg slideshow images
- Hero slideshow (home): girls-jumping-fashion-cloths-1920w.jpg + IMG_7604-1920w.jpg (2 slides), 1440×830
- Inner pages banner bg: `living-room-interior-design-white-sofa-2880w.jpg` + per-page hero image (see per-page specs)

## Fonts (self-hosted in /assets)
- Quicksand (variable 300-700): `/assets/cdn.hibuwebsites.com/fonts/s/quicksand/v37/6xKtdSZaM9iE8KbpRA_hK1QN.woff2` — headings
- Source Sans Pro 400/700/900: `/assets/cdn.hibuwebsites.com/fonts/s/sourcesanspro/v23/*.woff2` (Regular, Bold, Black) — body/nav
- Roboto variable 100-900: `/assets/cdn.hibuwebsites.com/fonts/s/roboto/v51/KFO7CnqEu92Fr1ME7kSn66aGLdTylUAMa3yUBA.woff2` — fallback/other

## Typography
- h1: Quicksand 40px (inner) / 48px (home hero) — white or #111/dark depending on bg
- h3/section title: Quicksand 22px, color #C10000 (red), centered
- Body p: Source Sans Pro 16px #252525
- Menu item lines: Source Sans Pro 15px w700 #252525, line-height 24px
- Nav links: Source Sans Pro 15px w400, letter-spacing .03em
- Tagline (banner): Quicksand 20px white, centered
- Home hero h1 48px: "Roscoe's Favorite Pizzeria" bold white centered
- Hero upsell: Source Sans Pro 30px bold white ("NEW DINING AREA NOW OPEN!" / "Full Service Bar-GAMING-Sunday Ticket!")
- Home section 2 big text: Source Sans Pro 60px / 48px #252525

## Buttons / CTAs
- Pill: bg #C10000, radius 39px, padding ~10px 20px, height 45px, width 220px (desktop), white text Source Sans Pro 16px w400 (center). Two side-by-side on banner. Hover: keep red (no evidence of hover change; verify later)
- "Learn More" (cards): same red pill 170×40, radius 39
- Text links: red #C10000, Source Sans Pro 16px

## Layout
- Content container: max-width 960px, centered (240 → 1200 on 1440 viewport)
- Row padding: 15px 40px default; banner rows vary
- Page stack: [header 0-234] [content] [footer]
- Header: black; topbar row (y15-155, pad 0 40px): 3 cols: rating pill (left, 306×61 at 240,45: "4.3" + 5 stars + "(783 Reviews)" link → /reviews) | logo img center (240×155, Transparent_Logo-removebg-preview-b5dcba56-288w.png) | right col: phone "(815) 623-2112" white 16px + tagline "Carry Out-Delivery & Dining Area Available!" 15px
- Nav row (y155-234): desktop items horizontal pills: padding 8px 12px, radius 30px, white text; current = bg #C10000; dropdown (Menu ▾) black bg panel, items 158×48
- Footer: white band + #EAEAEA bands; 3 columns VISIT US | HOURS | CONTACT US (468 each, centered); Get Directions link; bottom bar policy links + copyright

## Hours (footer + contact)
Mon - Thu, Sun 10:00 am - 9:45 pm · Fri, Sat 10:00 am - 10:45 pm (per-day list: Mon-Thu 10:00am-9:45pm, Fri/Sat 10:00am-10:45pm, Sun 10:00am-9:45pm)

## Contact constants
- Address: 5724 Elevator RD, Roscoe, IL 61073
- Phone: (815) 623-2112 · Email: myaunke75@gmail.com
- Facebook: https://www.facebook.com/259108440870825 · Messenger: http://m.me/259108440870825
- Directions: https://www.google.com/maps?daddr=5724+Elevator+RD++Roscoe+IL+61073+US
- Rating (topbar + reviews): 4.3 (783 Reviews); reviews filter: 4.4 (649)
- Open status line: "Hours: Open • Closes 9:45 pm" (banner area, white bold)

## Assets (per-page banner hero images)
- menu: IMG_7606-2880w.jpg · broadster-chicken: IMG_7579 · appetizers: IMG_7610 · sandwiches: g1 · dinners: IMG_7609 · desserts: pietrospizzeria-gallery-image-16 · family-or-party-trays: IMG_7601 · lunch-specials: IMG_7628+IMG_7629 (bg) · gallery: IMG_7580+(1) · employment: IMG_7629+g11+green-vegetables (bg) · reviews: IMG_7580+(1) · about: Logo-fb5a2597-2880w.png · contact: (banner uses living-room bg only)
- All under `/assets/le-cdn.hibuwebsites.com/81e069a157ae431ab84f1edb47dc2a55/dms3rep/multi/opt/`

## Logo
- `/assets/le-cdn.hibuwebsites.com/81e069a157ae431ab84f1edb47dc2a55/dms3rep/multi/opt/Transparent_Logo-removebg-preview-b5dcba56-1920w.png` (288w variant also available)