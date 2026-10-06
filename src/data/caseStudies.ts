/**
 * CASE STUDIES. Exact numbers only. Never round up or embellish.
 * TODO(Gene): add owner quotes (with permission), before/after screenshots, and photos
 * to /public/images/results/ and reference them here.
 */
export interface CaseStudy {
  slug: string;
  client: string;
  /** Client logo under /public/clients/, shown on the results page (used with the client's OK). */
  logo?: { src: string; width: number; height: number };
  /** Small print under the card. */
  note?: string;
  trade: string;
  area: string;
  status: 'result' | 'in-progress';
  headlineStat: string;
  headlineLabel: string;
  title: string;
  summary: string;
  stats: { value: string; label: string; countTo?: number; prefix?: string; suffix?: string }[];
  challenge: string;
  whatWeDid: string[];
  outcome: string[];
  timeMath?: string;
  /** Mono footnote under proof cards: inputs, math, and source. */
  proofMath: string;
  services: string[];
  visual: 'report-time' | 'rank-ladder' | 'launch-timeline';
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'heros-pavers',
    client: "Hero's Pavers",
    logo: { src: '/clients/heros-pavers.png', width: 727, height: 160 },
    trade: 'Paver & hardscape contractor',
    area: 'Lake Worth Beach',
    status: 'result',
    headlineStat: '10+',
    headlineLabel: 'keywords in the Google map pack',
    title: 'In the Google map pack for more than 10 keywords.',
    summary:
      "We rebuilt the website and optimized the Google Business Profile. Hero's Pavers now shows up near the top of Google for the searches that bring in paver jobs.",
    stats: [
      { value: 'Map pack', label: 'for more than 10 keywords' },
      { value: 'Top of Google', label: 'for its main paver searches' },
      { value: 'Rebuilt', label: 'website, built to rank locally' },
    ],
    challenge:
      'Great work, but not enough visibility. When homeowners searched for paver and hardscape help, the company needed to show up near the top instead of below the competition.',
    whatWeDid: [
      'Rebuilt the website from the ground up with a local SEO structure',
      'Built the pages around the searches that bring in paver jobs',
      'Optimized the Google Business Profile',
    ],
    outcome: [
      'Shows up in the Google map pack for more than 10 keywords',
      'Ranks near the top of Google for its main paver searches',
      'A modern website built to turn those searches into calls',
    ],
    services: ['Website', 'Local SEO', 'Google Business Profile'],
    proofMath: 'Google map pack for more than 10 keywords after the SEO website rebuild + Google Business Profile optimization.',
    visual: 'rank-ladder',
  },
  {
    slug: 'safe-haven-inspections',
    client: 'Safe Haven Inspections',
    logo: { src: '/clients/safe-haven-inspections.png', width: 335, height: 160 },
    trade: 'Mold inspection',
    area: 'Martin, Palm Beach & Broward counties',
    status: 'result',
    headlineStat: '45 → 10 min',
    headlineLabel: 'to write each inspection report',
    title: 'From 45 minutes to 10 minutes per inspection report.',
    summary:
      "We built a custom tool that writes each inspection report in the inspector's own voice. The inspector brings the findings, and the tool does the rest. That saves about 5.8 hours for every 10 reports. We also built the website and set up the Google Business Profile.",
    stats: [
      { value: '78%', label: 'less time on every report' },
      { value: '35 min', label: 'saved per inspection' },
      { value: '5.8 hrs', label: 'back for every 10 reports' },
    ],
    challenge:
      'Every inspection ended with about 45 minutes of writing and formatting the report. That time capped how many jobs could fit in a week.',
    whatWeDid: [
      'Built a custom report tool around the way the inspector already works',
      'Automated every part of the report, from the findings to the final formatting',
      "Set it up to write each report in the inspector's own voice",
      'Designed and built a new website',
      'Set up and optimized the Google Business Profile',
    ],
    outcome: [
      'Report time dropped from 45 minutes to 10 minutes',
      'Every report is just as thorough as before, and still sounds like the inspector',
      '35 minutes saved on every inspection, about 5.8 hours for every 10 reports',
      'That time goes back into booking more inspections',
    ],
    proofMath: '45 min − 10 min = 35 min saved per report (78%). × 10 reports ≈ 5.8 hrs back. Source: report time before vs. after the automation.',
    services: ['AI Automation', 'Website', 'Google Business Profile'],
    visual: 'report-time',
  },
  {
    slug: 'next-level-air-conditioning',
    client: 'Next Level Air Conditioning',
    logo: { src: '/clients/next-level-air-conditioning.png', width: 561, height: 160 },
    trade: 'HVAC contractor',
    area: 'Greenacres & Palm Beach County',
    status: 'in-progress',
    headlineStat: '5 → 30+',
    headlineLabel: 'website pages',
    title: 'A 5-page site rebuilt into 30+ pages, with a Google profile to match.',
    summary:
      'A family-owned HVAC company with a 5.0 star Google rating and a website too small to rank. We rebuilt it with 15 city pages and rebuilt the Google Business Profile in September 2026. Ranking numbers go here when they come in.',
    stats: [
      { value: '30+', label: 'website pages, up from 5' },
      { value: '15', label: 'city pages across two counties' },
      { value: '5.0 ★', label: 'Google rating' },
    ],
    challenge:
      'Great reviews, but a 5-page website that gave Google very little to rank.',
    whatWeDid: [
      'Rebuilt the website with a page for every core service',
      'Added 15 city pages across Palm Beach and Broward counties',
      'Rebuilt the Google Business Profile: categories, description, and service areas',
      'Set up tracking for map rankings, calls, and website clicks',
    ],
    outcome: [
      'New website and Google profile went live in September 2026',
      'Results are still coming in, and real numbers will be posted here',
    ],
    services: ['Website', 'Local SEO', 'Google Business Profile'],
    proofMath: 'Before: 5 pages. After: 30+ pages including 15 city pages, live September 2026. Ranking numbers will be posted here, not projected.',
    visual: 'launch-timeline',
  },
  {
    slug: 'chick-fil-a-operator',
    client: 'A Chick-fil-A operator',
    trade: 'Restaurants',
    area: 'Two locations',
    status: 'in-progress',
    headlineStat: '2 restaurants',
    headlineLabel: 'working with one operator',
    title: 'AI consulting and professional development for a two-restaurant operator.',
    summary:
      'We work with the operator of two Chick-fil-A restaurants on where AI can take work off the leadership team, and train the team to use it day to day.',
    stats: [],
    challenge: 'Running two busy restaurants leaves little time for the office work behind them.',
    whatWeDid: [
      'AI consulting with the operator',
      'Professional development for the team on using AI at work',
    ],
    outcome: ['Ongoing engagement across both restaurants'],
    services: ['AI Consulting', 'Professional Development'],
    proofMath: '',
    note: 'Independent work for a franchise operator. Not affiliated with or endorsed by Chick-fil-A, Inc.',
    visual: 'launch-timeline',
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
