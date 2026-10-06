/**
 * Everything we do, in the two groups an owner cares about. The home page shows name + text;
 * the services page adds the detail line.
 */
export const serviceGroups = [
  {
    title: 'Get found on Google',
    intro: 'Show up when someone nearby searches for what you do.',
    items: [
      { name: 'Website', icon: 'globe', text: 'We build or fix your website so it shows up for your services in the towns you work in.', detail: 'A page for every service and every town you cover, built to load fast on a phone and get the visitor to call.' },
      { name: 'Google Business Profile', icon: 'pin', text: 'We set up and manage your profile so you show up on Google Maps.', detail: 'Categories, services, photos, and weekly posts, kept up for you so the map listing keeps working.' },
      { name: 'Google reviews', icon: 'star', text: 'Every customer gets a review request by text.', detail: 'Customers get a direct link while the visit is still fresh, so reviews come in without you having to ask.' },
    ],
  },
  {
    title: 'Get hours back with AI',
    intro: 'Hand off the office work that eats your nights and weekends.',
    items: [
      { name: 'Call answering', icon: 'phone', text: 'Calls get answered and missed calls get a text back while you are busy with a customer.', detail: 'The caller gets a reply in seconds instead of calling the next business on the list.' },
      { name: 'Lead follow-up', icon: 'message', text: 'New leads and open quotes get a text or an email until they book or say no.', detail: 'Every estimate you send gets chased, even on your busiest week.' },
      { name: 'Reports and paperwork', icon: 'spark', text: 'AI drafts your reports, estimates, and invoices.', detail: 'You check it and send it. The typing is already done.' },
      { name: 'Lead dashboard', icon: 'chart', text: 'Every lead and customer in one place.', detail: 'See where each lead came from and who still needs a call back.' },
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
