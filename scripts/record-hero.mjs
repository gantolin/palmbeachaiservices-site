// Records a ~11s clip of the home hero + first scroll with Playwright's built-in video, then
// converts it to MP4 + GIF with ffmpeg. Usage: node scripts/record-hero.mjs [baseUrl]
import { chromium } from 'playwright-core';
import { execFileSync } from 'node:child_process';
import { mkdirSync, readdirSync, rmSync } from 'node:fs';
const base = process.argv[2] || 'http://127.0.0.1:4321';
const tmp = '/tmp/pbai-video';
rmSync(tmp, { recursive: true, force: true }); mkdirSync(tmp, { recursive: true });
const size = { width: 1440, height: 900 };
const browser = await chromium.launch({ executablePath: process.env.CHROME || '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const ctx = await browser.newContext({ viewport: size, recordVideo: { dir: tmp, size } });
const page = await ctx.newPage();
const t0 = Date.now();
await page.goto(base + '/', { waitUntil: 'domcontentloaded' });
const start = (Date.now() - t0) / 1000;
await page.mouse.move(420, 380);
// Glide the cursor across the hero (spotlight + parallax), then onto the phone (tilt)
const mark = (l) => console.log(l, ((Date.now() - t0) / 1000 - start).toFixed(2) + 's');
mark('loaded');
for (let i = 0; i <= 20; i++) { await page.mouse.move(420 + i * 28, 380 + Math.sin(i / 3) * 90); await page.waitForTimeout(30); }
for (let i = 0; i <= 12; i++) { await page.mouse.move(980 + i * 12, 420 - i * 8); await page.waitForTimeout(30); }
mark('pointer done');
while ((Date.now() - t0) / 1000 - start < 3.8) await page.waitForTimeout(100);
mark('scroll start');
// Smooth scroll through the ticker, proof stats and into the next section
await page.evaluate(async () => {
  const dur = 5200, to = 1150, from = scrollY, s = performance.now();
  await new Promise((res) => {
    const step = (t) => { const p = Math.min(1, (t - s) / dur); const e = p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2; scrollTo({ top: from + (to - from) * e, behavior: 'instant' }); p < 1 ? requestAnimationFrame(step) : res(); };
    requestAnimationFrame(step);
  });
});
mark('scroll end');
await page.waitForTimeout(1500);
await ctx.close();
await browser.close();
const webm = `${tmp}/${readdirSync(tmp).find((f) => f.endsWith('.webm'))}`;
const out = new URL('../screenshots/', import.meta.url).pathname;
const ss = Math.max(0, start - 0.1).toFixed(2);
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', ss, '-i', webm, '-t', '12', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '20', '-preset', 'slow', '-movflags', '+faststart', '-an', `${out}home-hero-scroll.mp4`]);
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', ss, '-i', webm, '-t', '12', '-vf', 'fps=12,scale=720:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=128:stats_mode=diff[p];[b][p]paletteuse=dither=bayer:bayer_scale=4:diff_mode=rectangle', `${out}home-hero-scroll.gif`]);
console.log('saved', `${out}home-hero-scroll.mp4`, `${out}home-hero-scroll.gif`);
