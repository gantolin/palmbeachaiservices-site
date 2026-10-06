// Link preview image (public/og/default.png, 1200x630): what shows when the site link is texted or
// shared. It mirrors the first screen of the home page. Run: node scripts/make-og.mjs
import { chromium } from 'playwright-core';
import { readFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);
const read = (p) => readFileSync(new URL(p, root));
const font = (p) => `data:font/woff2;base64,${read(`node_modules/${p}`).toString('base64')}`;
// The gold-pin lockup, without its shine animation (a still image cannot show it mid-sweep).
const logo = read('public/brand/logo-lockup-gold.svg').toString()
  .replace(/<use href="#pin" fill="url\(#shine\)"\/>/, '')
  .replace(/ width="[\d.]+" height="[\d.]+"/, '');
const pin = 'M12 2C7.6 2 4 5.6 4 10c0 6 8 12 8 12s8-6 8-12c0-4.4-3.6-8-8-8z';

const html = `<!doctype html><html><head><style>
@font-face{font-family:Geist;src:url(${font('@fontsource-variable/geist/files/geist-latin-wght-normal.woff2')}) format('woff2');font-weight:100 900}
@font-face{font-family:Inter;src:url(${font('@fontsource-variable/inter/files/inter-latin-wght-normal.woff2')}) format('woff2');font-weight:100 900}
*{box-sizing:border-box}
body{margin:0;width:1200px;height:630px;overflow:hidden;font-family:Geist;color:#f4f1e8;
  background:radial-gradient(110% 90% at 85% 115%,#1a4d88 0%,#062d59 30%,#061f3f 55%,#030e1d 85%)}
.wrap{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding-bottom:10px}
.brand svg{height:210px;width:auto;display:block}
.tag{margin-top:46px;font:500 38px/1.2 Inter;letter-spacing:-.01em;color:#e6cd83}
.line{position:absolute;left:0;right:0;bottom:0;height:4px;background:linear-gradient(90deg,transparent,#e6cd83,transparent);opacity:.7}
</style></head><body><div class="wrap">
<div class="brand">${logo}</div>
<div class="tag">Get found on Google. Get hours back with AI.</div>
</div>
<div class="line"></div></body></html>`;

const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);
await page.screenshot({ path: new URL('public/og/default.png', root).pathname.replace(/^\/([A-Za-z]:)/, '$1') });
await browser.close();
console.log('wrote public/og/default.png');
