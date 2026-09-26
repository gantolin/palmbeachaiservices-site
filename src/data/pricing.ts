/**
 * ALL PRICES LIVE HERE. Edit this file to change what the site shows (home hero, home pricing,
 * /pricing, FAQs, JSON-LD, meta descriptions all read from it).
 *
 * The offer is ONE plan: a one-time website build fee, then a flat monthly price.
 * Custom AI automation is quoted per project and intentionally has no price on the site.
 */

export const BUILD_FEE = 750;
export const MONTHLY = 297;

export const usd = (n: number) => `$${n.toLocaleString('en-US')}`;
/** "$750 build + $297/mo" style strings, used across the site so wording stays consistent. */
export const priceLine = `${usd(BUILD_FEE)} build + ${usd(MONTHLY)}/mo`;
export const priceSentence = `${usd(BUILD_FEE)} one-time website build, then ${usd(MONTHLY)}/month. No contract.`;

export interface Included {
  title: string;
  text: string;
  /** What this line item replaces (qualitative, never an invented dollar figure). */
  replaces: string;
  icon: string;
}

export const plan = {
  // TODO(Gino): confirm the public plan name.
  name: 'The Local Growth Plan',
  tagline: 'Everything a local service business needs to get found, get reviews, and get booked.',
  buildFee: BUILD_FEE,
  monthly: MONTHLY,
  /** The one-time $750 covers this. TODO(Gino): confirm build scope. */
  build: {
    title: 'Custom website build',
    text: 'Designed, written, and launched for you. Live in 7 days once we have your content.',
    items: [
      'Custom, mobile-first design that loads fast',
      'Service pages + your main town page, written for local search',
      'Click-to-call, quote form, and Google-ready structured data',
      'Google Business Profile connected and cleaned up',
      'Analytics + Search Console set up',
    ],
  },
  /** The $297/mo covers exactly these six things (from Gino). Order matters: it is the display order. */
  included: [
    {
      title: 'Review automation',
      text: 'Every finished job gets a friendly text asking for a Google review, with a follow-up if they forget.',
      replaces: 'A separate review app subscription',
      icon: 'star',
    },
    {
      title: 'Google Business Profile management',
      text: 'Categories, services, photos, and posts kept complete and active, so you show up in the map pack.',
      replaces: 'Doing it yourself at night, or never',
      icon: 'pin',
    },
    {
      // TODO(Gino): confirm missed-call text-back is part of "lead follow-up" in the $297 plan.
      title: 'Lead follow-up',
      text: 'New leads and missed calls get a fast automatic text and email, so no inquiry sits unanswered.',
      replaces: 'Leads that go cold in your voicemail',
      icon: 'message',
    },
    {
      title: 'Monthly check-in',
      text: 'A plain-English call or report with the founder: what moved, what we are doing next.',
      replaces: 'Agency reports nobody can read',
      icon: 'calendar-check',
    },
    {
      title: 'Backlink building',
      text: 'Real local citations and links that tell Google your business is legit and local.',
      replaces: 'A separate SEO link vendor',
      icon: 'layers',
    },
    {
      title: 'Competitor analysis + ranking improvement',
      text: 'We watch who outranks you in your towns and keep closing the gap, month after month.',
      replaces: 'Guessing why the other guy shows up first',
      icon: 'chart',
    },
  ] as Included[],
  terms: ['Month-to-month', 'No contract', 'You own everything', 'Cancel anytime'],
  cta: { label: 'Get my free teardown', href: '/free-teardown/?plan=local-growth' },
  footnote:
    'The build fee is paid once. After that it is one flat monthly price, month-to-month. Your domain, website content, Google profile, and customer data are always yours.',
};

/** Secondary offer: shown below the main plan. Deliberately NO price. */
export const customAI = {
  eyebrow: 'Custom AI automation',
  title: 'Want AI to take whole chores off your plate?',
  text: 'For businesses that are ready for more than the essentials. Scoped to your workflow, with a fixed quote in writing before any work starts.',
  priceLabel: 'Quoted per project',
  items: [
    { title: 'CRM + GoHighLevel setup', text: 'Pipeline, inbox, calendar, and automations in one place.', icon: 'inbox' },
    { title: 'Custom AI workflows', text: 'Like the Safe Haven report system: 45 → 10 minutes per report.', icon: 'sparkles' },
    { title: 'AI Workday Install', text: 'A hands-on day setting up Claude, ChatGPT, or Grok for your team.', icon: 'zap' },
  ],
  cta: { label: 'Get a custom quote', href: '/free-teardown/?plan=custom-ai' },
};

/**
 * THE WRITTEN GUARANTEE. Delivery promises only, things we control. Never revenue or ranking guarantees.
 * Full terms render on /terms/#guarantee.
 * TODO(Gino): confirm these before launch. They are a real commitment.
 */
export const guarantee = {
  name: 'The Palm Beach Promise',
  headline: 'Live in 14 days, or month one is free.',
  points: [
    { title: 'Live in 14 days, or month one is free', text: `Your website, Google profile cleanup, and review + lead follow-up automations go live within 14 days of getting your content and account access. If we miss it, your first ${usd(MONTHLY)} month is on us.` },
    { title: 'Leave any month, keep everything', text: 'No contract. If you cancel, your website, domain, Google profile, and customer data stay yours.' },
    { title: 'Flat, published prices', text: `${usd(BUILD_FEE)} once, ${usd(MONTHLY)} a month. Anything custom gets a fixed quote, in writing, before work starts.` },
  ],
  fine: 'We do not guarantee rankings, leads, or revenue. Nobody honest can. We guarantee the work we control.',
};

/** Short delivery promises (used under pricing). */
export const promises = [
  { title: 'Website live in 7 days', text: 'Counted from the day we have your content and logo.' },
  { title: 'Full setup in 14 days', text: 'Or your first month is free. In writing.' },
  { title: 'Leave any month', text: 'No contract, and you keep everything we built.' },
  { title: 'Flat, published prices', text: 'No surprise invoices. No "call for pricing."' },
];
