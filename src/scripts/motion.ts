/**
 * Site-wide motion + interaction layer (~3KB). Progressive: every effect is optional,
 * content is fully visible without it, and prefers-reduced-motion disables the non-essential parts.
 */
declare global { interface Window { __motion?: boolean } }
window.__motion = true;

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ---------- Header: glass on scroll + scroll progress ---------- */
const header = document.getElementById('site-header');
let ticking = false;
const onScroll = () => {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    const y = window.scrollY;
    header?.setAttribute('data-scrolled', String(y > 8));
    const max = document.documentElement.scrollHeight - window.innerHeight;
    header?.style.setProperty('--scroll', max > 0 ? (y / max).toFixed(4) : '0');
    ticking = false;
  });
};
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* ---------- Mobile menu ---------- */
const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
const sheet = document.getElementById('mobile-menu');
toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  header?.setAttribute('data-open', String(open));
  if (sheet) sheet.hidden = !open;
  document.body.style.overflow = open ? 'hidden' : '';
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && toggle?.getAttribute('aria-expanded') === 'true') toggle.click();
});

/* ---------- Reveal on scroll ---------- */
const revealEls = document.querySelectorAll<HTMLElement>('[data-reveal]');
if (reduce || !('IntersectionObserver' in window)) {
  revealEls.forEach((el) => el.classList.add('is-in'));
} else {
  const io = new IntersectionObserver(
    (entries) => entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); } }),
    { rootMargin: '0px 0px -6% 0px', threshold: 0.1 },
  );
  revealEls.forEach((el) => io.observe(el));
}

/* ---------- Count-up stats ---------- */
const counters = document.querySelectorAll<HTMLElement>('[data-count-to]');
const runCount = (el: HTMLElement) => {
  const to = Number(el.dataset.countTo);
  const from = Number(el.dataset.countFrom ?? 0);
  const pre = el.dataset.prefix ?? '';
  const suf = el.dataset.suffix ?? '';
  if (reduce) { el.textContent = pre + to + suf; return; }
  const t0 = performance.now();
  const dur = Number(el.dataset.countDur ?? 1100);
  const step = (t: number) => {
    const p = Math.min(1, (t - t0) / dur);
    const eased = 1 - Math.pow(1 - p, 4);
    el.textContent = pre + Math.round(from + (to - from) * eased) + suf;
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};
if ('IntersectionObserver' in window) {
  const cio = new IntersectionObserver(
    (entries) => entries.forEach((en) => { if (en.isIntersecting) { runCount(en.target as HTMLElement); cio.unobserve(en.target); } }),
    { threshold: 0.6 },
  );
  counters.forEach((el) => cio.observe(el));
}

/* ---------- Scroll-linked progress (e.g. How it works line): [data-progress] gets --p 0..1 ---------- */
const progressEls = Array.from(document.querySelectorAll<HTMLElement>('[data-progress]'));
if (progressEls.length && !reduce) {
  let pTick = false;
  const update = () => {
    pTick = false;
    const vh = window.innerHeight;
    progressEls.forEach((el) => {
      const r = el.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (vh * 0.55 - r.top) / r.height));
      el.style.setProperty('--p', p.toFixed(4));
    });
  };
  window.addEventListener('scroll', () => { if (!pTick) { pTick = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

/* ---------- Pointer effects (desktop, motion allowed) ---------- */
if (finePointer && !reduce) {
  // Cursor spotlight + parallax inside heroes
  document.querySelectorAll<HTMLElement>('[data-parallax-root]').forEach((root) => {
    let raf = 0;
    let lx = 0, ly = 0;
    root.addEventListener('pointerenter', () => root.setAttribute('data-pointer-in', 'true'));
    root.addEventListener('pointerleave', () => {
      root.setAttribute('data-pointer-in', 'false');
      root.style.setProperty('--px', '0'); root.style.setProperty('--py', '0');
    });
    root.addEventListener('pointermove', (e) => {
      lx = e.clientX; ly = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const r = root.getBoundingClientRect();
        const x = lx - r.left, y = ly - r.top;
        root.style.setProperty('--mx', `${x}px`);
        root.style.setProperty('--my', `${y}px`);
        root.style.setProperty('--px', ((x / r.width) * 2 - 1).toFixed(3));
        root.style.setProperty('--py', ((y / r.height) * 2 - 1).toFixed(3));
      });
    });
  });

  // Card spotlight border
  document.querySelectorAll<HTMLElement>('.card, .card-dark, [data-spot]').forEach((el) => {
    if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
    el.classList.add('has-spot');
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--sx', `${e.clientX - r.left}px`);
      el.style.setProperty('--sy', `${e.clientY - r.top}px`);
    });
  });

  // 3D tilt
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    const max = Number(el.dataset.tilt || 6);
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.classList.add('is-tilting');
      el.style.setProperty('--ry', `${(x * max).toFixed(2)}deg`);
      el.style.setProperty('--rx', `${(-y * max).toFixed(2)}deg`);
      el.style.setProperty('--gx', `${((x + 0.5) * 100).toFixed(1)}%`);
      el.style.setProperty('--gy', `${((y + 0.5) * 100).toFixed(1)}%`);
    });
    el.addEventListener('pointerleave', () => {
      el.classList.remove('is-tilting');
      el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg');
    });
  });

  // Magnetic buttons
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.setProperty('--tx', `${(x * 0.18).toFixed(1)}px`);
      el.style.setProperty('--ty', `${(y * 0.28).toFixed(1)}px`);
    });
    el.addEventListener('pointerleave', () => { el.style.setProperty('--tx', '0px'); el.style.setProperty('--ty', '0px'); });
  });
}
export {};
