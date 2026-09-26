# CloudFront Response Headers Policy (recommended)

Create a custom Response Headers Policy and attach it to the default behavior:

- Strict-Transport-Security: `max-age=63072000; includeSubDomains; preload`
- X-Content-Type-Options: `nosniff`
- Referrer-Policy: `strict-origin-when-cross-origin`
- X-Frame-Options: `SAMEORIGIN`
- Permissions-Policy: `camera=(), microphone=(), geolocation=()`
- Content-Security-Policy (adjust when you add analytics / the GHL calendar):
  `default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; font-src 'self'; connect-src 'self' https://*.lambda-url.us-east-1.on.aws; frame-src https://api.leadconnectorhq.com https://link.msgsndr.com; base-uri 'self'; form-action 'self'`

Astro inlines small scripts/styles, hence `'unsafe-inline'`. Tighten with hashes later if desired.
