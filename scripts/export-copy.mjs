// Regenerates docs/copy.md from the BUILT site so the copy doc always matches what ships.
// Usage: npm run build && node scripts/export-copy.mjs
import { parse } from 'node-html-parser';
import { readFileSync, writeFileSync, readdirSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
const order = ['/', '/services/', '/services/google-maps-seo/', '/services/websites/', '/services/ai-automation/',
  '/services/ai-answering-service/', '/seo-company-west-palm-beach/', '/seo-company-wellington/', '/seo-company-palm-beach-gardens/',
  '/seo-company-jupiter/', '/seo-company-boynton-beach/', '/seo-company-delray-beach/', '/seo-company-boca-raton/',
  '/results/', '/pricing/', '/about/', '/free-google-check/', '/book/', '/contact/', '/thanks/', '/privacy/', '/terms/', '/404/'];

const walk = (d) => readdirSync(d).flatMap((f) => (statSync(join(d, f)).isDirectory() ? walk(join(d, f)) : [join(d, f)]));
const files = walk(dist).filter((f) => f.endsWith('.html'));
const route = (f) => { const r = '/' + relative(dist, f).replace(/index\.html$/, '').replace(/\.html$/, '/'); return r; };
const pages = files.map((f) => ({ f, r: route(f) })).sort((a, b) => (order.indexOf(a.r) + 1 || 99) - (order.indexOf(b.r) + 1 || 99));

const clean = (s) => s.replace(/\s+/g, ' ').replace(/&amp;/g, '&').replace(/&#39;/g, "'").replace(/&quot;/g, '"').trim();
const text = (el) => clean(el.structuredText ?? el.text);
const hidden = (el) => { for (let n = el; n; n = n.parentNode) { if (n.getAttribute?.('aria-hidden') === 'true' || n.classList?.contains('sr-only') || n.classList?.contains('hp')) return true; } return false; };

function render(node, out) {
  for (const el of node.childNodes) {
    if (el.nodeType !== 1) continue;
    const tag = el.tagName?.toLowerCase();
    if (['script', 'style', 'svg', 'noscript', 'iframe', 'template'].includes(tag) || hidden(el)) continue;
    if (tag === 'section') { out.push('', `---`, ''); render(el, out); continue; }
    if (/^h[1-4]$/.test(tag)) { const t = text(el); if (t) out.push('', `${'#'.repeat(Number(tag[1]) + 1)} ${t}`, ''); continue; }
    if (tag === 'p' || tag === 'blockquote' || tag === 'figcaption' || tag === 'caption' || tag === 'output') { const t = text(el); if (t) out.push(t, ''); continue; }
    if (tag === 'li') { const t = text(el); if (t) out.push(`- ${t}`); continue; }
    if (tag === 'details') { const q = el.querySelector('summary'); const a = el.querySelector('p'); out.push(`- **Q: ${q ? text(q) : ''}**`, `  A: ${a ? text(a) : ''}`); continue; }
    if (tag === 'table') {
      const rows = el.querySelectorAll('tr').map((tr) => tr.querySelectorAll('th,td').filter((c) => !c.classList.contains('md:hidden')).map((c) => text(c) || ' '));
      const good = rows.filter((r) => r.length > 1);
      if (good.length) { out.push('', `| ${good[0].join(' | ')} |`, `|${good[0].map(() => '---').join('|')}|`, ...good.slice(1).map((r) => `| ${r.join(' | ')} |`), ''); }
      continue;
    }
    if (tag === 'a' && /\bbtn\b|link-mono/.test(el.getAttribute('class') ?? '')) { const t = text(el); if (t) out.push(`[Button: ${t}](${el.getAttribute('href')})`, ''); continue; }
    if (tag === 'button') { const t = text(el); if (t) out.push(`[Button: ${t}]`, ''); continue; }
    if (tag === 'label' || tag === 'legend') { if (el.querySelector('input[type=checkbox],input[type=radio]')) { out.push(`- [ ] ${text(el)}`); continue; } const t = text(el); if (t) out.push(`*Field:* ${t}`); continue; }
    if (tag === 'select') { out.push(`  Options: ${el.querySelectorAll('option').map((o) => text(o)).filter(Boolean).join(' / ')}`); continue; }
    if (tag === 'dt') { out.push(`**${text(el)}:** ${el.nextElementSibling ? text(el.nextElementSibling) : ''}`); continue; }
    if (tag === 'dd') continue;
    // leaf-ish div/span with direct text (eyebrows, stats, card titles)
    const direct = el.childNodes.filter((c) => c.nodeType === 3).map((c) => c.text).join('').trim();
    if (direct && ['div', 'span', 'a', 'strong'].includes(tag) && !el.querySelector('p,h1,h2,h3,h4,li,div,table,form')) { out.push(text(el), ''); continue; }
    render(el, out);
  }
}

const lines = [
  '# Palm Beach AI Services: site copy (all pages)',
  '',
  '> Generated from the production build by `scripts/export-copy.mjs`, so this is exactly what ships.',
  '> To change words, edit the source (mostly `src/data/*.ts`, `src/config/site.ts`, and `src/components/sections/*`), rebuild, and re-run the script.',
  '> Items marked TODO need Gene. The Testimonials section is hidden in production until real quotes exist (see `src/data/testimonials.ts`).',
  '',
];

// Global chrome once
const home = parse(readFileSync(join(dist, 'index.html'), 'utf8'));
lines.push('## Global elements (every page)', '');
lines.push(`**Announcement bar:** ${clean(home.querySelector('.announce')?.text ?? '')}`, '');
lines.push(`**Header nav:** ${home.querySelectorAll('nav[aria-label=Main] a').map((a) => text(a)).join(' · ')} · Call (561) 365-8443 · [Button: Free Google check]`, '');
lines.push(`**Mobile action bar:** ${home.querySelectorAll('.mobile-bar a').map((a) => text(a)).join(' · ')}`, '');
const footerOut = []; render(home.querySelector('footer'), footerOut);
lines.push('**Footer:**', '', ...footerOut.filter((l) => l !== '---'), '');

for (const { f, r } of pages) {
  const doc = parse(readFileSync(f, 'utf8').replace(/<br\s*\/?>/g, ' '));
  if (!doc.querySelector('main')) continue; // meta-refresh redirect stubs
  const title = clean(doc.querySelector('title')?.text ?? '');
  const desc = doc.querySelector('meta[name=description]')?.getAttribute('content') ?? '';
  lines.push('', '', `# Page: ${r}`, '', `- **SEO title:** ${title}`, `- **Meta description:** ${desc}`, '');
  const out = [];
  render(doc.querySelector('main'), out);
  // collapse duplicate blank lines / separators
  const compact = out.filter((l, i, a) => !(l === '' && a[i - 1] === '') && !(l === '---' && a[i - 2] === '---'));
  lines.push(...compact);
}

// Dev-only testimonial placeholders
lines.push('', '', '# Hidden until real: Testimonials (home page)', '', 'Heading: "What local owners *say.*"', '', 'Slots (TODO: real, permission-granted quotes only):', '');
const t = readFileSync(join(root, 'src/data/testimonials.ts'), 'utf8');
for (const m of t.matchAll(/quote: ['"](.+?)['"],/g)) lines.push(`- ${m[1]}`);

writeFileSync(join(root, 'docs/copy.md'), lines.join('\n').replace(/\n{3,}/g, '\n\n') + '\n');
console.log('docs/copy.md written,', lines.length, 'lines');
