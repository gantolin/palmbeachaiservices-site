// Generates favicons + the default Open Graph image with headless Chrome.
// Run: node scripts/make-assets.mjs   (re-run after changing the logo or the OG copy)
import { chromium } from 'playwright-core';
import { readFileSync, mkdirSync } from 'node:fs';

const root = new URL('..', import.meta.url).pathname;
const svg = readFileSync(`${root}public/favicon.svg`, 'utf8');
const font = (p) => `data:font/woff2;base64,${readFileSync(`${root}node_modules/${p}`).toString('base64')}`;
mkdirSync(`${root}public/og`, { recursive: true });

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH ?? '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const page = await browser.newPage();

for (const [name, size] of [['favicon-32.png', 32], ['apple-touch-icon.png', 180], ['icon-192.png', 192], ['icon-512.png', 512]]) {
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(`<html><body style="margin:0;background:transparent">${svg.replace('<svg ', `<svg width="${size}" height="${size}" `)}</body></html>`);
  await page.screenshot({ path: `${root}public/${name}`, omitBackground: true });
}

await page.setViewportSize({ width: 1200, height: 630 });
await page.setContent(`<!doctype html><html><head><style>
@font-face{font-family:Geist;src:url(${font('@fontsource-variable/geist/files/geist-latin-wght-normal.woff2')}) format('woff2');font-weight:100 900}
@font-face{font-family:Serif;font-style:italic;src:url(${font('@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2')}) format('woff2')}
@font-face{font-family:JBMono;src:url(${font('@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2')}) format('woff2');font-weight:100 900}
*{box-sizing:border-box}body{margin:0;width:1200px;height:630px;overflow:hidden;font-family:Geist;color:#f4f1e8;
background:radial-gradient(120% 90% at 50% 120%,#447a4c 0%,#355e3b 18%,#1b3420 45%,#0f1f14 75%)}
.wrap{position:absolute;inset:0;padding:64px 72px;display:flex;flex-direction:column}
.brand{display:flex;align-items:center;gap:16px;font-size:24px;font-weight:620;letter-spacing:-.02em}
.brand small{display:block;font-family:JBMono;font-size:13px;letter-spacing:.16em;opacity:.7;font-weight:500;margin-top:4px}
h1{margin:auto 0 0;font-size:84px;line-height:1;letter-spacing:-.04em;font-weight:590;max-width:980px}
em{font-family:Serif;font-weight:400;color:#c9a227;letter-spacing:-.01em;font-size:1.08em}
.row{margin-top:34px;display:flex;gap:28px;font-family:JBMono;font-size:17px;letter-spacing:.08em;text-transform:uppercase;color:#e6cd83}
.row span{display:flex;align-items:center;gap:10px}.row span:before{content:"";width:8px;height:8px;border-radius:50%;background:#c9a227}
.line{position:absolute;left:0;right:0;bottom:0;height:2px;background:linear-gradient(90deg,transparent,#e6cd83,transparent);opacity:.6}
</style></head><body><div class="wrap">
<div class="brand">${svg.replace('<svg ', '<svg width="52" height="52" ')}<div>Palm Beach<small>AI SERVICES</small></div></div>
<h1>Turn Google searches into <em>booked</em> jobs.</h1>
<div class="row"><span>Websites</span><span>Google Business Profile</span><span>AI automation</span></div>
</div><div class="line"></div></body></html>`);
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(300);
await page.screenshot({ path: `${root}public/og/default.png` });
await browser.close();
console.log('assets written');
