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
  /** Optional "one missed call" walk-through. An example, not a statistic. */
  timeline?: { title: string; steps: { time: string; text: string }[]; after: string };
  relatedCase?: string; // case study slug, when one is relevant
  priceNote: string;
  faqs: { q: string; a: string }[];
  icon: 'globe' | 'pin' | 'spark' | 'phone' | 'star' | 'message' | 'chart';
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
    relatedCase: 'paver-contractor',
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
    relatedCase: 'paver-contractor',
    priceNote: 'Google Business Profile management is included in the monthly plan, after a one-time website build. Fixed quote in writing after a free call. Month-to-month.',
    faqs: [
      { q: 'Can you guarantee #1 on Google?', a: 'No, and be wary of anyone who does. Google decides rankings. We control the work: a complete profile, steady reviews, and a site that backs it up.' },
      { q: 'How long does it take to see movement?', a: 'It depends on your town and your competition. Profile fixes can show movement within weeks; bigger ranking gains usually take a few months of steady work.' },
      { q: 'Do I need a new website too?', a: `A strong site helps your profile rank, which is why the plan starts with a custom website build.` },
    ],
    icon: 'pin',
  },
  {
    slug: 'google-reviews',
    pillar: 'Get seen on Google',
    name: 'Google Review Requests',
    navLabel: 'Google Reviews',
    metaTitle: 'Google Review Requests for Home Service Businesses | Palm Beach AI',
    metaDescription:
      'Get more Google reviews without having to ask. After every job your customer gets a text with a one-tap review link. Set up for home service businesses in Palm Beach County.',
    eyebrow: 'Google reviews · Palm Beach County',
    headline: 'More Google reviews, *without having to ask*.',
    subhead:
      'Most happy customers will leave a review if someone asks at the right time and makes it easy. After every job, your customer gets a short text with a link that opens your Google review box in one tap. You finish the job and the request goes out for you.',
    outcomes: [
      { title: 'A request after every job', text: 'The text goes out when the job is marked done, so no customer gets skipped on a busy week.' },
      { title: 'One tap to review', text: 'The link opens the review box on your Google profile. No searching for your business name.' },
      { title: 'A profile that looks active', text: 'New reviews coming in every month help homeowners trust you and help Google see you are still in business.' },
    ],
    included: [
      'Review request text sent after every finished job',
      'A direct link to the review box on your Google profile',
      'One polite reminder if they have not left a review',
      'Message written in your voice and approved by you',
      'Help replying to reviews, good and bad',
      'The same request by email when you have an address on file',
      'Text registration with the phone carriers handled for you',
      'Review count and rating in your monthly check-in',
    ],
    process: [
      { title: 'Connect', text: 'We link your Google profile and set up the review link.' },
      { title: 'Write', text: 'We write the request and the reminder in your voice. You approve both.' },
      { title: 'Trigger', text: 'The text goes out when you mark a job done, or from a list you send us each week.' },
      { title: 'Reply', text: 'New reviews get a reply, and we go over the numbers with you every month.' },
    ],
    priceNote: 'Review requests are included in the monthly plan. Fixed quote in writing after a free call. Month-to-month.',
    faqs: [
      { q: 'Do you only send the link to happy customers?', a: 'No. Every customer gets the same link. Google does not allow businesses to filter who gets asked, and profiles that do it can lose their reviews.' },
      { q: 'What if I get a bad review?', a: 'It happens to every business. We help you write a calm, short reply, and a steady flow of good reviews keeps one bad one from standing out.' },
      { q: 'Can you get reviews from my past customers?', a: 'Yes. Send us a list of recent customers and we send the request in small batches, so the reviews come in at a natural pace.' },
      { q: 'Is it legal to text my customers?', a: 'Yes, when it is set up properly. Phone carriers require a business to register before it sends texts, and customers have to be able to opt out. We handle the registration and build the opt-out in.' },
    ],
    icon: 'star',
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
    headline: 'Get hours of office work *off your plate*.',
    subhead:
      'AI tools that handle the reports, estimates, invoices, and follow-up that eat your week, plus a text back for every missed call. For a mold inspection company, one of these tools cut each report from 45 minutes to 10. It is set up for you by the same person who gets your phone ringing from Google.',
    outcomes: [
      { title: 'Less paperwork', text: 'AI drafts your reports, invoices, and estimates, so you review them instead of writing them from scratch.' },
      { title: 'Follow-up that goes out on time', text: 'Quotes, reminders, and check-ins get sent by text and email, even on your busiest weeks.' },
      { title: 'Every missed call gets a text', text: 'Within seconds, so the customer hears from you before they call the next company.' },
    ],
    included: [
      'CRM setup on GoHighLevel: pipeline, unified inbox, calendar',
      'Missed-call text-back',
      'Lead follow-up sequences by text + email',
      'Automated review requests',
      'Invoicing + payment reminder automation',
      'AI answering service for after-hours + overflow calls (custom quote)',
      'Custom AI workflows with Claude, ChatGPT, or Grok',
      'Custom tools built around your process, like the report system we built for a mold inspection company',
    ],
    process: [
      { title: 'Map it', text: 'We find where leads slip and where your hours go, and pick the highest-payoff fix first.' },
      { title: 'Build it', text: 'We set up the CRM and automations in your accounts. You own them.' },
      { title: 'Test it', text: 'We run real scenarios with you until it works the way you run your business.' },
      { title: 'Tune it', text: 'We watch the numbers monthly and keep improving what is working.' },
    ],
    relatedCase: 'mold-inspection-company',
    priceNote: `Review automation and lead follow-up are included in the monthly plan. CRM/GoHighLevel setup, custom AI workflows, and the AI Workday Install are quoted per project.`,
    faqs: [
      { q: 'What is GoHighLevel?', a: 'An all-in-one CRM: contacts, texting, calendar, pipeline, and automations in one place. We set it up and run it for you.' },
      { q: 'Will AI sound robotic to my customers?', a: 'We write every message in your voice and keep it short and human. You approve it before it goes live.' },
      { q: 'Do I need to be good with tech?', a: 'No. We build it, test it, and show you the few things you need to know.' },
      { q: 'Is it legal to text my customers automatically?', a: 'Yes, when it is set up properly. Phone carriers require a business to register before it sends texts, and customers have to be able to opt out. We handle the registration during setup and build the opt-out in.' },
    ],
    icon: 'spark',
  },
  {
    slug: 'lead-follow-up',
    pillar: 'Get your time back with AI',
    name: 'Lead Follow-Up',
    navLabel: 'Lead Follow-Up',
    metaTitle: 'Lead Follow-Up by Text and Email for Contractors | Palm Beach AI',
    metaDescription:
      'Automatic lead follow-up for home service businesses. New leads get an answer in seconds, and open quotes get a text or email on schedule until they book or say no.',
    eyebrow: 'Lead follow-up · Text and email',
    headline: 'Every lead gets followed up, *even on your busiest week*.',
    subhead:
      'Most lost jobs are not lost to a better price. They are lost because nobody called back. We set up texts and emails that answer a new lead in seconds and keep checking in on open quotes, so you only step in when the customer is ready to talk.',
    outcomes: [
      { title: 'A fast first answer', text: 'A new lead from your website, an ad, or a missed call gets a reply in seconds, at any hour.' },
      { title: 'Quotes that do not go cold', text: 'Open estimates get a check-in by text or email on a schedule you choose, until they book or say no.' },
      { title: 'Past customers come back', text: 'Reminders for seasonal work and maintenance go out on their own.' },
    ],
    included: [
      'Instant text reply to every new lead',
      'Missed-call text-back',
      'Follow-up sequence for open quotes, by text and email',
      'Appointment confirmations and reminders',
      'Seasonal and maintenance reminders for past customers',
      'One inbox for texts, emails, and form messages',
      'Every message written in your voice and approved by you',
      'Text registration with the phone carriers handled for you',
    ],
    process: [
      { title: 'Map it', text: 'We look at where your leads come from and where they stop hearing from you.' },
      { title: 'Write it', text: 'We write each message the way you would say it. You approve them before anything goes out.' },
      { title: 'Turn it on', text: 'We connect your forms, your phone line, and your calendar, then test it with you.' },
      { title: 'Tune it', text: 'Every month we look at which messages get replies and change the ones that do not.' },
    ],
    priceNote: 'Lead follow-up is included in the monthly plan. Fixed quote in writing after a free call. Month-to-month.',
    faqs: [
      { q: 'Will my customers feel spammed?', a: 'No. The messages are short, spaced out, and stop the moment someone books, replies, or asks to opt out.' },
      { q: 'Will it sound like a robot?', a: 'We write every message in your voice and keep it to a sentence or two. You approve them before they go live.' },
      { q: 'What happens when a customer replies?', a: 'The reply comes to your phone and your inbox, and the automatic messages to that person stop so you can take it from there.' },
      { q: 'Is it legal to text my leads automatically?', a: 'Yes, when it is set up properly. Phone carriers require a business to register before it sends texts, and customers have to be able to opt out. We handle the registration and build the opt-out in.' },
    ],
    icon: 'message',
  },
  {
    slug: 'lead-dashboard',
    pillar: 'Know your numbers',
    name: 'Lead and Job Dashboard',
    navLabel: 'Lead Dashboard',
    metaTitle: 'Lead Tracking Dashboard for Home Service Businesses | Palm Beach AI',
    metaDescription:
      'One dashboard for your leads, follow-ups, booked jobs, and revenue, so you can see which marketing brings in work. Set up for home service businesses in Palm Beach County.',
    eyebrow: 'Lead tracking · Jobs and revenue in one place',
    headline: 'See where your jobs *come from*.',
    subhead:
      'If your leads live in texts, voicemails, and a notebook in the truck, you cannot tell what is working. We set up one dashboard that shows every lead, who has been followed up with, which jobs you won, and what each source of leads brought in.',
    outcomes: [
      { title: 'Every lead in one place', text: 'Calls, website forms, ads, and Google messages all land in the same list.' },
      { title: 'Know what is working', text: 'See how many leads and booked jobs came from Google, from ads, and from referrals.' },
      { title: 'Nothing falls through', text: 'Each lead shows whether it was answered, quoted, won, or lost, so you know who to call today.' },
    ],
    included: [
      'Dashboard set up on GoHighLevel, in an account you own',
      'Your existing contacts and leads imported',
      'Leads from calls, forms, and ads added automatically',
      'A simple pipeline: new, quoted, won, lost',
      'Job value recorded when a job is won',
      'Revenue by lead source, next to what you spent on marketing',
      'A phone app so you can check it from the truck',
      'A short walkthrough so you and your office know how to use it',
    ],
    process: [
      { title: 'Set up', text: 'We build the dashboard and bring in your current contacts.' },
      { title: 'Connect', text: 'We link your phone line, website forms, and ads so new leads show up on their own.' },
      { title: 'Show you', text: 'We walk you through it in about 20 minutes and adjust it to how you work.' },
      { title: 'Review', text: 'Every month we go over the numbers together and decide what to do more of.' },
    ],
    priceNote: 'Dashboard setup is quoted per business after a free call, based on how many tools need to connect. Month-to-month.',
    faqs: [
      { q: 'Do I have to type everything in?', a: 'No. Leads come in on their own. The only thing you do is mark a job won or lost and enter what it was worth, which takes a few seconds.' },
      { q: 'I already use Jobber or Housecall Pro. Do I need this?', a: 'Maybe not. Those tools are good at scheduling and invoicing. On the call we look at what you already have and only add what is missing.' },
      { q: 'Who owns the data?', a: 'You do. The account is in your name and your contacts stay yours if we stop working together.' },
      { q: 'Do I need to be good with tech?', a: 'No. We set it up, show you the two or three screens you need, and stay available when you have a question.' },
    ],
    icon: 'chart',
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
    headline: 'An answering service for contractors that *books the job*.',
    subhead:
      'You cannot pick up while you are on a roof, driving, or asleep. Our AI answering service picks up for you, 24/7, in a natural voice: it answers common questions, books the job, and texts you the details. It is set up by the same person who gets your phone ringing from Google.',
    timeline: {
      title: 'One missed call, minute by minute',
      steps: [
        { time: '2:14 PM', text: 'A homeowner’s AC stops cooling. They search Google and call you.' },
        { time: '2:14 PM', text: 'You are on a ladder at another job. The call rings out to voicemail.' },
        { time: '2:15 PM', text: 'They hang up without leaving a message and call the next company on the list.' },
        { time: '2:17 PM', text: 'That company picks up and books the visit.' },
        { time: '5:30 PM', text: 'You see the missed call and call back. They already have someone coming.' },
      ],
      after: 'With the answering service, the 2:14 call gets picked up, the visit goes on your calendar, and you get a text with the address and the problem. This is an example of how it goes, not a statistic.',
    },
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
    relatedCase: 'mold-inspection-company',
    priceNote: 'The AI answering service is quoted per business, based on call volume and how much it should handle. Missed-call text-back is already included in the monthly plan.',
    faqs: [
      { q: 'Will callers know it is AI?', a: 'It sounds natural and polite, and we do not pretend it is a person if someone asks. Most callers just care that someone answered and their job got booked.' },
      { q: 'What happens with emergencies?', a: 'You decide what counts as an emergency, such as no AC in August, a burst pipe, a gas smell, or sparking. When a caller says one of those, the call gets transferred to you or your on-call tech right away.' },
      { q: 'What if it books the wrong job?', a: 'It only books the kinds of jobs and the time slots you approve during setup. Anything it is unsure about comes to you as a message to call back, instead of landing on your calendar.' },
      { q: 'Can it cover only nights and weekends?', a: 'Yes. If you would rather answer your own phone during the day, forward calls only after hours, or only when you do not pick up.' },
      { q: 'Do I have to change my phone number?', a: 'No. The number on your trucks, your website, and your Google profile stays the same. You forward missed or after-hours calls to the AI line.' },
      { q: 'Is this different from an answering service?', a: 'A traditional answering service takes a message. The AI can answer questions, qualify the job, and book it on your calendar, any hour of the day.' },
    ],
    icon: 'phone',
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
