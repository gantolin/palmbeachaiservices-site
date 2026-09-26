import { BUILD_FEE, MONTHLY, usd, priceLine } from './pricing';
/** Service pages. Each renders at /services/<slug>/ using the ServicePage template. */
export interface Service {
  slug: string;
  pillar: string; // "Get found" / "Never miss a lead" / "Get your time back"
  name: string;
  navLabel: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string; // may contain *accent* word
  subhead: string;
  outcomes: { title: string; text: string }[];
  included: string[];
  process: { title: string; text: string }[];
  relatedCase: string; // case study slug
  priceNote: string;
  faqs: { q: string; a: string }[];
  icon: 'globe' | 'pin' | 'spark';
}

export const services: Service[] = [
  {
    slug: 'websites',
    pillar: 'Get found',
    name: 'Websites',
    navLabel: 'Websites',
    metaTitle: 'Website Design for Palm Beach County Contractors | Palm Beach AI Services',
    metaDescription:
      `Fast, custom websites for Palm Beach County home-service businesses. Built to rank on Google and turn visitors into calls. Live in 14 days. ${usd(BUILD_FEE)} one-time build, part of our one simple plan.`,
    eyebrow: 'Websites',
    headline: 'A website that *earns* its keep.',
    subhead:
      'Fast, custom, built to rank in your town, and designed to turn visitors into calls. Live in 14 days. You own every pixel.',
    outcomes: [
      { title: 'Shows up on Google', text: 'Service and town pages built around what your customers actually search.' },
      { title: 'Turns visits into calls', text: 'Tap-to-call, quote forms, and proof right where people decide.' },
      { title: 'Loads fast on any phone', text: 'Most of your customers find you on mobile. We build for that first.' },
    ],
    included: [
      'Custom design (no cookie-cutter template)',
      'Mobile-first, fast-loading build',
      'Service pages + a page for your main town',
      'Click-to-call and a quote form wired to your inbox or CRM',
      'Local business structured data for Google',
      'Google Analytics + Search Console set up',
      'Kept fast and improved every month on the monthly plan',
      'You own the domain, the content, and the site',
    ],
    process: [
      { title: 'Teardown', text: 'We review your current site and Google profile and show you what is costing you calls.' },
      { title: 'Content', text: 'You send photos and a logo. We write the words, built around local searches.' },
      { title: 'Build', text: 'Your site goes live in 14 days from the day we have your content.' },
      { title: 'Grow', text: 'On the monthly plan we keep improving it, building backlinks, and tracking competitors.' },
    ],
    relatedCase: 'heros-pavers',
    priceNote: `${usd(BUILD_FEE)} one-time website build, then ${usd(MONTHLY)}/month for reviews, Google profile management, lead follow-up, backlinks, and competitor tracking. No contract.`,
    faqs: [
      { q: 'Do I own the website?', a: 'Yes. Your domain, your content, your site. No hostage situations.' },
      { q: 'How fast can it go live?', a: 'Within 14 days of the day we have your content (logo, photos, and a quick call about your services). If we miss it, your first month is free.' },
      { q: 'I already have a site. Do I need a new one?', a: 'Not always. The free teardown tells you honestly whether to fix it or rebuild it.' },
    ],
    icon: 'globe',
  },
  {
    slug: 'local-seo-google-business-profile',
    pillar: 'Get found',
    name: 'Local SEO & Google Business Profile',
    navLabel: 'Local SEO & Google Profile',
    metaTitle: 'Local SEO & Google Business Profile Optimization in Palm Beach County | Palm Beach AI Services',
    metaDescription:
      `Get into the Google map pack in your town. Google Business Profile optimization, review automation, and local SEO for Palm Beach County trades. ${priceLine}, month-to-month.`,
    eyebrow: 'Local SEO & Google Business Profile',
    headline: 'Get into the *map pack* in your town.',
    subhead:
      'When someone nearby searches for what you do, the top three on Google Maps get the calls. We get your profile built, active, and collecting reviews so you can compete for those spots.',
    outcomes: [
      { title: 'A complete, active profile', text: 'Categories, services, photos, and posts that tell Google exactly what you do and where.' },
      { title: 'Reviews on autopilot', text: 'Every finished job triggers a friendly review request by text. No awkward asking.' },
      { title: 'Reports in plain English', text: 'Once a month: calls, reviews, and rankings. No jargon, no vanity charts.' },
    ],
    included: [
      'Full Google Business Profile audit + rebuild',
      'Primary and secondary categories dialed in',
      'Services, descriptions, and photos optimized',
      'Regular posts linking back to your website',
      'Automated review requests after every job',
      'Review response help',
      'Local listing consistency (name, address, phone) checks',
      'Monthly plain-English report',
    ],
    process: [
      { title: 'Teardown', text: 'We look at your profile next to the businesses outranking you and show you the gaps.' },
      { title: 'Fix', text: 'We rebuild the profile: categories, services, photos, and description.' },
      { title: 'Automate', text: 'Review requests go out automatically after every job.' },
      { title: 'Report', text: 'Every month you get the numbers that matter, in plain English.' },
    ],
    relatedCase: 'heros-pavers',
    priceNote: `Google Business Profile management is included in the ${usd(MONTHLY)}/month plan (after a ${usd(BUILD_FEE)} one-time website build). Month-to-month.`,
    faqs: [
      { q: 'Can you guarantee #1 on Google?', a: 'No, and be wary of anyone who does. Google decides rankings. We control the work: a complete profile, steady reviews, and a site that backs it up.' },
      { q: 'How long does it take to see movement?', a: 'It depends on your town and your competition. Profile fixes can show movement within weeks; bigger ranking gains usually take a few months of steady work.' },
      { q: 'Do I need a new website too?', a: `A strong site helps your profile rank, which is why the plan starts with a ${usd(BUILD_FEE)} custom website build.` },
    ],
    icon: 'pin',
  },
  {
    slug: 'ai-automation',
    pillar: 'Never miss a lead · Get your time back',
    name: 'AI Automation',
    navLabel: 'AI Automation',
    metaTitle: 'AI Automation & GoHighLevel CRM for Palm Beach County Businesses | Palm Beach AI Services',
    metaDescription:
      'Missed-call text-back, lead follow-up, review requests, invoicing, and custom AI workflows with Claude, ChatGPT, and Grok. GoHighLevel CRM setup for Palm Beach County trades.',
    eyebrow: 'AI Automation',
    headline: 'Stop losing jobs to *voicemail*.',
    subhead:
      'Missed-call text-back, instant follow-ups, review requests, invoicing, and custom AI tools that take hours of busywork off your week. Set up for you, running quietly in the background.',
    outcomes: [
      { title: 'Every missed call gets a text', text: 'Within seconds, so the customer hears from you before they call the next company.' },
      { title: 'Follow-up that never forgets', text: 'Quotes, reminders, and check-ins go out on time, every time, by text and email.' },
      { title: 'Paperwork that does itself', text: 'Reports, invoices, and estimates drafted by AI so you can get back to the job.' },
    ],
    included: [
      'CRM setup on GoHighLevel: pipeline, unified inbox, calendar',
      'Missed-call text-back',
      'Lead follow-up sequences by text + email',
      'Automated review requests',
      'Invoicing + payment reminder automation',
      'AI receptionist for after-hours + overflow calls (custom quote)',
      'Custom AI workflows with Claude, ChatGPT, or Grok',
      'Custom tools built around your process, like the Safe Haven report system',
    ],
    process: [
      { title: 'Map it', text: 'We find where leads slip and where your hours go, and pick the highest-payoff fix first.' },
      { title: 'Build it', text: 'We set up the CRM and automations in your accounts. You own them.' },
      { title: 'Test it', text: 'We run real scenarios with you until it works the way you run your business.' },
      { title: 'Tune it', text: 'We watch the numbers monthly and keep improving what is working.' },
    ],
    relatedCase: 'safe-haven-inspections',
    priceNote: `Review automation and lead follow-up are included in the ${usd(MONTHLY)}/month plan. CRM/GoHighLevel setup, custom AI workflows, and the AI Workday Install are quoted per project.`,
    faqs: [
      { q: 'What is GoHighLevel?', a: 'An all-in-one CRM: contacts, texting, calendar, pipeline, and automations in one place. We set it up and run it for you.' },
      { q: 'Will AI sound robotic to my customers?', a: 'We write every message in your voice and keep it short and human. You approve it before it goes live.' },
      { q: 'Do I need to be good with tech?', a: 'No. We build it, test it, and show you the few things you need to know.' },
    ],
    icon: 'spark',
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
