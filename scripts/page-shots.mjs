// Quick visual check: screenshots the top of key pages from the dev/preview server into OUT (default: temp dir).
// Usage: node scripts/page-shots.mjs   (server on :4321)
import { chromium } from 'playwright-core';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const BASE = process.env.BASE ?? 'http://localhost:4321';
const OUT = process.env.OUT ?? tmpdir();
const pages = [
  ['/', 'home'], ['/services/', 'services'], ['/results/', 'results'], ['/about/', 'about'],
];
const b = await chromium.launch({ channel: 'chrome' });
const p = await b.newPage({ viewport: { width: 1440, height: 1000 } });
const errs = [];
p.on('console', (m) => { if (m.type() === 'error') errs.push(`${p.url()} :: ${m.text().slice(0, 160)}`); });
for (const [path, name] of pages) {
  await p.goto(BASE + path, { waitUntil: 'load' });
  await p.waitForTimeout(2500);
  await p.screenshot({ path: join(OUT, `pbai-${name}.png`) });
}
console.log(errs.length ? errs.join('\n') : 'no console errors');
await b.close();
