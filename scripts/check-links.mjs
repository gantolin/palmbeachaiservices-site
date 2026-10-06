// Link and button check: every link on every page, at desktop and phone widths.
// Usage: node scripts/check-links.mjs            (live site)
//        BASE=http://localhost:4321 node scripts/check-links.mjs
import { chromium, devices } from 'playwright-core';
import { SITE } from './site-facts.mjs';

const BASE = process.env.BASE ?? 'https://palmbeachaiservices.com';
const PAGES = ['/', '/services/', '/results/', '/about/', '/privacy/', '/terms/'];
const OLD_URLS = ['/book/', '/contact/', '/free-google-check/', '/free-teardown/'];
// A real phone profile: Calendly serves a blank frame to a bare narrow viewport.
const VIEWPORTS = { desktop: { viewport: { width: 1440, height: 900 } }, phone: devices['iPhone 14'] };

const problems = [];
const fail = (msg) => { problems.push(msg); console.log('  FAIL', msg); };

const browser = await chromium.launch({ channel: 'chrome' });
const fetched = new Map();
async function status(ctx, url) {
  if (!fetched.has(url)) {
    try { fetched.set(url, (await ctx.request.get(url, { maxRedirects: 5, timeout: 20000 })).status()); }
    catch (e) { fetched.set(url, `error ${e.message.split('\n')[0]}`); }
  }
  return fetched.get(url);
}

for (const [vpName, device] of Object.entries(VIEWPORTS)) {
  const ctx = await browser.newContext(device);
  const page = await ctx.newPage();
  // The Calendly frame logs its own errors (a reCAPTCHA 401 on iPhone); only this site's count.
  page.on('console', (m) => { if (m.type() === 'error' && m.location().url.startsWith(BASE)) fail(`[${vpName}] console error on ${page.url()}: ${m.text()}`); });
  page.on('pageerror', (e) => fail(`[${vpName}] page error on ${page.url()}: ${e.message}`));

  for (const path of PAGES) {
    const res = await page.goto(BASE + path, { waitUntil: 'load' });
    console.log(`\n[${vpName}] ${path} -> ${res.status()}`);
    if (res.status() !== 200) { fail(`[${vpName}] ${path} returned ${res.status()}`); continue; }

    // Open the phone menu so its links count as visible.
    const toggle = page.locator('[data-menu-toggle], button[aria-controls]').first();
    const hasToggle = vpName === 'phone' && await toggle.isVisible().catch(() => false);

    const links = await page.$$eval('a[href]', (as) => as.map((a) => {
      const r = a.getBoundingClientRect();
      const cs = getComputedStyle(a);
      return {
        href: a.getAttribute('href'), abs: a.href, text: (a.innerText || a.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 50),
        visible: r.width > 0 && r.height > 0 && cs.visibility !== 'hidden',
        // Is something else sitting on top of the link at its center?
        covered: (() => {
          if (!(r.width > 0 && r.height > 0)) return false;
          const x = r.left + r.width / 2, y = r.top + r.height / 2;
          if (x < 0 || y < 0 || x > innerWidth || y > innerHeight) return false;
          const top = document.elementFromPoint(x, y);
          return !!top && !a.contains(top) && !top.contains(a);
        })(),
      };
    }));

    const counts = { tel: 0, sms: 0, mailto: 0, internal: 0, external: 0 };
    for (const l of links) {
      const where = `[${vpName}] ${path} "${l.text}" (${l.href})`;
      if (l.covered) fail(`${where} is covered by another element`);
      if (l.href.startsWith('tel:')) {
        counts.tel++;
        if (l.href !== `tel:${SITE.phoneE164}`) fail(`${where} wrong tel link`);
      } else if (l.href.startsWith('sms:')) {
        counts.sms++;
        if (l.href !== `sms:${SITE.phoneE164}`) fail(`${where} wrong sms link`);
      } else if (l.href.startsWith('mailto:')) {
        counts.mailto++;
        if (l.href.toLowerCase() !== `mailto:${SITE.email}`.toLowerCase()) fail(`${where} wrong mailto link`);
      } else {
        const u = new URL(l.abs);
        const internal = u.origin === new URL(BASE).origin;
        counts[internal ? 'internal' : 'external']++;
        const s = await status(ctx, u.origin + u.pathname + u.search);
        if (s !== 200) fail(`${where} -> ${s}`);
        if (internal && u.hash) {
          const p = await ctx.newPage();
          await p.goto(u.origin + u.pathname, { waitUntil: 'domcontentloaded' });
          if (!(await p.$(`[id="${u.hash.slice(1)}"]`))) fail(`${where} target ${u.hash} does not exist on ${u.pathname}`);
          await p.close();
        }
      }
    }
    console.log('  links:', JSON.stringify(counts), '| visible:', links.filter((l) => l.visible).length, '/', links.length);
    for (const kind of ['tel:', 'sms:']) {
      const vis = links.filter((l) => l.href.startsWith(kind) && l.visible).map((l) => l.text);
      console.log(`  visible ${kind}`, JSON.stringify(vis));
    }

    if (hasToggle) {
      await toggle.click();
      await page.waitForTimeout(400);
      const menuLinks = await page.$$eval('a[href]', (as) => as.filter((a) => { const r = a.getBoundingClientRect(); return r.width > 0 && r.height > 0; }).length);
      console.log('  phone menu opens, visible links now:', menuLinks);
    } else if (vpName === 'phone') {
      console.log('  (no menu toggle found with the selector)');
    }
  }

  // Booking calendar on the home page
  await page.goto(BASE + '/', { waitUntil: 'load' });
  const src = await page.getAttribute('[data-booking-frame]', 'src');
  console.log(`\n[${vpName}] calendar iframe src: ${src}`);
  // The calendar only draws once it is on screen.
  await page.locator('[data-booking-frame]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(8000);
  const frame = page.frames().find((f) => f.url().includes('calendly.com'));
  if (!frame) fail(`[${vpName}] Calendly frame did not load`);
  else {
    const text = (await frame.locator('body').innerText().catch(() => '')).replace(/\s+/g, ' ');
    const days = await frame.locator('button[aria-label*="Times available"]').count().catch(() => 0);
    console.log(`  calendly title: ${await frame.title()} | bookable days shown: ${days}`);
    console.log(`  calendly text: ${text.slice(0, 220)}`);
    if (/not valid|unavailable|page not found|no longer/i.test(text)) fail(`[${vpName}] Calendly shows an error: ${text.slice(0, 120)}`);
    if (!days) fail(`[${vpName}] Calendly shows no bookable days`);
  }
  await page.screenshot({ path: `${process.env.SHOTS ?? '.'}/home-${vpName}.png` });

  // "Book a free call" from another page lands on the calendar
  await page.goto(BASE + '/about/', { waitUntil: 'load' });
  await page.locator('a[href="/#book"]:visible').first().click();
  await page.waitForURL('**/#book');
  await page.waitForTimeout(1200);
  const inView = await page.$eval('#book', (el) => { const r = el.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0; });
  console.log(`[${vpName}] Book a free call from /about/ -> ${page.url()} | calendar section on screen: ${inView}`);
  if (!inView) fail(`[${vpName}] #book is not on screen after clicking Book a free call`);

  // Old URLs still send people to the calendar
  for (const old of OLD_URLS) {
    const r = await page.goto(BASE + old, { waitUntil: 'load' });
    await page.waitForTimeout(1500);
    console.log(`[${vpName}] old ${old} -> ${r.status()} -> ${page.url()}`);
    if (!page.url().endsWith('/#book')) fail(`[${vpName}] old URL ${old} ended at ${page.url()}`);
  }
  await ctx.close();
}

await browser.close();
console.log(problems.length ? `\n${problems.length} PROBLEM(S):\n` + [...new Set(problems)].join('\n') : '\nAll links and buttons check out.');
process.exit(problems.length ? 1 : 0);
