import { priceLine } from './pricing';
export const comparisonRows: { label: string; us: string; them: string }[] = [
  { label: 'Pricing', us: `${priceLine}, published`, them: '"Let\u2019s hop on a call" pricing' },
  { label: 'Contract', us: 'Month-to-month', them: 'Often 6 to 12 month lock-ins' },
  { label: 'Who you talk to', us: 'The founder, locally, in Palm Beach County', them: 'Account manager #4, often out of state' },
  { label: 'Website launch', us: 'Live in 14 days', them: 'Often weeks or months' },
  { label: 'Lead response', us: 'Missed calls texted back in seconds', them: 'Not their problem' },
  { label: 'Reviews + lead follow-up', us: 'Automated, included in the plan', them: 'Separate vendor, separate bill' },
  { label: 'What we measure', us: 'Calls, reviews, and booked jobs', them: 'Impressions and "reach"' },
  { label: 'Reporting', us: 'Plain English, every month', them: 'Dashboards full of jargon' },
  { label: 'Who owns the work', us: 'You do. 100%. Leave and keep it all', them: 'Often theirs until you pay to leave' },
  { label: 'Guarantee', us: 'Live in 14 days or month one is free', them: 'Vague promises, long lock-in' },
];

export const industries = [
  'Pavers & hardscape',
  'Mold inspection & remediation',
  'Roofing',
  'HVAC & plumbing',
  'Pool service',
  'Landscaping & lawn care',
  'Pressure washing',
  'Electrical',
  'Medical & professional practices',
];
