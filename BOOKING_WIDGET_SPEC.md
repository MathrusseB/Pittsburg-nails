# BOOKING_WIDGET_SPEC.md — AI-Powered Booking Widget

## What this is

A small inline booking assistant on the Pittsburg Nail Spa homepage. The customer types what they want in plain English ("I'd like a gel pedicure Saturday afternoon for me and my mom"), and the widget responds conversationally to gather the four pieces of info we need, then generates a clean booking summary the salon can act on.

This is the **Kleos differentiator** for this pitch. Every other nail salon site links out to a clunky third-party booking system. Ours has a chat-style assistant that lives on the page, in the salon's voice, with zero customer friction.

## Why it matters for the pitch

When you walk in to pitch, you can demo this live on a phone in front of the owner. Type "I want a Collagen pedicure for my wedding party of 6 next Friday morning" and let the widget respond. That moment closes the deal more than any deck slide.

## Functional requirements

### What the widget collects

Four required fields, gathered conversationally (not as a form):

1. **Service(s) requested** — match against the salon's actual menu (pedicure tiers, manicures, gel, group, etc.)
2. **Preferred date & time window** — flexible (e.g., "Saturday morning" is fine, "Sat 4/26 between 9am and 12pm" is better)
3. **Party size** — default 1, support groups
4. **Contact** — name + phone OR email (phone preferred, this is small-town KS)

Optional capture:
- Specific technician request
- Add-ons (paraffin wax, hot herbal neck wrap)
- Notes ("first-time client", "allergies", etc.)

### What the widget does NOT do

- Does NOT actually book on a calendar (no Square/Vagaro/Acuity integration in v1)
- Does NOT send the request automatically anywhere
- Does NOT collect payment
- Does NOT promise availability

What it DOES at the end: generates a clean **"Booking Request Summary"** card with a single button: **"Send to Pittsburg Nail Spa"** which:
- **Primary action:** Opens the user's SMS app with a pre-filled text to (620) 715-0115 containing the full summary
- **Secondary action (button below):** "Or call now" → `tel:` link
- **Tertiary action (small text link):** "Email instead" → `mailto:` to the salon's address (verify on Google Business — if no email is published, omit this option)

This means **zero backend infrastructure**. The salon receives texts on their existing phone. We can upgrade to a real booking integration later as a paid add-on.

## Technical implementation

### File location
`/js/booking-widget.js` — single file, no dependencies beyond `fetch`.

### Where it appears
A dedicated section on `index.html` between Gallery and Visit. Not a popup, not a floating bubble. Section heading: **"Tell us what you'd like"**.

### Visual design
- Looks like a chat thread, not a chatbot. No avatar bubbles. No "AI" branding.
- Salon's messages: left-aligned, sage background, ink text
- Customer's input: a single text field at the bottom (textarea, autoresizing)
- Use the same type and tokens as the rest of the site — this should not look like a bolted-on widget
- Initial state: a single message from the salon + the input field. No typing indicators, no loading spinners that say "AI thinking" — if you must show a loading state, use a quiet pulsing dot.

### Initial message (hardcoded, no API call needed)

> Hi! Tell me what you're looking for and I'll put together a booking request for you. The more you can share — service, day, time, how many people — the easier it is for our team to confirm.

### API call

Use the Anthropic API endpoint described in the artifacts spec. Model: `claude-sonnet-4-20250514`. Max tokens: 1000.

**System prompt** (put this verbatim in the widget):

```
You are the booking assistant for Pittsburg Nail Spa, a neighborhood nail salon at 2004 N Broadway, Pittsburg, KS. Your job is to help customers prepare a clear booking request that the salon team can review and confirm by text or phone.

You are warm, brief, and practical. You speak the way the salon's owner would — friendly Kansas voice, no corporate fluff, no exclamation points beyond one in a greeting.

You collect four things, asking for whatever is missing:
1. Service(s) — the salon offers Refresh Pedicure ($40 cash / $40.80 card), Happy Feet Pedicure ($50/$51), Collagen Pedicure ($60/$61.20), all available with gel polish for $15 more. Add-ons: paraffin wax (+$10), hot herbal neck wrap (+$5). They also do manicures, gel, acrylic, dip powder, nail art, and a kids' Princess Menu for ages 10 and under.
2. Date and time — flexible windows are fine ("Saturday morning")
3. Party size — default 1
4. Name + phone (or email if they prefer)

Hours: Mon–Sat 9am–7pm, Sun 11am–5pm.

Once you have all four, respond with ONLY a JSON object in this exact format, no other text, no markdown fences:

{
  "complete": true,
  "summary": {
    "service": "string describing service(s) and add-ons",
    "datetime": "string describing requested date and time window",
    "party_size": number,
    "contact_name": "string",
    "contact_phone": "string or null",
    "contact_email": "string or null",
    "notes": "string or null — technician request, allergies, special occasion, etc."
  }
}

Until you have all four required pieces, respond conversationally with plain text — no JSON. Keep responses to 1-2 short sentences.

Never quote prices unless the customer asks — just confirm the service. Never promise availability. If asked about anything off-topic (directions, parking, products for sale), politely redirect: "Best to call the salon directly at (620) 715-0115 for that — they'll have the answer."
```

### Conversation state

Maintain the full message history client-side in a JS array. Send the entire history with every API call (the API is stateless). Cap the history at 20 turns — if exceeded, prepend a summary message and reset.

### Detecting completion

After every API response, attempt to `JSON.parse()` the trimmed response. If parsing succeeds AND the result has `complete: true`, render the booking summary card. Otherwise, render the response as a chat message.

Wrap the parse attempt in try/catch — if it fails, treat the response as a regular chat message.

### The booking summary card

Once `complete: true` is received, replace (or append below) the chat with a clean card:

```
┌──────────────────────────────────────┐
│  YOUR BOOKING REQUEST                │
├──────────────────────────────────────┤
│  Service:    Collagen pedicure +     │
│              paraffin wax            │
│  When:       Sat 4/26, morning       │
│  Party:      2 people                │
│  Name:       Brian M.                │
│  Phone:      (620) 555-0123          │
│  Notes:      First time at the spa   │
├──────────────────────────────────────┤
│  [  Send to salon by text  ]         │
│  [  Or call (620) 715-0115  ]        │
│  Edit request                         │
└──────────────────────────────────────┘
```

The "Send to salon by text" button builds a URL like:
```
sms:+16207150115?&body=<URL-encoded summary>
```

Pre-filled text body:
```
Hi! Booking request from your website:

Service: Collagen pedicure + paraffin wax
When: Sat 4/26, morning
Party: 2 people
Name: Brian M.
Phone: (620) 555-0123
Notes: First time at the spa

Please confirm when you can. Thanks!
```

"Edit request" button reverts to the chat with a final assistant message: "What would you like to change?"

### Error handling

- If the fetch call fails or times out (10s): show a small notice — "Our booking assistant is taking a break. Please call (620) 715-0115 or text us your request." Do NOT show stack traces or "API error".
- If the API returns an error response: same treatment.
- If the user types nothing and hits send: ignore.
- If the user spams 5+ messages in 30 seconds: rate-limit client-side with a polite "Give me a sec to catch up." message. (This protects against accidental cost runs since we have no auth in front of the API.)

### Cost note for the proposal

The Anthropic API is pay-per-use. At Sonnet 4 rates and ~5 turns per booking, each completed booking flow costs the salon roughly $0.02–0.05. **Mention this in the Kleos proposal as a transparent line item** — the salon should know what they're spending. Cap monthly usage at $20 in the proposal terms (4-500 booking flows/month, well above what a small salon needs).

## Testing checklist

Before declaring this done:

- [ ] Test on mobile Safari (most likely customer device)
- [ ] Test the SMS link actually opens Messages app on iPhone with the text pre-filled
- [ ] Test the SMS link opens default SMS app on Android
- [ ] Test what happens when the user types something off-topic ("what's your refund policy")
- [ ] Test what happens when the user gives all four pieces in one message — should jump straight to summary
- [ ] Test what happens with a deliberately weird request ("I want a tattoo") — should redirect politely
- [ ] Test with API key intentionally absent — should show graceful error
- [ ] Test rate limit (spam 6 messages fast)
- [ ] Verify history doesn't grow unbounded across many conversations
- [ ] Verify the booking summary card matches the visual style of the rest of the site

## Future upgrades (mention in pitch, don't build now)

- Real calendar integration (Square Appointments has a free tier the salon can adopt)
- Two-way confirmation: salon texts back, customer gets follow-up
- Returning customer recognition (cookie-based, not account)
- Spanish-language toggle (relevant in Crawford County)
- Voice input on mobile

These are the upsell hooks. Don't build them in v1. The pitch is "look what you get for free — imagine what we can do next."
