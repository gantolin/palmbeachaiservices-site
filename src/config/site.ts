/**
 * Single source of truth for business facts.
 * Edit here and every page, the footer, JSON-LD and legal pages update.
 */
import { priceLine } from '../data/pricing';

/**
 * Founder's first name, used everywhere on the site.
 * TODO(Gino): confirm which name to use publicly. 'Gino' or 'Gene'.
 * (Hero's Pavers' reviews already say "Gene", and the inbox is Gene@.)
 */
export const FOUNDER_FIRST_NAME = 'Gino';

export const SITE = {
  name: 'Palm Beach AI Services',
  shortName: 'PBAI Services',
  domain: 'palmbeachaiservices.com',
  url: 'https://palmbeachaiservices.com',
  tagline: 'Websites, Google rankings, and AI automation for Palm Beach County home-service businesses.',
  description:
    `Founder-run websites, local SEO + Google Business Profile, and AI automation for Palm Beach County home-service businesses. One simple plan: ${priceLine}, no contract, you own everything. Based in Royal Palm Beach, FL.`,

  founder: FOUNDER_FIRST_NAME,

  phone: '(561) 365-8443',
  phoneE164: '+15613658443',
  email: 'Gene@Palmbeachaiservices.com',

  // Service-area business: no street address is published.
  // TODO(Gino): if the Google Business Profile shows a street address, add it here so NAP matches exactly.
  address: {
    locality: 'Royal Palm Beach',
    region: 'FL',
    regionName: 'Florida',
    country: 'US',
    postalCode: '', // TODO(Gino): add ZIP to match the GBP (leave blank if the GBP hides the address)
  },
  geo: { lat: 26.7084, lng: -80.2306 }, // Royal Palm Beach town center (approximate)

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

  // TODO(Gino): add public profile URLs as they go live (GBP share link, Facebook, Instagram, LinkedIn, YouTube).
  social: {
    googleBusinessProfile: '',
    facebook: '',
    instagram: '',
    linkedin: '',
    youtube: '',
  } as Record<string, string>,

  // Scarcity line used across the site (no day-job mention anywhere, by design).
  capacityLine: 'We take a limited number of clients per trade, per town.',

  /**
   * Lead + playbook forms POST JSON here.
   * TODO: set PUBLIC_LEAD_ENDPOINT to the AWS Lambda Function URL that validates the payload
   * and creates the contact/opportunity in GoHighLevel (which then fires the text-back + nurture).
   */
  leadEndpoint: import.meta.env.PUBLIC_LEAD_ENDPOINT ?? '',

  /**
   * GoHighLevel booking calendar URL, embedded on /thanks/ after the teardown form.
   * TODO(Gino): paste the GHL calendar widget URL (e.g. https://api.leadconnectorhq.com/widget/booking/XXXX).
   * Leave empty and the thank-you page says we will text a booking link instead.
   */
  bookingUrl: '' as string,

  /** Portrait for the founder block. TODO(Gino): drop a photo at /public/images/founder.jpg and set this. */
  founderPhoto: '' as string,

  ogImage: '/og/default.png',
} as const;

export const telHref = `tel:${SITE.phoneE164}`;
export const smsHref = `sms:${SITE.phoneE164}`;
export const mailHref = `mailto:${SITE.email}`;

export const NAV = [
  { label: 'Services', href: '/services/' },
  { label: 'Results', href: '/results/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'About', href: '/about/' },
] as const;

export const CTA = {
  primary: { label: 'Get my free teardown', href: '/free-teardown/' },
  offerName: 'The Palm Beach Teardown',
  secondary: { label: 'Get the free playbook', href: '/free-playbook/' },
} as const;
