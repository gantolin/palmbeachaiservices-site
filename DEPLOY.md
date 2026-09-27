# Launch checklist

**Status (2026-09-27): intentionally offline.** GitHub Pages is disabled, the apex/www DNS records are removed
(so nobody can claim the domain on GitHub while Pages is off), and the deploy workflow runs only when triggered manually.
Preview locally with `npm run dev` (http://localhost:4321).

DNS change files live outside the repo in `Claude\palm-beach-ai\launch\`:
`dns-restore-github.json` (put the site back), `dns-remove-github.json` (take it down), `dns-caa.json` (already applied).

## Already done
- [x] Name is Gene everywhere; public office address 172 Roycourt Circle, Royal Palm Beach, FL 33411
- [x] Tagline + positioning: "Get seen on Google. Get your time back with AI."
- [x] Offer renamed: Free Google Visibility Check (`/free-google-check/`); old `/free-teardown/` redirects
- [x] Booking: Calendly iframe on `/book/` and `/thanks/`, prefilled from the form
- [x] Form: Web3Forms (needs the key, below). Without a key the form skips sending and goes straight to booking
- [x] Security: CSP + referrer meta, domain transfer lock, WHOIS privacy, CAA (Let's Encrypt only), secret scanning + push protection, Dependabot alerts/fixes, main protected from force-push/deletion
- [x] SEO: keyword map (`docs/keyword-map.md`), 4 service pages, West Palm Beach page, contact page with map, 5 guides, Service/Article/FAQ/Breadcrumb/LocalBusiness schema, llms.txt

## Before launch (Gene)
- [ ] **Calendly:** in the new Gene@ account, create a 30-min event "Google Visibility Check" (phone call + Google Meet), set your hours, send the link. It goes in `SITE.bookingUrl` (`src/config/site.ts`).
- [ ] **Web3Forms key:** web3forms.com, enter Gene@palmbeachaiservices.com, copy the emailed key. Save as repo variable `PUBLIC_WEB3FORMS_KEY` (`gh variable set PUBLIC_WEB3FORMS_KEY -R gantolin/palmbeachaiservices-site`). The build fails without it, on purpose.
- [ ] **Phone:** confirm (561) 365-8443 is the number you want public (Google Voice?).
- [ ] **Google Business Profile** for Palm Beach AI Services at the Royal Palm Beach address. Name must be exactly "Palm Beach AI Services" (no keywords). Note: a different business named "Palm Beaches AI" already shows on Maps nearby.
- [ ] Founder photo (`public/images/founder.jpg` + `SITE.founderPhoto`), real testimonials, social links
- [ ] Attorney review of `/privacy/` and `/terms/`; A2P 10DLC registration before texting leads
- [ ] Optional: Google Analytics 4 property. Send the G- ID; it needs a CSP + privacy policy update

## Go live (about 10 minutes)
1. `gh api -X POST repos/gantolin/palmbeachaiservices-site/pages -f build_type=workflow` then
   `gh api -X PUT repos/gantolin/palmbeachaiservices-site/pages -f cname=palmbeachaiservices.com`
2. `aws route53 change-resource-record-sets --hosted-zone-id Z0295352LEXFK6D8P1I9 --change-batch file://C:/Users/Administrator/Claude/palm-beach-ai/launch/dns-restore-github.json`
3. Restore the `push:` trigger in `.github/workflows/pages.yml`, commit, push (or run the workflow manually).
4. Wait for the certificate (minutes to an hour), then `gh api -X PUT repos/gantolin/palmbeachaiservices-site/pages -F https_enforced=true`.
5. Verify the domain in GitHub (Settings > Pages > Verified domains) to prevent takeover.
6. Search Console: add a Domain property, submit `https://palmbeachaiservices.com/sitemap-index.xml`, request indexing for the home, service, West Palm Beach and guide pages.
7. Bing Webmaster Tools: import from Search Console.
8. Test the form end to end (email arrives at Gene@, Calendly prefilled, booking confirmation).
