// Brand assets from the traced logo (brand/traced/*.json, made by scripts/trace-logo.py):
//   public/brand/*.svg + *.png (lockups, mark, plate), favicon set, apple-touch-icon, PWA icons, OG image.
// Run: node scripts/make-assets.mjs   (needs local Chrome; set CHROME_PATH if not /usr/bin/google-chrome)
import { chromium } from 'playwright-core';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const root = new URL('..', import.meta.url).pathname;
const NAVY = '#062D59'; // sampled from the supplied logo PNG
const NAVY_950 = '#030E1D';
const WHITE = '#FFFFFF';
const mark = JSON.parse(readFileSync(`${root}brand/traced/mark.json`, 'utf8'));
const word = JSON.parse(readFileSync(`${root}brand/traced/wordmark.json`, 'utf8'));
mkdirSync(`${root}public/brand`, { recursive: true });
mkdirSync(`${root}public/og`, { recursive: true });

// Lockup geometry keeps the original spacing between the pin and the wordmark.
const LX = mark.x, LY = Math.min(mark.y, word.y);
const LW = +(word.x + word.width - LX).toFixed(1);
const LH = +(Math.max(mark.y + mark.height, word.y + word.height) - LY).toFixed(1);
const markPath = (fill) => `<path fill="${fill}" fill-rule="evenodd" transform="translate(${(mark.x - LX).toFixed(1)} ${(mark.y - LY).toFixed(1)})" d="${mark.d}"/>`;
const wordPath = (fill) => `<path fill="${fill}" fill-rule="evenodd" transform="translate(${(word.x - LX).toFixed(1)} ${(word.y - LY).toFixed(1)})" d="${word.d}"/>`;
const title = '<title>Palm Beach AI Services</title>';

const lockup = (fill) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${LW} ${LH}" width="${LW}" height="${LH}" role="img">${title}${markPath(fill)}${wordPath(fill)}</svg>`;
const markOnly = (fill) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${mark.width} ${mark.height}" width="${mark.width}" height="${mark.height}" role="img">${title}<path fill="${fill}" fill-rule="evenodd" d="${mark.d}"/></svg>`;
// Navy plate like the original artwork (rounded rectangle, white art)
const PAD_X = 110, PAD_Y = 80;
const plate = () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${LW + PAD_X * 2} ${LH + PAD_Y * 2}" width="${LW + PAD_X * 2}" height="${LH + PAD_Y * 2}" role="img">${title}<rect width="100%" height="100%" rx="40" fill="${NAVY}"/><g transform="translate(${PAD_X} ${PAD_Y})">${markPath(WHITE)}${wordPath(WHITE)}</g></svg>`;
// Square icon: white pin on a navy tile. `scale` = mark height as a share of the tile.
const icon = (size, { rounded = true, scale = 0.7 } = {}) => {
  const h = mark.height, w = mark.width, S = h / scale;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${S.toFixed(1)} ${S.toFixed(1)}"${size ? ` width="${size}" height="${size}"` : ''}><rect width="100%" height="100%" ${rounded ? `rx="${(S * 0.22).toFixed(1)}"` : ''} fill="${NAVY}"/><path fill="${WHITE}" fill-rule="evenodd" transform="translate(${((S - w) / 2).toFixed(1)} ${((S - h) / 2).toFixed(1)})" d="${mark.d}"/></svg>`;
};

const files = {
  'brand/logo-lockup-white.svg': lockup(WHITE), // for dark backgrounds
  'brand/logo-lockup-navy.svg': lockup(NAVY), // for light backgrounds
  'brand/logo-mark-white.svg': markOnly(WHITE),
  'brand/logo-mark-navy.svg': markOnly(NAVY),
  'brand/logo-plate.svg': plate(),
  'favicon.svg': icon(null, { scale: 0.74 }),
};
for (const [p, svg] of Object.entries(files)) writeFileSync(`${root}public/${p}`, svg + '\n');
writeFileSync(`${root}brand/lockup-geometry.json`, JSON.stringify({ width: LW, height: LH, ratio: +(LW / LH).toFixed(4) }, null, 2));

const font = (p) => `data:font/woff2;base64,${readFileSync(`${root}node_modules/${p}`).toString('base64')}`;
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const page = await browser.newPage();
const shot = async (svg, w, h, path, bg = 'transparent') => {
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(`<html><body style="margin:0;background:${bg}">${svg.replace(/ width="[\d.]+" height="[\d.]+"/, '').replace('<svg ', `<svg width="${w}" height="${h}" `)}</body></html>`);
  await page.screenshot({ path: `${root}public/${path}`, omitBackground: bg === 'transparent' });
};

// Favicons + app icons
await shot(icon(null, { scale: 0.78 }), 32, 32, 'favicon-32.png');
await shot(icon(null, { scale: 0.8 }), 16, 16, 'favicon-16.png');
await shot(icon(null, { rounded: false, scale: 0.62 }), 180, 180, 'apple-touch-icon.png', NAVY); // iOS rounds corners itself
await shot(icon(null, { rounded: false, scale: 0.56 }), 192, 192, 'icon-192.png', NAVY); // maskable-safe
await shot(icon(null, { rounded: false, scale: 0.56 }), 512, 512, 'icon-512.png', NAVY);
// Raster logo versions (transparent), for email signatures, GBP, social profiles
const pw = 1600, ph = Math.round((pw * LH) / LW);
await shot(lockup(NAVY), pw, ph, 'brand/logo-lockup-navy.png');
await shot(lockup(WHITE), pw, ph, 'brand/logo-lockup-white.png');
await shot(plate(), pw, Math.round((pw * (LH + PAD_Y * 2)) / (LW + PAD_X * 2)), 'brand/logo-plate.png');
await shot(markOnly(NAVY), Math.round((512 * mark.width) / mark.height), 512, 'brand/logo-mark-navy.png');
await shot(icon(null, { rounded: false, scale: 0.62 }), 800, 800, 'brand/logo-square-800.png', NAVY); // social avatars

// OG image (1200x630)
await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(`<!doctype html><html><head><style>
@font-face{font-family:Geist;src:url(${font('@fontsource-variable/geist/files/geist-latin-wght-normal.woff2')}) format('woff2');font-weight:100 900}
@font-face{font-family:Serif;font-style:italic;src:url(${font('@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2')}) format('woff2')}
@font-face{font-family:JBMono;src:url(${font('@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2')}) format('woff2');font-weight:100 900}
*{box-sizing:border-box}body{margin:0;width:1200px;height:630px;overflow:hidden;font-family:Geist;color:#f4f1e8;
background:radial-gradient(110% 90% at 85% 115%,#1a4d88 0%,${NAVY} 30%,#061f3f 55%,${NAVY_950} 85%)}
.wrap{position:absolute;inset:0;padding:60px 72px;display:flex;flex-direction:column}
.brand svg{height:92px;width:auto;display:block}
h1{margin:auto 0 0;font-size:84px;line-height:1;letter-spacing:-.04em;font-weight:590;max-width:1000px}
em{font-family:Serif;font-weight:400;color:#d9b84a;letter-spacing:-.01em;font-size:1.08em}
.row{margin-top:34px;display:flex;gap:28px;font-family:JBMono;font-size:17px;letter-spacing:.08em;text-transform:uppercase;color:#e6cd83}
.row span{display:flex;align-items:center;gap:10px}.row span:before{content:"";width:8px;height:8px;border-radius:50%;background:#c9a227}
.line{position:absolute;left:0;right:0;bottom:0;height:3px;background:linear-gradient(90deg,transparent,#e6cd83,transparent);opacity:.7}
</style></head><body><div class="wrap">
<div class="brand">${lockup(WHITE).replace(/ width="[\d.]+" height="[\d.]+"/, '')}</div>
<h1>Turn Google searches into <em>booked</em> jobs.</h1>
<div class="row"><span>Websites</span><span>Google Business Profile</span><span>AI automation</span></div>
</div><div class="line"></div></body></html>`);
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);
await page.screenshot({ path: `${root}public/og/default.png` });
await browser.close();
console.log('brand assets written', { LW, LH });
