# Pittsburg Nail Spa — Website

A static, hand-built replacement for pittsburgnailspa.com. Vanilla HTML, CSS, and JS — no build step, no framework, no dependencies.

## What this is

A Kleos Design cold-pitch build for Pittsburg Nail Spa (2004 N Broadway, Pittsburg, KS). Drop the folder on any static host (Netlify, Cloudflare Pages, S3, or even the salon's existing hosting) and it works.

## Running it

No build step. Either:

```
python3 -m http.server 8000
```

…then open http://localhost:8000, or open `index.html` directly in a browser (some features like the map iframe may behave better over HTTP).

## File layout

```
index.html              Main (and only) page
404.html                Courtesy 404
robots.txt              Allows all, points to sitemap
sitemap.xml             Single URL
css/
  reset.css             Minimal modern reset
  tokens.css            Design tokens (colors, type, spacing)
  layout.css            Header, section rhythm, grids
  components.css        Buttons, tables, FAQ, gallery, form
js/
  nav.js                Hamburger + sticky-header border
  booking-form.js       Builds an sms: link from form fields
img/
  hero.svg              Hero placeholder
  welcome.svg           Welcome placeholder
  gallery-1…6.svg       Gallery placeholders
  og-share.svg          Open Graph share image
assets/
  logo.svg              Wordmark
  favicon.svg           Favicon
```

## Before launch — swap placeholder images

The SVG images in `/img/` are on-brand placeholders. Before going live, replace each with a real, compressed photo (JPG or WebP, <100KB each):

| File | Use | Notes |
|---|---|---|
| `hero.svg` | Hero image | Pick the cleanest hand/manicure shot |
| `welcome.svg` | Welcome section | Salon interior shot preferred |
| `gallery-1…6.svg` | Gallery grid | Variety: mani, pedi, nail art, close-up |
| `og-share.svg` | Social share preview | Can stay SVG or be rasterized at 1200×630 |

Two paths for the salon's images:

- **Recommended:** Pull 6–8 shots from their existing WordPress library (`pittsburgnailspa.com/wp-content/uploads/2025/05/`), compress to <100KB each, drop in. Keep the `.svg` filenames or update the `<img src>` in `index.html` to match.
- **Better (post-pitch):** Schedule a 2-hour iPhone photo session at the salon. Real photos always beat stock.

If you swap to raster formats, use `<picture>` with a WebP primary + JPG fallback for best performance.

## Booking form

The "Book" section is a plain HTML form. On submit, JavaScript builds an `sms:+16207150115?&body=...` URL and opens the visitor's Messages app with the request pre-filled. The visitor reviews and hits send.

No API, no backend, no ongoing cost. Works natively on iOS and Android. Graceful fallback: visitors can always call the posted number.

If you want to upgrade to real calendar booking later (Square Appointments has a free tier), the form fields already match what a calendar integration would need.

## SEO

- Semantic HTML, one `<h1>`, proper heading hierarchy
- `LocalBusiness` / `BeautySalon` JSON-LD in `<head>` with address, hours, geo, phone, sameAs
- `BreadcrumbList` JSON-LD
- Open Graph + Twitter Card tags
- Canonical URL set to `https://pittsburgnailspa.com/`
- Sitemap at `/sitemap.xml`, referenced from `robots.txt`

**Verify before launch:**

- Geo coordinates in the `LocalBusiness` schema are set to `37.4109, -94.7047`. Re-check by searching the address in Google Maps and pasting the lat/long in.
- The `og:url` / `canonical` / sitemap URL all assume the site lives at `https://pittsburgnailspa.com/`. Update them if the hosting path differs.
- Confirm the Yelp listing exists before adding a Yelp icon to the footer. Currently omitted — the old site shipped a broken Yelp link.

## Accessibility

- Skip-to-content link
- `alt` text on every image
- Color contrast meets WCAG AA (body `#2A241F` on `#FAF6F0` = 13.4:1)
- Visible focus states on all interactive elements
- Mobile nav uses `aria-expanded` / `aria-controls`
- Form inputs have associated `<label>` elements
- Map iframe has a descriptive `title` attribute

## Browser testing

Tested against mobile Safari and Chrome desktop. No IE11 support (intentional).

## Typography

One Google Font: Cormorant Garamond (400 + 600). Body copy uses the system font stack — zero additional network cost.

## Credits

Built by Kleos Design (kleosdesign.com). Logo traced from the salon's existing PNG — a clean SVG rebuild is part of the full proposal.
