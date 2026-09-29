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
  icon: 'globe' | 'pin' | 'spark' | 'phone';
}

export const services: Service[] = [
  {
    slug: 'websites',
    pillar: 'Get seen on Google',
    name: 'Websites That Rank',
    navLabel: 'Websites',
    metaTitle: 'Web Design in West Palm Beach for Contractors | Palm Beach AI Services',
    metaDescription:
      `Web design for West Palm Beach and Palm Beach County home-service businesses. Fast, custom websites built to rank on Google and turn visitors into calls. Live in 14 days. No contract.`,
    eyebrow: 'Web design · West Palm Beach & Palm Beach County',
    headline: 'A website that brings in *calls*.',
    subhead:
      'Custom websites for contractors in West Palm Beach and across Palm Beach County. Fast, built to rank in your town, and designed to turn visitors into calls. Live in 14 days. You own every pixel.',
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
      { title: 'Google check', text: 'We check where you show up on Google today and show you what is costing you calls.' },
      { title: 'Content', text: 'You send photos and a logo. We write the words, built around local searches.' },
      { title: 'Build', text: 'Your site goes live in 14 days from the day we have your content.' },
      { title: 'Grow', text: 'On the monthly plan we keep improving it, building backlinks, and tracking competitors.' },
    ],
    relatedCase: 'heros-pavers',
    priceNote: 'A one-time website build, then one flat monthly plan for reviews, Google profile management, lead follow-up, backlinks, and competitor tracking. Fixed quote in writing after a free call. No contract.',
    faqs: [
      { q: 'Do I own the website?', a: 'Yes. Your domain, your content, your site. No hostage situations.' },
      { q: 'How fast can it go live?', a: 'Within 14 days of the day we have your content (logo, photos, and a quick call about your services). If we miss it, your first month is free.' },
      { q: 'I already have a site. Do I need a new one?', a: 'Not always. The free Google Visibility Check tells you honestly whether to fix it or rebuild it.' },
    ],
    icon: 'globe',
  },
  {
    slug: 'google-maps-seo',
    pillar: 'Get seen on Google',
    name: 'Google Maps SEO & Google Business Profile',
    navLabel: 'Google Maps SEO',
    // Targets "google maps seo" (2,900/mo) + "gmb optimization" (1,000, KD 25) + "google business profile optimization service" (480, KD 30).
    metaTitle: 'Google Maps SEO & Google Business Profile Optimization Service',
    metaDescription:
      `Get your home service business seen on Google Maps. Google Business Profile optimization, automatic review requests, and local SEO from Royal Palm Beach, FL. Month-to-month, no contract.`,
    eyebrow: 'Google Maps SEO · Google Business Profile optimization',
    headline: 'Get seen on *Google Maps* in your town.',
    subhead:
      'When someone in West Palm Beach, Wellington, or Royal Palm Beach searches for what you do, the top three on Google Maps get the calls. We get your profile built, active, and collecting reviews so you can compete for those spots.',
    outcomes: [
      { title: 'A complete profile', text: 'Categories, services, photos, and posts that tell Google what you do and where you do it.' },
      { title: 'More reviews', text: 'After every job, your customer gets a friendly text asking for a review, so you never have to remember to ask.' },
      { title: 'A monthly check-in', text: 'Once a month we go over your calls, reviews, and rankings, and what we are working on next.' },
    ],
    included: [
      'Full Google Business Profile audit + rebuild',
      'Primary and secondary categories set correctly',
      'Services, descriptions, and photos optimized',
      'Regular posts linking back to your website',
      'Automated review requests after every job',
      'Review response help',
      'Local listing consistency (name, address, phone) checks',
      'A monthly report you can actually read',
    ],
    process: [
      { title: 'Google check', text: 'We look at your profile next to the businesses outranking you on Google Maps and show you the gaps.' },
      { title: 'Fix', text: 'We rebuild the profile: categories, services, photos, and description.' },
      { title: 'Automate', text: 'Review requests go out automatically after every job.' },
      { title: 'Check in', text: 'Every month we go over the calls, reviews, and rankings with you.' },
    ],
    relatedCase: 'heros-pavers',
    priceNote: 'Google Business Profile management is included in the monthly plan, after a one-time website build. Fixed quote in writing after a free call. Month-to-month.',
    faqs: [
      { q: 'Can you guarantee #1 on Google?', a: 'No, and be wary of anyone who does. Google decides rankings. We control the work: a complete profile, steady reviews, and a site that backs it up.' },
      { q: 'How long does it take to see movement?', a: 'It depends on your town and your competition. Profile fixes can show movement within weeks; bigger ranking gains usually take a few months of steady work.' },
      { q: 'Do I need a new website too?', a: `A strong site helps your profile rank, which is why the plan starts with a custom website build.` },
    ],
    icon: 'pin',
  },
  {
    slug: 'ai-automation',
    pillar: 'Get your time back with AI',
    name: 'AI Automation',
    navLabel: 'AI Automation',
    // Targets "ai automation services" (1,600/mo, KD 31) + "business automation services" (1,000, KD 28).
    metaTitle: 'AI Automation Services for Home Service Businesses | Palm Beach AI',
    metaDescription:
      'AI automation services that save home service businesses time and make them money: missed-call text-back, speed to lead, review requests, invoicing, and custom AI workflows.',
    eyebrow: 'AI automation services · Get your time back',
    headline: 'Stop losing jobs to *voicemail*.',
    subhead:
      'Missed-call text-back, instant follow-ups, review requests, invoicing, and custom AI tools that take hours of busywork off your week. Set up for you, running quietly in the background.',
    outcomes: [
      { title: 'Every missed call gets a text', text: 'Within seconds, so the customer hears from you before they call the next company.' },
      { title: 'Follow-up that goes out on time', text: 'Quotes, reminders, and check-ins get sent by text and email, even on your busiest weeks.' },
      { title: 'Less paperwork', text: 'AI drafts your reports, invoices, and estimates, so you review them instead of writing them from scratch.' },
    ],
    included: [
      'CRM setup on GoHighLevel: pipeline, unified inbox, calendar',
      'Missed-call text-back',
      'Lead follow-up sequences by text + email',
      'Automated review requests',
      'Invoicing + payment reminder automation',
      'AI answering service for after-hours + overflow calls (custom quote)',
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
    priceNote: `Review automation and lead follow-up are included in the monthly plan. CRM/GoHighLevel setup, custom AI workflows, and the AI Workday Install are quoted per project.`,
    faqs: [
      { q: 'What is GoHighLevel?', a: 'An all-in-one CRM: contacts, texting, calendar, pipeline, and automations in one place. We set it up and run it for you.' },
      { q: 'Will AI sound robotic to my customers?', a: 'We write every message in your voice and keep it short and human. You approve it before it goes live.' },
      { q: 'Do I need to be good with tech?', a: 'No. We build it, test it, and show you the few things you need to know.' },
    ],
    icon: 'spark',
  },
  {
    slug: 'ai-answering-service',
    pillar: 'Get your time back with AI',
    name: 'AI Answering Service',
    navLabel: 'AI Answering Service',
    // Targets "answering service for contractors" (1,000/mo, KD 10, $60 CPC) + "ai phone answering service" (720, KD 51).
    metaTitle: 'AI Answering Service for Contractors | Palm Beach AI Services',
    metaDescription:
      'An AI answering service for contractors and home service businesses. Every call answered 24/7, questions handled, jobs booked, and the details texted to you. Set up in Palm Beach County.',
    eyebrow: 'AI answering service for contractors',
    headline: 'Every call *answered*, even when you are on a roof.',
    subhead:
      'You cannot pick up while you are on a job, driving, or asleep. Our AI answering service picks up for you, 24/7, in a natural voice: it answers common questions, books the job, and texts you the details.',
    outcomes: [
      { title: 'No more voicemail', text: 'Callers get a real conversation instead of a beep, so they do not hang up and call the next company.' },
      { title: 'Jobs booked while you work', text: 'It collects the address and the problem and books straight into your calendar.' },
      { title: 'You stay in control', text: 'Urgent calls get forwarded to you. Everything else arrives as a short text summary.' },
    ],
    included: [
      'AI voice agent trained on your services, service area, and hours',
      'Answers after hours, on weekends, and when you are busy (overflow)',
      'Books appointments into your calendar',
      'Emergency calls transferred to you or your on-call tech',
      'Text + email summary of every call',
      'Call recordings and transcripts in your CRM',
      'Missed-call text-back as a backup',
      'Scripts written in your voice and approved by you before going live',
    ],
    process: [
      { title: 'Listen', text: 'We learn how you answer the phone today: what customers ask, what you book, what counts as an emergency.' },
      { title: 'Build', text: 'We set up the AI agent with your services, prices you are comfortable sharing, and your calendar.' },
      { title: 'Test', text: 'We call it ourselves, over and over, until it sounds like your business and books correctly.' },
      { title: 'Go live', text: 'You forward missed or after-hours calls to it, and a short summary of each call lands on your phone. We keep adjusting it every month.' },
    ],
    relatedCase: 'safe-haven-inspections',
    priceNote: 'The AI answering service is quoted per business, based on call volume and how much it should handle. Missed-call text-back is already included in the monthly plan.',
    faqs: [
      { q: 'Will callers know it is AI?', a: 'It sounds natural and polite, and we do not pretend it is a person if someone asks. Most callers just care that someone answered and their job got booked.' },
      { q: 'What happens with emergencies?', a: 'You decide what counts as an emergency (no AC in August, a burst pipe). Those calls get transferred to you or your on-call tech right away.' },
      { q: 'Do I have to change my phone number?', a: 'No. You keep your number and forward missed or after-hours calls to the AI line.' },
      { q: 'Is this different from an answering service?', a: 'A traditional answering service takes a message. The AI can answer questions, qualify the job, and book it on your calendar, any hour of the day.' },
    ],
    icon: 'phone',
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
