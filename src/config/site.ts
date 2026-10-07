/**
 * Single source of truth for business facts.
 * Edit here and every page, the footer, JSON-LD and legal pages update.
 */

/** Founder's first name, used everywhere on the site (confirmed by Gene 2026-09-26). */
export const FOUNDER_FIRST_NAME = 'Gene';

export const SITE = {
  name: 'Palm Beach AI Services',
  shortName: 'PBAI Services',
  domain: 'palmbeachaiservices.com',
  url: 'https://palmbeachaiservices.com',
  /** The brand line (chosen by Gene 2026-09-27). */
  tagline: 'Get seen on Google. Get your time back with AI.',
  /** One-sentence positioning, used under the tagline. */
  positioning: 'We get local businesses seen on Google, then use AI to save them time and make them money.',
  description:
    'Get seen on Google. Get your time back with AI. Local SEO, Google Maps, websites, and AI automation for local businesses in Palm Beach County. No contract. Based in Royal Palm Beach, FL.',

  founder: FOUNDER_FIRST_NAME,

  phone: '(561) 365-8443',
  phoneE164: '+15613658443',
  email: 'Gene@Palmbeachaiservices.com',

  // Public office address (Gene chose to publish it 2026-09-27 so the business can rank on Google Maps).
  // Must match the Google Business Profile character for character.
  address: {
    street: '172 Roycourt Circle',
    locality: 'Royal Palm Beach',
    region: 'FL',
    regionName: 'Florida',
    country: 'US',
    postalCode: '33411',
  },
  geo: { lat: 26.7084, lng: -80.2306 }, // TODO(Gene): replace with the exact pin from the Google Business Profile once it exists
  /** Opens the address in Google Maps. Swap for the GBP share link (maps.app.goo.gl/...) once the profile is live. */
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=172+Roycourt+Circle,+Royal+Palm+Beach,+FL+33411',

  homeBase: 'Royal Palm Beach',
  primaryArea: 'Palm Beach County',
  serviceAreas: [
    'Royal Palm Beach',
    'Wellington',
    'West Palm Beach',
    'Loxahatchee',
    'Greenacres',
    'Lake Worth Beach',
    'Palm Beach Gardens',
    'Jupiter',
    'Boynton Beach',
    'Delray Beach',
    'Boca Raton',
  ],
  nearbyCounties: ['Martin County', 'Broward County'],

  // TODO(Gene): add public profile URLs as they go live (GBP share link, Facebook, Instagram, LinkedIn, YouTube).
  social: {
    googleBusinessProfile: '',
    facebook: '',
    instagram: '',
    linkedin: '',
    youtube: '',
  } as Record<string, string>,


  /**
   * The Google check form posts to Web3Forms, which emails each lead to Gene@.
   * The access key is public by design (it only allows sending to that inbox). It comes from the
   * PUBLIC_WEB3FORMS_KEY repo variable in CI and from .env locally. Empty = the form shows a
   * call/text fallback instead of pretending to send.
   */
  web3formsKey: import.meta.env.PUBLIC_WEB3FORMS_KEY ?? '',

  /**
   * Calendly event for the free call. Embedded on the home page.
   * If the Calendly link slug changes (Profile > My Link), update it here.
   */
  bookingUrl: 'https://calendly.com/gene-palmbeachaiservices/free-audit',

  /** Portrait for the founder block. TODO(Gene): drop a photo at /public/images/founder.jpg and set this. */
  founderPhoto: '' as string,

  ogImage: '/og/default.png',
} as const;

export const telHref = `tel:${SITE.phoneE164}`;
export const smsHref = `sms:${SITE.phoneE164}`;
export const mailHref = `mailto:${SITE.email}`;

export const NAV = [
  { label: 'Services', href: '/services/' },
  { label: 'Results', href: '/results/' },
  { label: 'About', href: '/about/' },
] as const;

/** The one ask everywhere is booking a call. The calendar lives on the home page. */
export const CTA = {
  primary: { label: 'Book a free audit', href: '/#book' },
} as const;
