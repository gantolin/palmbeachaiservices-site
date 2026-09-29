// Usage: npm run build && npx astro preview --port 4321 & node scripts/screenshots.mjs [baseUrl]
// Takes hero (viewport) + full-page screenshots at 1440 and 390 wide using the system Chrome.
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';

const base = process.argv[2] ?? 'http://localhost:4321';
const out = new URL('../screenshots/', import.meta.url).pathname;
mkdirSync(out, { recursive: true });
const pages = (process.env.PAGES ?? '/,/book/,/results/safe-haven-inspections/').split(',');
const viewports = [
  { name: 'desktop', width: 1440, height: 900, deviceScaleFactor: 1 },
  { name: 'mobile', width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
];
const slug = (p) => (p === '/' ? 'home' : p.replace(/^\/|\/$/g, '').replace(/\//g, '-'));

const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH ?? '/usr/bin/google-chrome',
  args: ['--no-sandbox', '--font-render-hinting=none'],
});
const settle = async (page) => {
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1400); // let the hero intro play
  // The phone demo replays a live sequence (~13s); capture it with the full thread on screen.
  if (await page.$('[data-phone-demo]')) await page.waitForTimeout(12200);
};
for (const vp of viewports) {
  // Hero shots at full device scale
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: vp.deviceScaleFactor, isMobile: vp.isMobile, hasTouch: vp.hasTouch });
  const page = await ctx.newPage();
  for (const p of pages) {
    await page.goto(base + p, { waitUntil: 'networkidle' });
    await settle(page);
    await page.screenshot({ path: `${out}${slug(p)}-${vp.name}-hero.png` });
  }
  await ctx.close();
  // Full-page shots at 1x (Chrome cannot rasterize pages taller than ~16k device px at 2x)
  const fctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 1, isMobile: vp.isMobile, hasTouch: vp.hasTouch });
  const fpage = await fctx.newPage();
  for (const p of pages) {
    await fpage.goto(base + p, { waitUntil: 'networkidle' });
    await settle(fpage);
    // Reveal everything for the full-page capture (scroll-triggered content)
    await fpage.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 50)); }
      document.querySelectorAll('[data-reveal], .cta-bloom').forEach((el) => el.classList.add('is-in'));
      // The fixed mobile action bar would be stamped mid-page in a full-page capture
      document.querySelectorAll('.mobile-bar').forEach((el) => (el.style.display = 'none'));
      window.scrollTo(0, 0);
    });
    await fpage.waitForTimeout(900);
    await fpage.screenshot({ path: `${out}${slug(p)}-${vp.name}-full.png`, fullPage: true });
    console.log('saved', slug(p), vp.name);
  }
  await fctx.close();
}
await browser.close();
