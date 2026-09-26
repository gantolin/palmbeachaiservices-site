# palmbeachaiservices.com

The marketing site for **Palm Beach AI Services**: websites, local SEO + Google Business Profile, and AI automation for Palm Beach County home-service businesses.

- **Stack:** Astro 5 (static output) · Tailwind CSS v4 (`@tailwindcss/vite`) · TypeScript (strict) · `@astrojs/sitemap` · self-hosted Fontsource fonts. No client framework: the interactive bits are small inline scripts.
- **Output:** plain static files in `dist/`, served from S3 + CloudFront (recommended) or Amplify Hosting.
- **Node:** 20.x works (Astro 5). If you move to Astro 6+, use Node 22.

## Commands
```bash
npm install
npm run dev            # http://localhost:4321 (testimonial placeholders are visible in dev only)
npm run build          # astro check (types) + static build -> dist/
npm run build:fast     # build without type check
npm run preview        # serve dist/ locally
npm run screenshots    # needs preview running; writes screenshots/*.png (PAGES="/,/pricing/" to limit)
npm run copy:export    # regenerate docs/copy.md from dist/
npm run assets         # regenerate favicons + OG image (uses local Chrome)
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
| Us-vs-agency table, industries | `src/data/comparison.ts` |
| Services | `src/data/services.ts` |
| Design tokens, components, motion | `src/styles/global.css` |
| Legal (privacy, terms, SMS, guarantee terms) | `src/pages/privacy.astro`, `src/pages/terms.astro` |

Copy uses `*word*` in data strings to render the italic-serif accent (`src/lib/text.ts`).

## Leads → GoHighLevel
Both forms (`/free-teardown/`, `/free-playbook/`) `POST` JSON to **`PUBLIC_LEAD_ENDPOINT`**. The value is inlined at build time: `.env` locally, a repo variable in CI.

- The payload includes form fields, `type` (`teardown` | `playbook`), `plan`, the page, UTM + gclid/fbclid, the two SMS consent booleans, and the exact consent text + timestamp. A honeypot field is dropped client-side.
- **TODO:** deploy `lambda/lead/` (Node 20 Lambda + Function URL, CORS restricted to the site origin). It upserts the contact in GHL (Private Integration token in Secrets Manager/SSM), tags it, maps custom fields, and fires the text-back/booking workflow. See `lambda/lead/README.md`.
- If the endpoint is empty (e.g. local dev), the form logs the payload and still goes to `/thanks/`, so the flow can be tested.
- **Booking:** set `SITE.bookingUrl` to the GHL calendar URL, and `/thanks/?type=teardown` embeds it. Until then, the page says we'll text a link.

## Deploy: AWS S3 + CloudFront (recommended)
The CI workflow is in `.github/workflows/deploy.yml`. It builds on every push/PR. On `main`, it assumes an AWS role via **GitHub OIDC** (no stored keys), `aws s3 sync`s `dist/`, and invalidates CloudFront. The deploy job is skipped until `AWS_ROLE_ARN` is set.

**GitHub repo variables** (Settings → Secrets and variables → Actions → *Variables*):
| Variable | Example |
|---|---|
| `AWS_ROLE_ARN` | `arn:aws:iam::123456789012:role/palmbeachaiservices-site-deploy` |
| `AWS_REGION` | `us-east-1` |
| `S3_BUCKET` | `palmbeachaiservices-site` |
| `CLOUDFRONT_DISTRIBUTION_ID` | `E1ABCDEF...` |
| `PUBLIC_LEAD_ENDPOINT` | `https://xxxx.lambda-url.us-east-1.on.aws/` |

**One-time AWS setup:**
1. **S3 bucket** (private, Block Public Access ON, no website hosting). CloudFront reads it via **Origin Access Control**.
2. **ACM certificate in `us-east-1`** for `palmbeachaiservices.com` + `www.palmbeachaiservices.com` (DNS validation in Route 53).
3. **CloudFront distribution**:
   - Origin = the S3 bucket with OAC (apply the bucket policy CloudFront generates). Default root object `index.html`.
   - Viewer protocol = redirect HTTP→HTTPS. HTTP/2+3. Compression on. `CachingOptimized` policy.
   - Alternate names = apex + www, with the ACM cert.
   - **CloudFront Function** (viewer request) = `infra/cloudfront-function.js`. It handles www→apex 301, `/path` → `/path/`, and `/path/` → `/path/index.html`.
   - **Custom error responses:** 403 and 404 → `/404.html` with response code 404.
   - **Response headers policy:** HSTS, nosniff, frame-options, referrer-policy, CSP. See `infra/security-headers.md`.
4. **Route 53:** hosted zone for the domain. A/AAAA **alias** records for the apex and www → the distribution. (If the domain is registered elsewhere, point its nameservers at the zone.)
5. **GitHub OIDC:**
   - Create the IAM OIDC provider `token.actions.githubusercontent.com` (audience `sts.amazonaws.com`).
   - Create role `palmbeachaiservices-site-deploy` with trust policy `infra/github-oidc-trust-policy.json` (edit `OWNER/palmbeachaiservices-site`) and permissions `infra/deploy-role-policy.json` (edit bucket name, account ID, distribution ID).
6. Set the repo variables above, then push to `main`.

Caching: `_astro/*` (hashed) is uploaded with `max-age=31536000, immutable`. HTML and other files get `max-age=0, must-revalidate`. Every deploy invalidates `/*`.

## Deploy: Amplify Hosting (simpler alternative)
1. Amplify console → *Host web app* → connect the GitHub repo, branch `main`.
2. Build settings: `npm ci` / `npm run build`, artifact dir `dist`.
3. Environment variable `PUBLIC_LEAD_ENDPOINT`.
4. Rewrites: `/<*>` → `/404.html` (404). Add a www → apex 301 redirect.
5. Custom domain: add `palmbeachaiservices.com` (Amplify issues the cert and, with Route 53, creates the records).
6. Delete or disable `.github/workflows/deploy.yml` deploy job (Amplify builds on push itself).

## Before launch (open TODOs)
See **DEPLOY.md** for the checklist. The content TODOs are listed there too (founder photo, final logo, testimonials, booking URL, etc.).

## Docs
- `docs/site-plan.md`: page-by-page plan, conversion flows, content rules.
- `docs/copy.md`: every word on every page (generated from the build).
- `DEPLOY.md`: launch checklist.
