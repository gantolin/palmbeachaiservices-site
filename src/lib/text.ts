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
  // An accent keeps any punctuation that follows it in the same word span ("*answered*." stays "answered.").
  const tokens = [...s.matchAll(/\*([^*]+)\*(\S*)|\S+/g)];
  return tokens
    .map((m) => {
      const inner = m[1] !== undefined ? `<em class="accent">${esc(m[1])}</em>${esc(m[2])}` : esc(m[0]);
      return `<span class="w" style="--i:${i++}">${inner}</span>`;
    })
    .join(' ');
}

export const plain = (s: string) => s.replace(/\*/g, '');
