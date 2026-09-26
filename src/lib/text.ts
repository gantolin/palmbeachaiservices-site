const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** "Get into the *map pack*" → HTML with the serif-italic accent span. */
export function accent(s: string): string {
  return esc(s).replace(/\*(.+?)\*/g, '<em class="accent">$1</em>');
}

/**
 * Split a headline into word spans for the staggered rise animation.
 * Accent words (*like this*) keep their serif styling.
 */
export function words(s: string, start = 0): string {
  let i = start;
  const tokens = s.match(/\*[^*]+\*|\S+/g) ?? [];
  return tokens
    .map((t) => {
      const isAccent = t.startsWith('*') && t.endsWith('*');
      const inner = isAccent ? `<em class="accent">${esc(t.slice(1, -1))}</em>` : esc(t);
      return `<span class="w" style="--i:${i++}">${inner}</span>`;
    })
    .join(' ');
}

export const plain = (s: string) => s.replace(/\*/g, '');
