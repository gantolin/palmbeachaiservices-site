/**
 * CASE STUDIES. Exact numbers only. Never round up or embellish.
 * TODO(Gene): add owner quotes (with permission), before/after screenshots, and photos
 * to /public/images/results/ and reference them here.
 */
export interface CaseStudy {
  slug: string;
  client: string;
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
    slug: 'safe-haven-inspections',
    client: 'Safe Haven Inspections',
    trade: 'Mold inspection',
    area: 'Martin, Palm Beach & Broward counties',
    status: 'result',
    headlineStat: '78%',
    headlineLabel: 'less time per inspection report',
    title: 'From 45 minutes to 10 minutes per inspection report.',
    summary:
      'A custom automation turned the slowest part of every mold inspection, writing the report, into a 10-minute job. That time goes back into booking more inspections.',
    stats: [
      { value: '45 → 10 min', label: 'Report time, per inspection' },
      { value: '78%', label: 'Reduction in report time', countTo: 78, suffix: '%' },
      { value: '35 min', label: 'Saved on every single report', countTo: 35, suffix: ' min' },
    ],
    challenge:
      'Every inspection ended with the same bottleneck: about 45 minutes of writing and formatting the report. That time capped how many jobs could fit in a week.',
    whatWeDid: [
      'Built a custom automation that does the heavy lifting on every inspection report',
      'Designed and built a new website',
      'Set up and optimized the Google Business Profile',
    ],
    outcome: [
      'Report time dropped from 45 minutes to 10 minutes, a 78% reduction',
      'Freed-up time goes back into taking more inspection jobs',
    ],
    timeMath: 'Every 10 reports saves about 5.8 hours. That is time for more jobs, not more paperwork.',
    proofMath: '45 min − 10 min = 35 min saved per report (78%). × 10 reports ≈ 5.8 hrs back. Source: report time before vs. after the automation.',
    services: ['AI Automation', 'Website', 'Google Business Profile'],
    visual: 'report-time',
  },
  {
    slug: 'heros-pavers',
    client: "Hero's Pavers",
    trade: 'Paver & hardscape contractor',
    area: 'Lake Worth Beach',
    status: 'result',
    headlineStat: '#2–#3',
    headlineLabel: 'on Google for multiple Lake Worth keywords',
    title: 'Ranking #2 to #3 on Google for multiple Lake Worth keywords.',
    summary:
      "An SEO-focused website rebuild plus a fully optimized Google Business Profile put Hero's Pavers near the top of Google for the searches that bring paver jobs in Lake Worth.",
    stats: [
      { value: '#2–#3', label: 'Google position for multiple Lake Worth keywords' },
      { value: 'Rebuilt', label: 'SEO website, built to rank locally' },
      { value: 'Optimized', label: 'Google Business Profile' },
    ],
    challenge:
      'Great work, but not enough visibility. When Lake Worth homeowners searched for paver and hardscape help, Hero\u2019s Pavers needed to show up near the top instead of below the competition.',
    whatWeDid: [
      'Rebuilt the website from the ground up with a local SEO structure',
      'Built the pages around the Lake Worth searches that bring in paver jobs',
      'Optimized the Google Business Profile',
    ],
    outcome: [
      'Now ranks #2 to #3 on Google for multiple Lake Worth keywords',
      'A modern website built to turn those searches into calls',
    ],
    services: ['Website', 'Local SEO', 'Google Business Profile'],
    proofMath: 'Google positions #2 to #3 for multiple Lake Worth keywords after the SEO website rebuild + Google Business Profile optimization.',
    visual: 'rank-ladder',
  },
  {
    slug: 'next-level-air-conditioning',
    client: 'Next Level Air Conditioning',
    trade: 'HVAC contractor',
    area: 'Lake Worth & Palm Beach County',
    status: 'in-progress',
    headlineStat: '5 → 30+',
    headlineLabel: 'website pages, results in progress',
    title: 'A 5-page site rebuilt into 30+ pages, with a Google profile to match.',
    summary:
      'Next Level had 31 five-star reviews and still did not show up in the top 20 map results in its own city. We rebuilt the website and the Google Business Profile in September 2026. Rankings take time, so we will post real numbers here when they come in.',
    stats: [
      { value: '5 → 30+', label: 'Website pages, including 15 city pages' },
      { value: '5.0 ★', label: 'Google rating, 34 reviews' },
      { value: 'Tracking', label: 'Map rankings, calls, and website clicks' },
    ],
    challenge:
      'Great reviews, but a 5-page website and a Google profile that was mostly empty: one photo, no description, no services, and a single category. In live map searches across Lake Worth, Greenacres, and Boynton Beach, competitors with a fraction of the reviews ranked while Next Level did not appear in the top 20.',
    whatWeDid: [
      'Rebuilt the website with a page for every core service',
      'Added 15 city pages across Palm Beach and Broward counties',
      'Rebuilt the Google Business Profile: categories, description, and service areas',
      'Set up tracking so we can report real results, not guesses',
    ],
    outcome: [
      'New website and Google profile went live in September 2026',
      'Now tracking map rankings, calls, and website clicks. We will update this page with real numbers as they come in',
    ],
    services: ['Website', 'Local SEO', 'Google Business Profile'],
    proofMath: 'Before: 5 pages, 1 profile photo, 1 category, not in the top 20 map results in 4 live searches (Aug 2026). After numbers will be posted here, not projected.',
    visual: 'launch-timeline',
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
