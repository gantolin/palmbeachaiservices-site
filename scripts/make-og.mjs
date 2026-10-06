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
.wrap{position:absolute;inset:0;padding:56px 72px 60px;display:flex;flex-direction:column}
.brand svg{height:96px;width:auto;display:block}
.kicker{margin-top:auto;font:600 27px/1.3 Inter;color:#e6cd83}
h1{margin:14px 0 0;font-size:78px;line-height:1.08;letter-spacing:-.035em;font-weight:590;white-space:nowrap}
mark{display:inline-block;line-height:1;background:linear-gradient(100deg,#c9a227,#e2c25a 55%,#c9a227);color:#030e1d;padding:.04em .14em .08em;margin:0 -.06em;border-radius:.16em}
.art{position:absolute;right:86px;top:250px;width:262px;height:262px}
.tile{position:absolute;inset:0;border-radius:22%;overflow:hidden;border:2px solid rgba(230,205,131,.5);
  box-shadow:0 40px 70px -30px rgba(0,0,0,.85),0 0 90px -20px rgba(201,162,39,.55)}
.tile svg{width:100%;height:100%;display:block}
.pin{position:absolute;left:50%;top:50%;width:46%;transform:translate(-50%,-100%);filter:drop-shadow(0 12px 10px rgba(0,0,0,.45))}
.ring{position:absolute;left:50%;top:50%;width:34%;aspect-ratio:2.4;border-radius:50%;transform:translate(-50%,-50%);border:4px solid rgba(234,67,53,.85)}
.chip{position:absolute;right:-22px;bottom:-14px;display:flex;align-items:center;gap:9px;padding:11px 20px 11px 16px;border-radius:999px;
  background:#fff;color:#202124;font:600 25px/1 Inter;box-shadow:0 16px 30px -10px rgba(0,0,0,.6)}
.chip svg{width:24px;height:24px}
.line{position:absolute;left:0;right:0;bottom:0;height:4px;background:linear-gradient(90deg,transparent,#e6cd83,transparent);opacity:.7}
</style></head><body><div class="wrap">
<div class="brand">${logo}</div>
<div class="kicker">SEO and AI marketing agency in Royal Palm Beach, FL</div>
<h1>Get found on Google.<br>Get <mark>hours back</mark><br>every week.</h1>
</div>
<div class="art">
  <div class="tile"><svg viewBox="0 0 120 120" preserveAspectRatio="xMidYMid slice">
    <rect width="120" height="120" fill="#0b2a50"/>
    <path d="M92 0C84 30 104 62 94 120H120V0Z" fill="#12467f"/>
    <rect x="10" y="12" width="26" height="20" rx="4" fill="#12553f" opacity=".75"/>
    <ellipse cx="58" cy="100" rx="20" ry="10" fill="#12553f" opacity=".75"/>
    <g fill="none" stroke="rgba(255,255,255,.16)" stroke-width="3" stroke-linecap="round">
      <path d="M-4 40H92"/><path d="M22 -4V124"/><path d="M70 -4V124"/><path d="M-4 86L92 78"/><path d="M46 40V84"/>
    </g>
    <path d="M-4 62H96" fill="none" stroke="#c9a227" stroke-width="3.5" stroke-linecap="round" opacity=".9"/>
  </svg></div>
  <span class="ring"></span>
  <svg class="pin" viewBox="0 0 24 24"><path d="${pin}" fill="#ea4335"/><circle cx="12" cy="10" r="3.2" fill="#fff"/></svg>
  <span class="chip"><svg viewBox="0 0 24 24" fill="none" stroke="#4285f4" stroke-width="2.4" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.6-3.6"/></svg>near me</span>
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
