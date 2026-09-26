# Launch checklist

Nothing has been pushed or deployed. Suggested repo name: **`palmbeachaiservices-site`** (private).

## 1. Repo
- [ ] Create a GitHub repo `palmbeachaiservices-site`. Then `git remote add origin … && git push -u origin main`.
- [ ] Edit `infra/github-oidc-trust-policy.json` → replace `OWNER` with the GitHub org/user.

## 2. AWS (one time; details in README)
- [ ] S3 bucket (private, Block Public Access on), e.g. `palmbeachaiservices-site`
- [ ] ACM cert in **us-east-1** for apex + www (DNS-validated)
- [ ] CloudFront distribution + **OAC** + bucket policy, default root `index.html`, HTTPS redirect, compression
- [ ] CloudFront Function `infra/cloudfront-function.js` on viewer-request
- [ ] Error responses: 403/404 → `/404.html` (404)
- [ ] Response headers policy (`infra/security-headers.md`)
- [ ] Route 53 hosted zone + A/AAAA alias for apex and www
- [ ] IAM OIDC provider `token.actions.githubusercontent.com` + role `palmbeachaiservices-site-deploy` (`infra/*.json`)
- [ ] (Leads) Lambda from `lambda/lead/` + Function URL, CORS = `https://palmbeachaiservices.com`, GHL Private Integration token in SSM/Secrets Manager

## 3. GitHub repo variables
- [ ] `AWS_ROLE_ARN`, `AWS_REGION` (`us-east-1`), `S3_BUCKET`, `CLOUDFRONT_DISTRIBUTION_ID`, `PUBLIC_LEAD_ENDPOINT`

## 4. Content Gino must supply / confirm
- [ ] Founder first name: site uses **Gino** (`FOUNDER_FIRST_NAME`); the email is `Gene@…`. Confirm which name goes public.
- [ ] Founder photo → `public/` + `SITE.founderPhoto`
- [x] Logo: official navy logo vectorized and in use (`public/brand/`); a designer's original vector file (SVG/AI/EPS) would be even cleaner if one exists
- [ ] Real testimonials (with permission) → `realTestimonials`; owner quotes + before/after screenshots for case studies
- [ ] Hero's Pavers: the exact Lake Worth keywords + a ranking screenshot
- [ ] Next Level: trade/business description; update when results exist
- [ ] GHL calendar link → `SITE.bookingUrl`
- [ ] Playbook: the actual PDF/email sequence + final chapter list
- [ ] Social profile URLs, ZIP/street (or service-area-only) for NAP, business hours
- [ ] Plan name ("The Local Growth Plan"), and exactly what the $750 build covers (`plan.build.items`)
- [ ] Is missed-call text-back part of "lead follow-up" in the $297 plan? (The site currently says yes, and the hero demo shows it.)
- [ ] If a client already has a good website, do they still pay the $750? (The site doesn't address it yet.)
- [ ] Is hosting/SSL included in the $297? (The site doesn't mention hosting.)
- [ ] Build-fee refund terms (the Terms say they're "confirmed in writing before work begins")
- [ ] Policy decisions: "live in 14 days or month one is free" wording + terms (`/terms/#guarantee`); website ownership on cancel; messaging usage pass-through; "you'll hear back from Gino personally"

## 5. Compliance
- [ ] Attorney review of `/privacy/` and `/terms/`
- [ ] A2P 10DLC brand + campaign registration in GHL (the consent language and opt-in screenshots are ready on `/free-teardown/`)
- [ ] Google Analytics / Tag Manager / Meta pixel: none installed. If added, update the privacy policy + CSP.

## 6. Go live
- [ ] Push to `main` → Actions builds + deploys → check `https://palmbeachaiservices.com`
- [ ] Submit `https://palmbeachaiservices.com/sitemap-index.xml` in Google Search Console. Link the site from the Google Business Profile.
- [ ] Test both forms end to end (lead shows in GHL, text-back fires, STOP works)
