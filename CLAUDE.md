# CLAUDE.md — Pittsburg Nail Spa Website

## Project context

This is a **Kleos Design** cold-pitch build for **Pittsburg Nail Spa** (Pittsburg, KS). The salon currently has a generic agency-built WordPress site (`pittsburgnailspa.com`, built by Mac Marketing) that does not reflect the quality of their actual services. We are building a replacement site, unsolicited, to bring to the cold pitch.

This is the first of several Kleos pitch builds, so the **methodology matters as much as the output**. Build it like every line could be reused for the next pitch.

## Hard constraints

- **Vanilla HTML + CSS + JS only.** No frameworks. No build step. No package.json. No node_modules. The deliverable is a folder of static files the salon (or a future host) can drop on any web server.
- **Single-page site.** Everything on `index.html` with anchor navigation. Keep `404.html` as a courtesy.
- **Mobile-first.** Most nail salon traffic is on phones. Design for 375px width first, scale up.
- **Lightweight.** Target: total page weight under 500KB excluding hero image. No webfonts beyond what the system can serve via `font-family` stack OR a single Google Font import (one family, two weights max).
- **No tracking, no analytics, no third-party scripts** other than Google Maps embed (one iframe). The current site routes booking through `lk.macmarketing.us` — we are stripping that.
- **Segmented files.** Split CSS into logical files (`reset.css`, `tokens.css`, `layout.css`, `components.css`) and concat at the end OR link separately — your call, but no single 2000-line stylesheet.
- **Accessible.** Semantic HTML, alt text on every image, color contrast ≥ 4.5:1, focus states visible, skip-to-content link.

## Aesthetic direction

**Warm / airy / boutique.** Think small-town boutique that respects the customer's time and intelligence. Not a city spa, not a stock-photo template.

### Color tokens (use as CSS custom properties)

```
--cream:        #FAF6F0   (page background)
--blush:        #E8C7C0   (primary accent — buttons, links)
--blush-deep:   #C99A92   (hover states, emphasis)
--sage:         #A8B5A0   (secondary accent — quiet UI)
--sage-deep:    #6B7A65   (text on sage backgrounds)
--ink:          #2A241F   (body text)
--ink-soft:     #5C534B   (secondary text)
--rule:         #E5DDD3   (borders, dividers)
--white:        #FFFFFF   (cards on cream)
```

### Type

- **Headings:** A warm serif. First choice: `"Cormorant Garamond"` from Google Fonts, weights 400 + 600. Fallback stack: `Cormorant Garamond, "Playfair Display", Georgia, serif`.
- **Body:** System sans for speed. Stack: `-apple-system, BlinkMacSystemFont, "Segoe UI", Inter, system-ui, sans-serif`.
- **Sizes (mobile → desktop):** body 16/17, h2 28→40, h1 36→56. Generous line-height (1.6 body, 1.2 headings).
- **Letter-spacing:** Slight negative tracking on large headings (-0.01em). Slight positive on small caps labels (+0.08em).

### Spacing & rhythm

- 8px base unit. Use multiples (8, 16, 24, 32, 48, 64, 96).
- Generous vertical rhythm between sections — minimum 64px on mobile, 96px on desktop.
- Max content width: 1100px. Hero section can go wider (full-bleed).

### Visual notes

- Lots of whitespace. Resist filling space.
- Soft, low-contrast section dividers (a 1px `--rule` line, or a subtle background shift cream → white).
- Buttons: solid blush with deep-blush hover, slight border-radius (6px), no shadows.
- Images: rounded corners (8px), subtle border in `--rule`, no shadows.
- No gradients. No animations beyond simple opacity/transform on hover (200ms ease).

## File structure

```
/
  index.html
  404.html
  /css
    reset.css
    tokens.css
    layout.css
    components.css
  /js
    booking-widget.js     ← see BOOKING_WIDGET_SPEC.md
    nav.js                ← mobile menu toggle, smooth scroll
  /img
    (real images only — see BRIEF.md for image plan)
  /assets
    favicon.svg
    logo.svg              ← rebuild from their PNG, see BRIEF.md
  README.md               ← handoff doc for whoever hosts it
  robots.txt
  sitemap.xml
```

## Sections to build (in order on the page)

1. **Header** — logo left, nav right (Home / Services / Gallery / Visit / Book), mobile hamburger
2. **Hero** — headline, sub, primary CTA (Book), secondary CTA (Call). One large image right side / below on mobile.
3. **Welcome** — short intro paragraph, secondary image
4. **Services** — three pedicure tiers with pricing, then collapsible/expandable for full menu (manicures, enhancements, etc — see BRIEF.md). Use `<details>`/`<summary>` for the expandables. Pricing in a clean two-column layout (Cash / Card), not the current cramped table.
5. **Why us** — three value props (Hygiene, Trends, Precision) — KEEP these from current site, they're fine
6. **Gallery** — 6-image grid, lightbox optional (don't over-engineer; clicking opens larger version in same tab is fine)
7. **Booking widget** — see BOOKING_WIDGET_SPEC.md
8. **Visit** — hours, address, embedded Google Map, click-to-call
9. **FAQ** — `<details>`/`<summary>` accordions, keep the four they have
10. **Footer** — repeat contact, socials (Facebook, Instagram, real Yelp link — see BRIEF.md), Kleos credit line

## SEO & schema (don't skip this — it's a major Kleos differentiator)

In `<head>`:
- Title: `Pittsburg Nail Spa | Manicures, Pedicures & Nail Art in Pittsburg, KS`
- Meta description: write one — 150–160 chars, mention Pittsburg KS + Crawford County + the three core services
- Open Graph tags (title, description, image, url, type=website)
- Twitter card tags
- Canonical URL: `https://pittsburgnailspa.com/`

In a `<script type="application/ld+json">` block, include:
- `LocalBusiness` / `BeautySalon` schema with name, address, geo (38.8408, -94.7053 — verify), phone, hours, priceRange "$$", URL, sameAs (FB, IG)
- `BreadcrumbList` (Home only, but keeps Google happy)

## What NOT to build

- No carousel/slider. Static is faster and more trustworthy.
- No popup. No exit-intent. No newsletter signup. No chatbot bubble.
- No fake testimonials. The current site has three obviously-AI-generated reviews ("Abigail Sinclair", "Felicity Moore"). See BRIEF.md for what to do instead.
- No "members area" or login. They're a walk-in salon.
- No dark mode. Not the right move for this brand.

## Quality bar before handoff

- Lighthouse: Performance 95+, Accessibility 100, Best Practices 100, SEO 100
- Test in mobile Safari and Chrome desktop at minimum
- Validate HTML at validator.w3.org
- All links work, including the real Yelp URL (the current site has `#link_yelp` which is broken)
- View source should be readable — proper indentation, useful comments at section boundaries

## Read these next

1. `BRIEF.md` — content, copy, real data, what to keep vs. cut
2. `BOOKING_WIDGET_SPEC.md` — the one piece of JS that matters

When in doubt: simpler, quieter, faster. This is a small-town nail salon, not Aman Resorts.
