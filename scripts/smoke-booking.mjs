// Smoke test: Google check form -> /thanks/ -> Calendly iframe prefilled, and no CSP violations on key pages.
// Usage: npm run preview (port 4321) in one terminal, then: node scripts/smoke-booking.mjs
import { chromium } from 'playwright-core';

const BASE = process.env.BASE ?? 'http://localhost:4321';
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage();
const problems = [];
page.on('console', (m) => { if (m.type() === 'error') problems.push(`console: ${m.text()}`); });
page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));

for (const path of ['/', '/services/websites/', '/results/hvac-contractor/', '/book/', '/privacy/']) {
  const res = await page.goto(BASE + path, { waitUntil: 'load' });
  console.log(path, res.status(), '|', await page.title());
}

// Form flow
await page.goto(BASE + '/free-google-check/?utm_source=test', { waitUntil: 'load' });
await page.fill('#check-website', 'testpavers.example');
await page.click('[data-step="0"] [data-next]');
await page.fill('#check-name', 'Test Person');
await page.fill('#check-business', 'Test Pavers LLC');
await page.selectOption('#check-trade', { index: 1 });
await page.selectOption('#check-town', 'Wellington');
await page.fill('#check-phone', '5615550123');
await page.fill('#check-email', 'test@example.com');
await Promise.all([page.waitForURL('**/thanks/**'), page.click('[data-submit]')]);
const src = await page.getAttribute('[data-booking-frame]', 'src');
const u = new URL(src);
console.log('iframe host:', u.host, '| name:', u.searchParams.get('name'), '| email:', u.searchParams.get('email'), '| location:', u.searchParams.get('location'));
console.log('a1:', JSON.stringify(u.searchParams.get('a1')));
await page.waitForTimeout(6000);
const frame = page.frames().find((f) => f.url().includes('calendly.com'));
console.log('calendly frame loaded:', !!frame, frame ? (await frame.title()) : '');
await page.screenshot({ path: process.env.SHOT ?? 'thanks.png', fullPage: false });

console.log(problems.length ? 'PROBLEMS:\n' + problems.join('\n') : 'No console errors or CSP violations.');
await browser.close();
