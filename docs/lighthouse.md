# Lighthouse (local, Sep 26, 2026)

Lighthouse 12, headless Chrome, against `astro preview` (http://127.0.0.1:4321). Mobile = default throttled mobile; desktop = `--preset=desktop`.

| Page | Device | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|---|
| `/` | Mobile | 97 | 100 | 100 | 100 |
| `/` | Desktop | 100 | 100 | 100 | 100 |
| `/pricing/` | Mobile | 98 | 100 | 100 | 100 |
| `/pricing/` | Desktop | 100 | 100 | 100 | 100 |
| `/results/safe-haven-inspections/` | Mobile | 99 | 100 | 100 | 100 |
| `/results/safe-haven-inspections/` | Desktop | 100 | 100 | 100 | 100 |

Home, mobile: FCP 1.8 s · LCP 2.1 s · TBT 0 ms · CLS 0.001. Production on CloudFront (HTTP/2+3, Brotli, edge caching) should be at least as fast.

Rerun:
```bash
npm run build && npm run preview &
npx lighthouse http://127.0.0.1:4321/ --chrome-flags="--headless=new" --only-categories=performance,accessibility,best-practices,seo
```
