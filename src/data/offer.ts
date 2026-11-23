/**
 * Everything we do to get a local business found on Google. The home page shows name + text;
 * the services page adds the detail line.
 */
export const serviceGroups = [
  {
    title: 'Get found on Google',
    intro: 'Show up when someone nearby searches for what you do.',
    items: [
      { name: 'SEO optimized website', icon: 'globe', text: 'We build or fix your website so it shows up for your services in the towns you work in.', detail: 'A page for every service and every town you cover, built to load fast on a phone and get the visitor to call.' },
      { name: 'Optimized Google Business Profile', icon: 'pin', text: 'We set up and manage your profile so you show up on Google Maps.', detail: 'Categories, services, photos, and weekly posts, kept up for you so the map listing keeps working.' },
      { name: 'Paid ads', icon: 'zap', text: 'We set up and run your paid ads so new customers find you right away.', detail: 'We build the campaigns, watch the spend, and show you what each lead cost.' },
      { name: 'Google review management', icon: 'star', text: 'Every customer gets a review request by text.', detail: 'Customers get a direct link while the visit is still fresh, so reviews come in without you having to ask.' },
    ],
  },
] as const;

/** The kinds of businesses we work with, shown on every main page. */
export const trades = [
  'Plumbers',
  'Electricians',
  'HVAC',
  'Roofers',
  'Painters',
  'House cleaners',
  'Landscapers',
  'Paver contractors',
  'Pool service',
  'Pest control',
  'Mold inspectors',
  'Restaurants',
  'Medical offices',
] as const;
