# Guide writing brief (shared by every guide)

You are writing ONE long-form guide for palmbeachaiservices.com, the website of Palm Beach AI Services.
Write exactly one file: `src/content/guides/<slug>.md`. Do not edit any other file in the repo.

## The business (facts you may use, and ONLY these about the business)
- Palm Beach AI Services, founder-run by **Gene** (first name only on the site). Office: 172 Roycourt Circle, Royal Palm Beach, FL 33411. Phone (561) 365-8443. Serves Palm Beach County (Royal Palm Beach, Wellington, West Palm Beach, Loxahatchee, Greenacres, Lake Worth Beach, Palm Beach Gardens, Jupiter, Boynton Beach, Delray Beach, Boca Raton) plus Martin and Broward counties.
- Tagline: **Get seen on Google. Get your time back with AI.**
- Who we help: home service businesses (HVAC, plumbing, roofing, pavers/hardscape, pest control, landscaping, pressure washing, pool service, inspections, electricians).
- Offer: one plan. $750 one-time website build, then $297/month, month-to-month, no contract, client owns everything. Monthly includes review automation, Google Business Profile management, lead follow-up (incl. missed-call text-back), monthly check-in, backlink/citation building, competitor analysis. Custom AI (GoHighLevel CRM setup, custom AI workflows, AI answering service) is quoted per project.
- Promise: live in 14 days from content + access, or month one is free. We never guarantee rankings, leads, or revenue.
- Real results (use exactly as written, never embellish or round):
  - **Safe Haven Inspections** (mold inspection): a custom AI automation cut inspection report time from 45 minutes to 10 minutes per report (78% less).
  - **Hero's Pavers** (Lake Worth Beach pavers/hardscape): SEO website rebuild + Google Business Profile optimization; now ranks #2 to #3 on Google for multiple Lake Worth keywords.
  - **Next Level Air Conditioning** (Lake Worth HVAC): had 31 five-star reviews yet did not appear in the top 20 Google Maps results in 4 live searches in its own area (Aug 2026). Its profile had 1 photo, no description, no services, 1 category; the site had 5 pages. In Sept 2026 we rebuilt the site to 30+ pages (including 15 city pages) and rebuilt the profile (categories, description, service areas). Results still in progress; do NOT claim ranking gains for Next Level.
- Free offer: "The Free Google Visibility Check": we check where a business shows up on Google Maps and search in its town, compare its profile and website to the top 3, and show what to fix first. Form at `/free-google-check/`, or book a call directly at `/book/`.

## Voice and hard rules
- Write like a sharp, friendly local operator talking to a busy contractor. Short sentences. Plain English. Concrete examples from home service trades. "We" for the company, "you" for the reader.
- **No em dashes (—) anywhere.** Use periods, commas, colons, or parentheses. En dashes only in number ranges.
- **American spelling only** (optimize, center, color).
- Must read human, not AI: no "In today's digital landscape", "unlock", "leverage", "game-changer", "delve", "elevate", "navigate the complexities", no rhetorical "The result?" pairs, no triplet-adjective padding, no closing "In conclusion".
- **No invented statistics.** Any number that is not from the facts above must come from a primary or reputable source (Google's own docs at support.google.com / developers.google.com, BrightLocal, Whitespark's Local Search Ranking Factors, Harvard Business Review, InsideSales/MIT lead response study, etc.), linked inline, and you must open the page with WebFetch to confirm it says what you claim. If you cannot verify a number, leave it out.
- Be accurate about Google: e.g., Google says local ranking is based on relevance, distance, and prominence (support.google.com/business/answer/7091). Do not claim Google ranks on things it has said it does not. Do not recommend anything against Google Business Profile guidelines (no keyword-stuffed business names, no fake addresses, no review gating, no incentivized reviews).
- Never mention the founder having another job.

## Format
Frontmatter must match `src/content.config.ts` exactly:
```
---
metaTitle: "..."          # 50-60 chars, target keyword near the front
description: "..."        # 140-160 chars
title: "..."              # the H1; contains the keyword naturally
keyword: "..."
lede: "..."               # 1-2 sentences under the H1
pillar: "Get seen on Google"   # or "Get your time back with AI"
published: 2026-09-27
updated: 2026-09-27
relatedService: "google-maps-seo"   # google-maps-seo | websites | ai-automation | ai-answering-service
faqs:
  - q: "..."
    a: "..."              # under 70 words each, 3-6 FAQs, not repeating body text verbatim
---
```
Body (markdown):
- 1,400 to 2,200 words. Do NOT include an H1 in the body (the layout renders `title`). Use `##` H2s and `###` H3s. The keyword (or a close variant) appears in the first 100 words and in at least one H2.
- Open with the answer, not a warm-up. Put a short "quick answer" or numbered checklist near the top so Google can lift it.
- Use numbered steps / short lists where they genuinely help. Tables are fine in markdown.
- Weave in 1-2 of the real results above where relevant, with an internal link: `/results/safe-haven-inspections/`, `/results/heros-pavers/`, `/results/next-level-air-conditioning/`.
- Internal links you may use (only these): `/`, `/services/google-maps-seo/`, `/services/websites/`, `/services/ai-automation/`, `/services/ai-answering-service/`, `/seo-company-west-palm-beach/`, `/pricing/`, `/results/`, `/free-google-check/`, `/book/`, `/contact/`, and the other guides: `/guides/local-seo-for-contractors/`, `/guides/how-to-rank-higher-on-google-maps/`, `/guides/how-to-get-more-google-reviews/`, `/guides/speed-to-lead/`, `/guides/how-much-does-seo-cost/`. Use 3-6 internal links total, with descriptive anchor text (never "click here").
- End with a short section inviting the reader to get the free Google Visibility Check (`/free-google-check/`) or book a call (`/book/`), written naturally, no hype.

## When done, reply with (under 200 words)
File path, word count, the target keyword placement (H1 / first 100 words / H2), every external source URL you cited and confirmed, and anything you were unsure about.
