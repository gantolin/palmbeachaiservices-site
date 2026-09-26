# Palm Beach AI Services: site plan

**Goal:** turn Palm Beach County home-service owners into booked **Free Palm Beach Teardown** calls. The secondary goal is capturing earlier-stage visitors with the **Free Playbook**, whose thank-you page leads back to booking.

**Positioning:** a founder-run, local shop with ONE simple plan ($750 one-time website build + $297/mo, month-to-month). "Three things, done right, live in 30 days." The client owns everything. Our proof is small but real, and we show the math.

**Voice:** plain, confident, owner-to-owner. No buzzwords, no hype stats.

**Brand:** navy + gold (a classic Palm Beach pairing), on cream/sand off-white. See "Brand system" below.

## Brand system
- **Logo:** Gino's official lockup (a white pin with a palm tree plus the "Palm Beach AI Services" serif wordmark on navy). The source PNG is in `brand/source/`. It is vectorized with potrace (`scripts/trace-logo.py` → `brand/traced/*.json`), and `scripts/make-assets.mjs` (`npm run assets`) writes:
  - `public/brand/logo-lockup-white.svg|png`: for dark backgrounds (header, footer)
  - `public/brand/logo-lockup-navy.svg|png`: for light backgrounds
  - `public/brand/logo-mark-white.svg`, `logo-mark-navy.svg|png`: the pin + palm mark alone
  - `public/brand/logo-plate.svg|png`: the original navy-plate version, and `logo-square-800.png` (social avatars, JSON-LD logo)
  - `favicon.svg`, `favicon.ico` (16+32), `favicon-16/32.png`, `apple-touch-icon.png` (180), `icon-192/512.png` (maskable-safe), and `og/default.png` (1200×630)
- **Colors** (tokens in `src/styles/global.css`):

| Token | Hex | Role |
|---|---|---|
| `navy-950` | `#030E1D` | Near-black navy: darkest sections (hero, how-it-works, final CTA, footer), theme-color |
| `navy-925` | `#05152A` | Dark layering |
| `navy-900` | `#061F3F` | Announcement bar, dark cards |
| `navy-800` | `#062D59` | **Logo navy** (sampled from the PNG): brand surfaces, favicon/app-icon tiles, OG |
| `navy-700` | `#0E3D72` | Navy accent on light backgrounds: links, icons, italic accents, navy buttons |
| `navy-600` / `navy-500` | `#1A4D88` / `#2B609E` | Mid navy: glows, gradients, borders on dark |
| `navy-300` / `100` / `50` | `#8EA9CB` / `#DCE5F1` / `#EEF3F9` | Tints: chips, table highlight, icon wells |
| `gold-500` / `400` / `300` / `700` | `#C9A227` / `#D4B24C` / `#E6CD83` / `#8A6A12` | CTAs, highlights, accents on dark; gold-700 for gold text on light |
| `cream-50` / `sand-100` / `stone-300` | `#FAF8F2` / `#F1ECDF` / `#D9D3C4` | Light sections and borders |
| `ink-900` / `ink-600` | `#121A26` / `#525C6B` | Cool neutral text on light |
| `mist-200` / `mist-400` | `#E6E9F0` / `#9FB0C7` | Text on dark |

- **Contrast (WCAG AA, computed):** ink-900 on cream is 16.5:1. Ink-600 is 6.4:1 on cream, 5.7:1 on sand, and 6.8:1 on white. Navy-700 is 10.3:1 on cream and 8.6:1 on navy-100. Gold-700 on cream is 4.8:1. On dark: mist-200 on navy-950 is 15.9:1, mist-400 is 8.8:1 on navy-950 and 6.2:1 on the logo navy, and gold-300 is 12.4:1 on navy-950 and 8.8:1 on the logo navy. Gold-500 buttons with navy-950 text are 8.0:1.
- **Typography:** Geist (headings), Inter (body), JetBrains Mono (labels), plus **Instrument Serif italic** for one accent word per headline (gold on navy, navy on cream). The logo's bold serif wordmark is used only as the traced logo artwork. It is not a web font, so it isn't loaded, and it doesn't compete with headings. The light italic serif accent echoes it, so the logo and headlines feel like one family without a second heavy serif.

## Hard content rules (enforced in code/data)
- **Only real facts.** Safe Haven: 45 → 10 min, 78%. Hero's Pavers: #2–#3 on Google for Lake Worth keywords. Next Level: just launched, results in progress. No invented stats, reviews, logos, or quotes.
- **No uncited industry stats.** Examples: "84%", "5.3x", "$5.44 ROI". The missed-call calculator only uses numbers the visitor enters, and it is labeled as an estimate.
- **No fake scarcity, no countdowns, no review-count promises, no ranking or revenue guarantees.** The capacity line ("limited clients per trade, per town") is a real policy. It has no numbers and no timers.
- **Founder name** lives only in `FOUNDER_FIRST_NAME` (`src/config/site.ts`).
- **Testimonials** come from `src/data/testimonials.ts`. Placeholders render only in `astro dev`, and the section is omitted from production builds until `realTestimonials` has entries.
- The day job is never mentioned.

## Conversion system
| Entry | Where | Flow |
|---|---|---|
| Free Palm Beach Teardown (primary) | Hero, sticky header, mobile action bar, every section CTA, service/case pages | `/free-teardown/`, a 2-step form. Step 1 is business + 3 qualifiers (revenue band, decision-makers, biggest headache). Step 2 is contact + 2 separate, unchecked SMS consent boxes. Then `/thanks/?type=teardown`, which is step 3: book a time (GHL calendar embed once `bookingUrl` is set; until then "we'll text you a link"). |
| Free Playbook (secondary) | Final CTA (every page that uses it), footer | `/free-playbook/`, a stepped opt-in: name → email → phone (optional) + SMS consent. Then `/thanks/?type=playbook`, which offers the teardown booking. |
| Call / text | Header, mobile bar, footer, final CTA | `tel:` / `sms:` links to (561) 365-8443 |
| Custom AI quote | "Custom AI automation, quoted per project" strip under the plan | Links to the teardown with `?plan=custom-ai` (captured as a hidden `plan` field; the main plan CTA sends `?plan=local-growth`) |

All forms POST JSON to `PUBLIC_LEAD_ENDPOINT` (a Lambda → GoHighLevel, scaffold in `lambda/lead/`). They include a honeypot, UTM, gclid/fbclid, the page, and a consent text snapshot plus timestamp (for A2P 10DLC records).

## Pages
| Route | Purpose | Key sections |
|---|---|---|
| `/` | Home | Hero (headline, dual CTA, **$750 + $297/mo price ticket**, teardown offer line, trust ticks, phone-thread demo, 2 floating proof cards), proof strip (real numbers only), Problem + missed-call calculator, **Three things, live in 30 days** (arrow chain + 3 illustrated cards + industries), How it works (4 sticky steps), **Pricing** (single plan card + "What your $297/mo covers" 6-item checklist with what each replaces + "Your $750 build includes" + unpriced Custom AI strip), **Case studies directly below pricing** ("The proof behind the price", proof cards with the math), **Us vs a typical agency** comparison, **Palm Beach Promise** guarantee, Testimonials (dev only), Founder note (signed), FAQ (opens with "How much does it cost?"), Final CTA |
| `/services/` | Services hub | 3 service cards, Three things, comparison, CTA |
| `/services/websites/` | Service | Hero, what you get, process, related case study, pricing link, FAQ, CTA |
| `/services/local-seo-google-business-profile/` | Service | Same pattern; Hero's Pavers proof |
| `/services/ai-automation/` | Service | Same pattern; Safe Haven proof, missed-call demo |
| `/results/` | Results hub | 3 case cards and an honest "results vary" note |
| `/results/safe-haven-inspections/` | Case study | Challenge → what we built → result (45 → 10 min, 78%, math shown) |
| `/results/heros-pavers/` | Case study | #2–#3 for Lake Worth keywords (TODO: exact keywords, screenshots) |
| `/results/next-level/` | Case study | Rebuilt, results in progress (no numbers) |
| `/pricing/` | Pricing | Single plan + included checklist + build scope + Custom AI strip (all from `src/data/pricing.ts`), delivery promises, **case studies right below**, guarantee, comparison, pricing FAQ (cost, what the $750 covers, what the $297 covers, contract, fees, custom AI, cancel) |
| `/about/` | About | Founder story (first name via constant), values, local area, signed note |
| `/free-teardown/` | Primary lead magnet | What you get, "you keep the fixes whether or not we work together", qualifying form, founder note |
| `/free-playbook/` | Secondary lead magnet | Chapter list (TODO: final), stepped opt-in |
| `/thanks/` | Post-submit (noindex) | Teardown: booking step. Playbook: delivery + teardown upsell |
| `/privacy/`, `/terms/` | Legal | Privacy, Terms, `#guarantee`, `#sms` (SMS program terms: STOP/HELP, frequency, rates, no sharing of mobile numbers) |
| `/404` | Not found | Links home, pricing, teardown |

## Pricing (single source: `src/data/pricing.ts`)
One plan, no tiers, no toggle. The earlier Get Found/Growth/Automate tiers, the GBP Kickstart, and annual billing have been removed.

- **$750 one-time** custom website build (`BUILD_FEE`). Covers a custom mobile-first design, service pages + main town page, click-to-call/quote form/structured data, Google Business Profile connected and cleaned up, and Analytics + Search Console. Live in 14 days from content (the same 14-day promise as the guarantee).
- **$297/month** (`MONTHLY`): month-to-month, no contract. Includes exactly 6 things: **review automation, Google Business Profile management, lead follow-up, monthly check-in, backlink building, competitor analysis + ranking improvement.** Each item shows a qualitative "Replaces: ..." line (no invented dollar values).
- **Custom AI automation, quoted per project** (no price shown): CRM/GoHighLevel setup, custom AI workflows (e.g. the Safe Haven report system), AI Workday Install.
- **Where the price appears:** hero price ticket, home pricing section heading + card, `/pricing/` hero + card, home and pricing FAQs, meta descriptions, JSON-LD offers, service-page price notes, the comparison table, `llms.txt`. All of these read `BUILD_FEE`, `MONTHLY`, and `priceLine` from the data file.
- **Guarantee (delivery only):** your website, Google profile cleanup, and review + lead follow-up automations are live in 14 days of content + access, or month one ($297) is free. Leave anytime, keep everything. No ranking or revenue promises.
- **Premium treatment of a lower price:** the plan is shown as one gold-edged dark card with large type, a checklist that explains the value, and real case studies directly beneath. No "cheap" badges, discounts, or countdowns.

## SEO
- Per-page title/description/canonical/OG/Twitter.
- JSON-LD: `ProfessionalService` (LocalBusiness) with areaServed + OfferCatalog, `WebSite`, `FAQPage` (home, pricing, services), `BreadcrumbList`.
- `@astrojs/sitemap` (excludes /thanks and /404), `robots.txt`, `llms.txt`, web manifest, and a generated 1200×630 OG image.
- Local keywords are woven into copy: Palm Beach County, Royal Palm Beach, Wellington, West Palm Beach, Lake Worth, and the trade names.

## Performance / a11y
- Static HTML, self-hosted fonts (preloaded, `font-display: swap`), and almost no JS (small inline islands).
- Motion is gated behind `.js` + `prefers-reduced-motion`.
- Semantic landmarks, labeled fields, visible focus rings, 44px tap targets.
