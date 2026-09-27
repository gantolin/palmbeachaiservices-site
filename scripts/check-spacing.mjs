import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'node-html-parser';
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : []; });
const seen = new Set();
for (const f of walk('dist')) {
  const root = parse(readFileSync(f, 'utf8'));
  root.querySelectorAll('script,style,noscript').forEach((n) => n.remove());
  const text = root.querySelector('body')?.textContent ?? '';
  for (const m of text.matchAll(/[a-z0-9][.!?,:][A-Z][a-z]/g)) {
    const ctx = text.slice(Math.max(0, m.index - 30), m.index + 25).replace(/\s+/g, ' ');
    if (/\b(e\.g|i\.e|St|Ft)\b/.test(ctx) || /\d[.,]\d/.test(ctx) || /\.(com|org|md|app|net|ai|txt)/i.test(ctx)) continue;
    const key = ctx.trim(); if (seen.has(key)) continue; seen.add(key);
    console.log(f.replace('dist', '') + ' :: ' + key);
  }
  for (const m of text.matchAll(/\s[.,](\s|[A-Z])/g)) { const ctx = text.slice(Math.max(0, m.index - 30), m.index + 20).replace(/\s+/g, ' '); if (!seen.has(ctx)) { seen.add(ctx); console.log('SPACE-BEFORE-PUNCT ' + f.replace('dist', '') + ' :: ' + ctx); } }
}
