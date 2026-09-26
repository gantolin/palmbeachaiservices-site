# Launch checklist

Hosting: **GitHub Pages** from `gantolin/palmbeachaiservices-site` (public). Workflow: `.github/workflows/pages.yml`.

## 1. Repo + Pages (done by the agent)
- [x] Repo `gantolin/palmbeachaiservices-site`, pushed to `main`
- [x] Secret scan of the full history (gitleaks + pattern grep): clean
- [x] Repo made public (free-plan Pages requirement, approved by Gino)
- [x] Pages enabled with source = GitHub Actions; custom domain `palmbeachaiservices.com`; `public/CNAME`

## 2. DNS in Route 53 (Gino, since the agent has no AWS access)
- [ ] Apex `palmbeachaiservices.com` **A**: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
- [ ] Apex **AAAA** (recommended): `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
- [ ] `www` **CNAME** → `gantolin.github.io`
- [ ] Remove any conflicting old apex/www records
- [ ] After the certificate is issued (minutes to about an hour after DNS resolves): enable **Enforce HTTPS** in Settings → Pages
- [ ] Optional: verify the domain in GitHub account settings → Pages → Verified domains

## 3. Leads (later)
- [ ] Lambda from `lambda/lead/` + Function URL, CORS = `https://palmbeachaiservices.com`, GHL Private Integration token in SSM/Secrets Manager
- [ ] Repo variable `PUBLIC_LEAD_ENDPOINT` = the Function URL, then re-run the Pages workflow

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
