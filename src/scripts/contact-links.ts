/**
 * Call and text links on a computer. On a phone, tel: and sms: open the dialer or the messages app.
 * On most desktops nothing answers them, so the click looks dead. Here the link still fires (a Mac or
 * a linked phone will pick it up), and the number is also copied with a short note saying so.
 */
const desktop = window.matchMedia('(hover: hover) and (pointer: fine)');

let note: HTMLElement | undefined;
let timer: number | undefined;

function show(message: string) {
  if (!note) {
    note = document.createElement('div');
    note.className = 'contact-note';
    note.setAttribute('role', 'status');
    document.body.appendChild(note);
  }
  note.textContent = message;
  note.dataset.show = 'true';
  window.clearTimeout(timer);
  timer = window.setTimeout(() => { if (note) note.dataset.show = 'false'; }, 6000);
}

document.addEventListener('click', (e) => {
  if (!desktop.matches) return;
  const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="tel:"], a[href^="sms:"]');
  if (!link) return;
  const verb = link.protocol === 'sms:' ? 'Text' : 'Call';
  // +15613658443 -> (561) 365-8443
  const d = link.href.replace(/\D/g, '').slice(-10);
  const number = `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  const say = (copied: boolean) => show(`${copied ? 'Number copied. ' : ''}${verb} ${number} from your phone.`);
  if (navigator.clipboard?.writeText) navigator.clipboard.writeText(number).then(() => say(true), () => say(false));
  else say(false);
});
