# palmbeachaiservices.com

The marketing site for **Palm Beach AI Services**: websites, local SEO + Google Business Profile, and AI automation for Palm Beach County home-service businesses.

- **Stack:** Astro 5 (static output) · Tailwind CSS v4 (`@tailwindcss/vite`) · TypeScript (strict) · `@astrojs/sitemap` · self-hosted Fontsource fonts. No client framework: the interactive bits are small inline scripts.
- **Output:** plain static files in `dist/`, published to **GitHub Pages** at https://palmbeachaiservices.com (AWS S3 + CloudFront scaffolding kept in `infra/aws/` as an alternative).
- **Node:** 20.x works (Astro 5). If you move to Astro 6+, use Node 22.

## Commands
```bash
npm install
npm run dev            # http://localhost:4321 (testimonial placeholders are visible in dev only)
npm run build          # astro check (types) + static build -> dist/
npm run build:fast     # build without type check
npm run preview        # serve dist/ locally
npm run screenshots    # needs preview running; writes screenshots/*.png (PAGES="/,/pricing/" to limit)
node scripts/smoke-booking.mjs  # needs preview running; form -> booking flow + CSP check
node scripts/page-shots.mjs     # quick screenshots of key pages
npm run copy:export    # regenerate docs/copy.md from dist/
npm run record         # needs preview running + ffmpeg; records screenshots/home-hero-scroll.mp4/.gif
npm run assets         # regenerate logo SVG/PNGs, favicons, app icons + OG image from brand/traced (uses local Chrome)
```

## Where to edit things
| What | File |
|---|---|
| Founder first name (single constant) | `src/config/site.ts` → `FOUNDER_FIRST_NAME` |
| Phone, email, address, service areas, socials, booking link, founder photo | `src/config/site.ts` → `SITE` |
| Nav + CTA labels, teardown offer name | `src/config/site.ts` → `NAV`, `CTA` |
| **Prices** ($750 build `BUILD_FEE`, $297/mo `MONTHLY`), plan name, the 6 included items, build scope, Custom AI strip, guarantee, promises | `src/data/pricing.ts`. Hero, home pricing, /pricing, FAQs, meta descriptions, JSON-LD, service notes, and the comparison table all read from it |
| Case studies (+ "show the math" lines) | `src/data/caseStudies.ts` |
| Testimonials (hidden in prod until real) | `src/data/testimonials.ts`: add to `realTestimonials` to publish |
| FAQs | `src/data/faq.ts` |
| Guides (long-form SEO articles) | `src/content/guides/*.md` (schema in `src/content.config.ts`, brief in `docs/guide-brief.md`) |
| Which page targets which search | `docs/keyword-map.md` |
| Us-vs-agency table, industries | `src/data/comparison.ts` |
| Services | `src/data/services.ts` |
| Design tokens (navy/gold system), components, motion | `src/styles/global.css`, `src/scripts/motion.ts` (see docs/site-plan.md → Motion system) |
| Logo + favicons + OG image | `brand/` (source PNG + traced paths), `scripts/trace-logo.py`, `scripts/make-assets.mjs` → `public/brand/`, `public/favicon*`, `public/og/` |
| Legal (privacy, terms, SMS, guarantee terms) | `src/pages/privacy.astro`, `src/pages/terms.astro` |

Copy uses `*word*` in data strings to render the italic-serif accent (`src/lib/text.ts`).

## Leads + booking
- The Google check form (`/free-google-check/`) posts to **Web3Forms**, which emails each lead to Gene@. The access key comes from the `PUBLIC_WEB3FORMS_KEY` repo variable (`.env` locally); it is public by design. CI fails if it is missing.
- After the form, `/thanks/` embeds the **Calendly** event (`SITE.bookingUrl`) as a plain iframe, prefilled with name, email, phone and business notes from sessionStorage (no personal info in URLs). `/book/` embeds the same calendar for people who skip the form.
- `lambda/lead/` (GoHighLevel webhook) is not used; it is kept as a future option.

## Deploy: GitHub Pages (current hosting)
`.github/workflows/pages.yml` builds and publishes on every push to `main` (and on manual runs). It follows the same pattern as the Safe Haven site:
- Actions are pinned to commit SHAs.
- The top-level permissions are read-only.
- A **build** job (`npm ci`, `npm run build`, output checks, `upload-pages-artifact`) runs first, then a **deploy** job with `pages: write` + `id-token: write` (`deploy-pages`).
- The build job never gets `id-token: write`.

- **Repo:** `gantolin/palmbeachaiservices-site` (public, because free-plan Pages requires it). Pages source = **GitHub Actions**.
- **Custom domain:** `public/CNAME` = `palmbeachaiservices.com` (copied into `dist/`), and the Pages custom domain is set to the same. `astro.config.mjs` has `site: 'https://palmbeachaiservices.com'`, so canonical URLs, the sitemap, and OG URLs use the apex domain.
- **Not-found pages:** GitHub Pages serves `dist/404.html` automatically. `/pricing/` style URLs work because the build emits `pricing/index.html`.
- **Repo variable (optional):** `PUBLIC_LEAD_ENDPOINT` (Settings → Secrets and variables → Actions → Variables).

**DNS (Route 53 hosted zone for palmbeachaiservices.com):**

| Name | Type | Value |
|---|---|---|
| `palmbeachaiservices.com` (apex) | A | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` |
| `palmbeachaiservices.com` (apex) | AAAA (recommended) | `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153` |
| `www.palmbeachaiservices.com` | CNAME | `gantolin.github.io` |

After DNS resolves, GitHub issues the HTTPS certificate automatically. Then turn on **Enforce HTTPS** (Settings → Pages, or `gh api -X PUT repos/gantolin/palmbeachaiservices-site/pages -F https_enforced=true`). Remove any old A/AAAA/ALIAS records for the apex and www that point elsewhere. Optionally verify the domain for the account (Settings → Pages → Verified domains) to prevent takeover.

**Limits to know about:** GitHub Pages can't set custom response headers (CSP/HSTS beyond GitHub's defaults) or server-side redirects. Canonical tags point to the apex, and GitHub redirects `www` → apex automatically once both records exist.

## Alternative hosting: AWS S3 + CloudFront (not active)
If hosting ever moves to AWS, everything is ready in `infra/aws/`:
- `deploy-s3-cloudfront.yml.example`: a GitHub OIDC → S3 sync + CloudFront invalidation workflow. Copy it into `.github/workflows/` and disable Pages.
- `cloudfront-function.js`: www→apex, `/path` → `/path/index.html`.
- `github-oidc-trust-policy.json`, `deploy-role-policy.json`: the IAM deploy role.
- `security-headers.md`: the CloudFront response headers policy.

You'd need: a private S3 bucket + CloudFront with OAC, an ACM cert in us-east-1, Route 53 alias records, 403/404 → `/404.html`, and repo variables `AWS_ROLE_ARN`, `AWS_REGION`, `S3_BUCKET`, `CLOUDFRONT_DISTRIBUTION_ID`.

## Before launch (open TODOs)
See **DEPLOY.md** for the checklist. The content TODOs are listed there too (founder photo, testimonials, booking URL, etc.).

## Docs
- `docs/site-plan.md`: page-by-page plan, conversion flows, content rules.
- `docs/copy.md`: every word on every page (generated from the build).
- `DEPLOY.md`: launch checklist.
