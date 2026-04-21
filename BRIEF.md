# BRIEF.md — Content, Copy & Source Material

## Business facts (verified from current site)

- **Name:** Pittsburg Nail Spa
- **Address:** 2004 N Broadway, Pittsburg, KS 66762
- **Phone:** (620) 715-0115 (use `tel:+16207150115` in href)
- **Hours:** Mon–Sat 9:00 AM – 7:00 PM • Sunday 11:00 AM – 5:00 PM
- **Facebook:** https://www.facebook.com/pittsburgnailspa
- **Instagram:** https://www.instagram.com/pittsburgnailspa
- **Yelp:** ⚠️ Current site has a broken link (`#link_yelp`). Search Yelp for the real listing before launch. If no listing exists, omit the icon — don't ship a broken link a second time.
- **Google Maps:** https://maps.app.goo.gl/mdYPQbsnVnS7T9jN7

## Copy — write it like this

### Hero

**Headline:** Nails, naturally beautiful.

**Sub:** Pittsburg's neighborhood nail spa for manicures, pedicures, and the occasional treat-yourself afternoon.

**CTAs:** [Book an appointment] [Call (620) 715-0115]

### Welcome section

A short, warm paragraph. Don't oversell. Something like:

> Pittsburg Nail Spa has been part of the neighborhood since opening on North Broadway. We do clean, careful work — classic manicures, real pedicures with hot towels, gel and acrylic when you want them, and nail art for when you're feeling it. Walk in, sit down, leave with hands and feet you're proud of.

(CC: feel free to tighten this further. Avoid "experience," "luxury," "indulge," "pamper," "rejuvenate" — every nail salon site uses those words. Sound like a person, not a brochure.)

### Service menu

KEEP all the real pricing. Lay it out cleanly. Cash and card prices both shown.

#### Pedicures

| | Cash | Card |
|---|---|---|
| **Refresh Pedicure** — Whirlpool soak, sugar scrub, shaping, exfoliation, massage, hot towels, polish | $40 | $40.80 |
| **Refresh + Gel** | $55 | $56.10 |
| **Happy Feet Pedicure** — Everything in Refresh, plus callus gel, hot stones, cooling gel | $50 | $51.00 |
| **Happy Feet + Gel** | $65 | $66.30 |
| **Collagen Pedicure** — Collagen scrub, mask, relaxing gel, lotion, serum, hot stones, paraffin wax. Choose your scent: Crystal Waters, Lavender & Lace, Sweet Orange, or Luxury Pearl. | $60 | $61.20 |
| **Collagen + Gel** | $75 | $76.50 |

**Add-ons:** Paraffin Wax +$10 • Hot Herbal Neck Wrap +$5

#### Manicures, Enhancements, Kids' Princess Menu

⚠️ The current site has a `/services` page we did not scrape. **Before launch, fetch `https://pittsburgnailspa.com/services` and pull the rest of the menu** (regular manicures, gel manicures, full sets, fills, dip powder, nail art, kids' menu). Mirror the same Cash/Card layout.

If for any reason that page is unreachable, ship the site with just the pedicure menu visible and a "Full menu available in salon — call (620) 715-0115" note. Better to be incomplete than wrong.

### "Why us" — keep these three, tightened

- **Hygiene first** — Sanitized tools, fresh liners, no shortcuts.
- **Current styles** — Trends from the chairs of NYC and LA, done in Pittsburg.
- **Detail work** — Crisp lines, clean cuticles, polish that lasts.

### Group bookings

The current site has a "Get Polished as a Group — Birthdays, Brides & More" section. Keep it. One sentence + one CTA:

> Hosting a bridal party, birthday, or girls' day? Call ahead and we'll set you up. Groups of 4+ get our undivided attention.

[Call to plan your group]

### Testimonials — important

**The current site has three fake testimonials.** Do not carry these forward. Names like "Abigail Sinclair", "Desmond Carter", and "Felicity Moore" are stock-AI fillers and they undermine trust the moment a local recognizes none of them.

**Two options for the pitch demo:**

1. **Preferred:** Pull 3 real reviews from their actual Google Business or Facebook page (visit those pages, copy verbatim with reviewer first name + last initial). Cite the source ("Google review, May 2025").
2. **Fallback if no real reviews exist yet:** Cut the testimonial section entirely. Replace with a small "Leave us a review" block linking to Google + Facebook.

**Do not invent reviews. Ever.** This is a Kleos rule, not a project rule.

### FAQ — keep all four, exact text is fine

1. How do I book an appointment?
2. Do you provide everything for the treatment?
3. Do you offer services for children?
4. Can I request a specific technician?

### Footer

- Logo
- Contact (phone, address)
- Hours
- Social icons (FB, IG, Yelp only if real)
- "Site by **Kleos Design** — kleosdesign.com" (small, bottom right, this is the pitch)
- Copyright Pittsburg Nail Spa 2026

## Images

The current site uses stock photography (visible from filenames like `front-view-young-female-posing-after-manicure-procedure-showing-her-nails-beauty-lady-girl-manicure-self-care-health-fashion-min-1024x683.jpg`). For the pitch demo we have two paths:

**Path A (recommended for cold pitch):** Reuse 4–6 of their existing images so the demo feels like *their* salon, not a stranger's. Pull from `https://pittsburgnailspa.com/wp-content/uploads/2025/05/`. List them with proper `alt` text. Compress before shipping (target each under 100KB, use `.webp` with `.jpg` fallback via `<picture>`).

**Path B (post-pitch):** Once they sign, schedule a 2-hour photo session at the salon with an iPhone — the salon space, real techs working, real customers (with permission). Real photos > any stock.

For the pitch, use Path A. Annotate in the README that real photos are part of the proposal.

### Required images for the build

1. **Hero image** — choose the cleanest hand/manicure shot from their library
2. **Welcome section image** — the salon interior shot if any exists, otherwise a pedicure shot
3. **Gallery (6)** — variety: manicure, pedicure, nail art, close-up, before/after if any
4. **Favicon** — generate a simple SVG: lowercase "p" in blush on cream, or a tiny lacquer-bottle icon

## Logo

Their current logo is at `https://pittsburgnailspa.com/wp-content/uploads/2025/05/logo-02-1.png`. It's a PNG. Two paths:

1. **Quick:** Use their PNG as-is, but add a `srcset` for retina.
2. **Better:** Trace it to SVG (it looks like a wordmark — should trace cleanly). Ship SVG primary, PNG fallback.

Default to option 1 for the pitch. Mention SVG conversion as part of the Kleos proposal.

## What we are explicitly removing

- ❌ MacMarketing booking redirect (`lk.macmarketing.us/PittsburgNailSpa-Booking`) — replaced with our booking widget, see BOOKING_WIDGET_SPEC.md
- ❌ Three fake testimonials
- ❌ Broken `#link_yelp` footer link
- ❌ "Mac Marketing" footer credit (replaced with Kleos)
- ❌ Bottom keyword-stuffing block ("Nail salon N Broadway / Nail salon Pittsburg / Nail salon 66762") — Google penalizes this now, it's a 2015 SEO tactic
- ❌ The cramped pricing table

## What we are explicitly adding

- ✅ Real schema.org LocalBusiness markup
- ✅ Click-to-call button always visible on mobile
- ✅ Embedded Google Map (iframe)
- ✅ Group booking call-out
- ✅ Booking widget (see spec)
- ✅ "Site by Kleos" footer credit (the whole point)
- ✅ Proper alt text on every image
- ✅ Skip-to-content accessibility link
