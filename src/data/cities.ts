/**
 * City landing pages, rendered by src/pages/[city].astro at /seo-company-<slug>/.
 *
 * Rule (docs/keyword-map.md): a city only gets a page if it carries local substance that would stop being true
 * if you swapped the city name. Market facts come from the sourced city dossiers researched for Next Level AC
 * (Claude/next-level-ac/research/city-pages/dossiers/, ACS 2024 5-year census data). Drive figures are OSRM
 * free-flow (no traffic) from the office to the Census place center, pulled 2026-09-28.
 */
import { SITE } from '../config/site';

export interface Reason { icon: string; title: string; text: string }
export interface Faq { q: string; a: string }

export interface City {
  /** URL slug after /seo-company-. */
  slug: string;
  name: string;
  /** schema.org areaServed type. */
  placeType: 'City' | 'AdministrativeArea';
  seoTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroLede: string;
  whyTitle: string;
  whyText: string;
  /** First "why us" card; the other three are shared. */
  localReason: Reason;
  /** Local market section. Optional so a city can launch without it, but every new city should have one. */
  market?: {
    title: string;
    paragraphs: string[];
    stats: { value: string; label: string }[];
    neighborhoods: string[];
    gettingThere: string;
    sourceNote: string;
  };
  faqs: Faq[];
}

export const cityPath = (c: Pick<City, 'slug'>) => `/seo-company-${c.slug}/`;

export const sharedReasons: Reason[] = [
  { icon: 'users', title: 'Built for home service businesses', text: 'HVAC, plumbing, roofing, pavers, pest control, pool service, inspections. We know how homeowners search when something breaks.' },
  { icon: 'receipt', title: 'Your price in writing', text: 'One build fee, then one flat monthly price, quoted in writing before any work starts. No contract, no setup surprises, no surprise invoices.' },
  { icon: 'key', title: 'You own everything', text: 'Your website, domain, Google Business Profile, and customer data stay yours. If you leave, it all goes with you.' },
];

const censusNote = 'Sources: U.S. Census Bureau, American Community Survey 2024 5-year estimates; drive distance from our office via OSRM, no traffic.';

export const cities: City[] = [
  {
    // Targets "seo company west palm beach" (590/mo, KD 11), "seo west palm beach" (480, KD 7),
    // "local seo west palm beach" (260, KD 10), "web design west palm beach" (480, KD 13). Semrush US, 2026-09-26.
    slug: 'west-palm-beach',
    name: 'West Palm Beach',
    placeType: 'City',
    seoTitle: 'SEO Company in West Palm Beach for Home Service Businesses',
    metaDescription: `A local SEO company for West Palm Beach home service businesses. Google Maps rankings, websites that rank, and AI follow-up. No contract. Based in Royal Palm Beach.`,
    heroTitle: 'The West Palm Beach SEO company that gets *home service* businesses seen.',
    heroLede: `When a homeowner in West Palm Beach searches for what you do, the businesses at the top of Google Maps get the call. We get you there with local SEO, a website that ranks, and AI that answers every lead. Run by ${SITE.founder} from ${SITE.homeBase}.`,
    whyTitle: 'Local SEO in West Palm Beach, *without* the agency runaround.',
    whyText: 'West Palm Beach is crowded. Search for an AC repair company or a plumber downtown and you will see national chains, lead-gen sites, and companies from three towns over. Ranking here takes a complete Google Business Profile, a steady stream of reviews, a website with a real page for every service, and links from other local sites. That is exactly what our plan covers.',
    localReason: { icon: 'pin', title: 'Local, not a call center', text: `Our office is in ${SITE.homeBase}, just west of West Palm Beach. You deal with ${SITE.founder}, the person doing the work, and we can meet in person.` },
    market: {
      title: 'Half the city rents. *Plan* for who actually hires you.',
      paragraphs: [
        'Only about half of West Palm Beach homes are owner-occupied, well below the county rate of 70 percent, and almost a third sit in buildings with 20 or more units. A lot of your calls come from landlords, property managers, and condo associations, not just homeowners. They compare reviews, they want a fast answer, and they hire again if you show up. Your website and Google profile should speak to them as clearly as to the homeowner.',
        'The mailing address also stretches well past the city. Westgate, Haverhill, and parts of The Acreage all get "West Palm Beach" addresses without being in the city. People there search for West Palm Beach businesses, so we set up your service area and your pages around where your customers live, not where the city line falls.',
      ],
      stats: [
        { value: '122,290', label: 'Residents, the largest city in Palm Beach County' },
        { value: '51%', label: 'Of homes owner-occupied (county: 70%)' },
        { value: '31%', label: 'Of homes in buildings with 20+ units' },
        { value: '1988', label: 'Median year homes were built' },
      ],
      neighborhoods: ['Downtown', 'El Cid', 'Flamingo Park', 'Grandview Heights', 'Old Northwood', 'Northwood Shores', 'South End', 'Villages of Palm Beach Lakes', 'Bear Lakes', 'Ibis', 'Baywinds', 'Andros Isle'],
      gettingThere: `We are about 11 miles from downtown West Palm Beach, straight east on Okeechobee or Southern Blvd. It is the closest big market to our ${SITE.homeBase} office, so meeting on site is easy.`,
      sourceNote: censusNote,
    },
    faqs: [
      { q: 'Do you only work with West Palm Beach businesses?', a: `No. We are based in ${SITE.homeBase} and work across Palm Beach County, from Jupiter to Boca Raton, plus Martin and Broward counties. West Palm Beach is one of the most competitive markets we cover, so it gets its own page.` },
      { q: 'How much does SEO cost in West Palm Beach?', a: `Agency retainers in South Florida often run into the thousands per month. It depends on your trade, how many towns you want to show up in, and where your Google profile and website start today. After a free 30-minute call you get a fixed quote in writing: a one-time website build, then one flat monthly plan. No contract. The monthly plan covers a website built to rank, Google Business Profile management, review automation, lead follow-up, citations and links, and competitor tracking.` },
      { q: 'How long until I show up higher on Google Maps?', a: 'Profile fixes can move you within weeks. Competitive West Palm Beach searches usually take a few months of steady work: reviews, a stronger website, and local links. We report the real numbers every month.' },
      { q: 'Can you guarantee a #1 ranking?', a: 'No, and be careful with anyone who does. Google decides rankings. We guarantee the work we control, like having your site live in 14 days or your first month is free.' },
      { q: 'Do you also build websites in West Palm Beach?', a: 'Yes. Every plan starts with a fast, custom website built around the services you sell and the towns you serve, because a strong site is what backs up your Google Maps ranking.' },
    ],
  },
  {
    // Targets "seo wellington" (170/mo, KD 3). Semrush US, 2026-09-27.
    slug: 'wellington',
    name: 'Wellington',
    placeType: 'City',
    seoTitle: 'SEO Company in Wellington, FL for Home Service Businesses',
    metaDescription: `Local SEO for Wellington, FL home service businesses from a team 7 miles away in Royal Palm Beach. Google Maps rankings, websites that rank, AI follow-up. No contract.`,
    heroTitle: 'Wellington SEO from the team *next door*.',
    heroLede: `Wellington homeowners pick from the three businesses Google Maps puts in front of them. We get your company into that top three with local SEO, a website that ranks, and AI that answers every lead. Run by ${SITE.founder}, about 7 miles away in ${SITE.homeBase}.`,
    whyTitle: 'Most of the agencies ranking for Wellington SEO are *nowhere near* Wellington.',
    whyText: 'Search "SEO Wellington FL" and you get agency pages from the other side of the state, a directory or two, and a freelancer overseas. None of them know that Olympia has gates on Forest Hill Blvd and Lyons Rd, or that the equestrian side of the Village empties out in summer. We live and work next door, and we build your Google presence around how Wellington actually runs.',
    localReason: { icon: 'pin', title: 'Seven miles away', text: `Our office is in ${SITE.homeBase}, about 7 miles from Wellington. You work with ${SITE.founder} directly, and we can meet at your shop or on a job.` },
    market: {
      title: 'Homeowners, not landlords. *Three* build eras.',
      paragraphs: [
        'About 76 percent of Wellington homes are owned by the people living in them, and 71 percent are single-family houses, the highest share of any city we cover with its own page. The person who calls you is usually the person who pays, and they read your reviews before they pick up the phone.',
        'The housing splits cleanly by neighborhood. The South Shore plats, Eastwood, and Sugar Pond Manor date to the late 1970s and 1980s. Olympia, VillageWalk, and Versailles went up from 2002 to 2007. Then there is the equestrian side, from Palm Beach Point to Grand Prix Village, where the Winter Equestrian Festival fills the area January through March. Each of those is a different job and a different search, so we give each one its own place on your website.',
        'One more thing that trips up Google profiles here: many "Lake Worth" addresses west of the Turnpike are not Wellington, and part of Royal Palm Beach shares the 33414 ZIP. We set your service area by the places people actually say.',
      ],
      stats: [
        { value: '62,146', label: 'Residents, the most populous village in Florida' },
        { value: '76%', label: 'Of homes owner-occupied (county: 70%)' },
        { value: '71%', label: 'Single-family detached homes' },
        { value: '1995', label: 'Median year homes were built' },
      ],
      neighborhoods: ['The 12th Fairway', 'Eastwood', 'Sugar Pond Manor', 'Greenview Shores', 'Olympia', 'VillageWalk of Wellington', 'Versailles', 'Binks Forest', 'Aero Club', 'Palm Beach Polo', 'Grand Prix Village', 'Rustic Ranches', 'Palm Beach Point'],
      gettingThere: 'About 7 miles from our office, down State Road 7 or Big Blue Trace. Wellington is right next door, so an in-person meeting is never a hassle.',
      sourceNote: `${censusNote} Neighborhood build eras from the Palm Beach County parcel roll.`,
    },
    faqs: [
      { q: 'Do you actually work in Wellington?', a: `Yes. Our office is in ${SITE.homeBase}, about 7 miles away, and Wellington is part of our home market. We can meet in person, and we know the difference between Olympia, Sugar Pond Manor, and the equestrian side of the Village.` },
      { q: 'How much does SEO cost for a Wellington business?', a: 'It depends on your trade, how many towns you want to show up in, and where your Google profile and website start today. After a free 30-minute call you get a fixed quote in writing: a one-time website build, then one flat monthly plan. No contract. The monthly plan covers a website built to rank, Google Business Profile management, review automation, lead follow-up, citations and links, and competitor tracking.' },
      { q: 'My customers say they live in Wellington but their address says Lake Worth. Does that matter?', a: 'It matters for how you set up your Google profile and website. Many Lake Worth 33467 and 33449 addresses west of the Turnpike are unincorporated, not Wellington, but those homeowners still search for Wellington businesses. We set your service area and pages to cover both, so you do not miss them.' },
      { q: 'Business drops off in the summer. Is SEO still worth it?', a: 'Yes, and summer is a good time to start. Google rankings build over months, so work done in the slow season pays off when the equestrian crowd and the seasonal residents come back in the winter.' },
      { q: 'Can you guarantee I will rank #1 in Wellington?', a: 'No, and nobody honest can. Google decides rankings. We guarantee the work we control, like having your site live in 14 days or your first month is free, and we show you the real numbers every month.' },
    ],
  },
  {
    // Targets "seo palm beach gardens" (110/mo). Semrush US, 2026-09-27.
    slug: 'palm-beach-gardens',
    name: 'Palm Beach Gardens',
    placeType: 'City',
    seoTitle: 'SEO Company in Palm Beach Gardens for Home Service Businesses',
    metaDescription: `Local SEO for Palm Beach Gardens home service businesses. Google Maps rankings, websites that rank, and AI follow-up for the gated-community market. No contract.`,
    heroTitle: 'Palm Beach Gardens SEO that gets you *past the gate*.',
    heroLede: `In Palm Beach Gardens, the homeowner, the HOA, and the club manager all look you up on Google before you get a gate pass. We make sure what they find is good: a strong map ranking, a website that ranks, and AI that answers every lead. Run by ${SITE.founder} from ${SITE.homeBase}.`,
    whyTitle: 'A newer, gated city needs a *different* kind of local SEO.',
    whyText: 'Palm Beach Gardens was planned as a garden city, and it still builds like one. Much of the housing is newer and sits behind gates at PGA National, BallenIsles, Mirasol, and Old Palm. Reviews and referrals move fast inside those communities, and the businesses that win are the ones that look established on Google. That is what we build for you.',
    localReason: { icon: 'pin', title: 'Local, up the Turnpike', text: `Our office is in ${SITE.homeBase}, about 20 miles from Palm Beach Gardens. You work with ${SITE.founder} directly, and we can meet in person.` },
    market: {
      title: 'Newer homes, *gated* communities, one big city.',
      paragraphs: [
        'Palm Beach Gardens is one of the newest housing markets in the county. The median home was built in 1995, the 2000s were the biggest building decade, and about 73 percent of homes are owner-occupied. Newer homes usually mean fewer emergency calls and more upgrades, maintenance plans, and warranty-minded buyers who compare you carefully.',
        'It is also a big city on the map, stretching from near the Intracoastal to Avenir, west of the Beeline, a planned community of about 3,900 homes. Two ZIP codes, 33410 and 33418, are shared with Jupiter, and some unincorporated pockets carry Gardens addresses. We build your service area and city pages so you show up across all of it, not just near PGA Blvd.',
      ],
      stats: [
        { value: '60,959', label: 'Residents' },
        { value: '1995', label: 'Median year homes were built' },
        { value: '73%', label: 'Of homes owner-occupied (county: 70%)' },
        { value: '9.5%', label: 'Of homes in 20+ unit buildings (county: 19%)' },
      ],
      neighborhoods: ['PGA National', 'BallenIsles', 'Mirasol', "Frenchman's Reserve", 'Old Palm Golf Club', 'Evergrene', 'Lake Catherine', 'PGA Estates', 'Avenir'],
      gettingThere: 'About 20 miles from our office, up Florida\'s Turnpike or I-95 to PGA Blvd. We meet clients in the Gardens in person.',
      sourceNote: censusNote,
    },
    faqs: [
      { q: 'Do you work with Palm Beach Gardens businesses?', a: `Yes. We are based in ${SITE.homeBase}, about 20 miles away, and cover Palm Beach Gardens along with Jupiter, Tequesta, and North Palm Beach. We meet in person.` },
      { q: 'How much does SEO cost in Palm Beach Gardens?', a: 'It depends on your trade, how many towns you want to show up in, and where your Google profile and website start today. After a free 30-minute call you get a fixed quote in writing: a one-time website build, then one flat monthly plan. No contract. The monthly plan covers a website built to rank, Google Business Profile management, review automation, lead follow-up, citations and links, and competitor tracking.' },
      { q: 'Most of my customers are in gated communities. Does local SEO still help?', a: 'Yes. People inside PGA National or Mirasol still search Google Maps when they need a contractor, and they check your reviews before they ask the gate to let you in. A strong profile and a steady flow of recent reviews matter more here, not less.' },
      { q: 'I also work in Jupiter. Do I need separate pages?', a: 'Usually, yes. Palm Beach Gardens and Jupiter share two ZIP codes, but people search them as different towns. We give each town you serve its own real page, so Google knows you cover both.' },
      { q: 'How long does it take to see results?', a: 'Profile fixes can move you in a few weeks. Competitive searches take a few months of steady reviews, content, and local links. We report the real numbers every month, good or bad.' },
    ],
  },
  {
    // Targets "seo jupiter fl" (140/mo). Semrush US, 2026-09-27.
    slug: 'jupiter',
    name: 'Jupiter',
    placeType: 'City',
    seoTitle: 'SEO Company in Jupiter, FL for Home Service Businesses',
    metaDescription: `Local SEO for Jupiter, FL home service businesses, from the coast to Jupiter Farms. Google Maps rankings, websites that rank, and AI follow-up. No contract.`,
    heroTitle: 'Jupiter SEO for the coast *and* the Farms.',
    heroLede: `Jupiter is two markets that share one name. We help home service businesses show up in both, with local SEO, a website that ranks, and AI that answers every lead, including the snowbird who calls from up north. Run by ${SITE.founder} from ${SITE.homeBase}.`,
    whyTitle: 'One name on the map, *two* very different customers.',
    whyText: 'East of I-95 you have 1980s villas, condos, and waterfront communities like Admirals Cove and Jonathan\'s Landing. West of the Turnpike is Jupiter Farms: acreage, private wells, and septic. They search for different things, they hire different trades, and they are not even in the same jurisdiction. Your Google presence should speak to both.',
    localReason: { icon: 'pin', title: 'Local, not a call center', text: `Our office is in ${SITE.homeBase}, about 28 miles from Jupiter. You work with ${SITE.founder} directly, and we can meet in person.` },
    market: {
      title: 'Seasonal owners east. *Rural* acreage west.',
      paragraphs: [
        'About 14 percent of homes in the Town of Jupiter are held for seasonal use, well above the county rate, and the 1980s were the biggest building decade. A lot of buyers are owners who are out of state half the year. They book by phone or text from far away, so fast replies and strong reviews win the job.',
        'Jupiter Farms is not part of the Town at all. It is about 15 square miles of unincorporated county west of the Turnpike, with Jupiter 33478 addresses, and 97 percent of its homes are single-family. Tequesta, Juno Beach, and Jupiter Inlet Colony are separate towns too. We map your service area and pages to each of these, so you rank where your customers are.',
      ],
      stats: [
        { value: '61,883', label: 'Residents in the Town of Jupiter' },
        { value: '79%', label: 'Of homes owner-occupied (county: 70%)' },
        { value: '14%', label: 'Of homes held for seasonal use (county: 9.5%)' },
        { value: '1989', label: 'Median year homes were built' },
      ],
      neighborhoods: ['Abacoa', 'Admirals Cove', "Jonathan's Landing", 'Egret Landing', 'Jupiter Country Club', 'Jupiter Farms', 'Palm Beach Country Estates'],
      gettingThere: 'About 28 miles from our office, up Florida\'s Turnpike to Indiantown Rd. We meet Jupiter clients in person.',
      sourceNote: censusNote,
    },
    faqs: [
      { q: 'Do you work with businesses in Jupiter Farms too?', a: 'Yes. Jupiter Farms has Jupiter addresses but is unincorporated county, and its homeowners search differently from people in Abacoa or on the water. We cover both, with pages written for each.' },
      { q: 'How much does SEO cost in Jupiter?', a: 'It depends on your trade, how many towns you want to show up in, and where your Google profile and website start today. After a free 30-minute call you get a fixed quote in writing: a one-time website build, then one flat monthly plan. No contract. The monthly plan covers a website built to rank, Google Business Profile management, review automation, lead follow-up, citations and links, and competitor tracking.' },
      { q: 'A lot of my customers are only here in the winter. How do I reach them?', a: 'They search before they fly down, often from out of state, and they text more than they call. We set up missed-call text-back and fast follow-up so a snowbird who reaches out in October is booked before they land.' },
      { q: 'Do I need separate pages for Tequesta and Juno Beach?', a: 'If you work there, yes. They are separate towns and people search them by name. We only build a town page when you really serve that town and we have something real to say about it.' },
      { q: 'Can you guarantee a top ranking in Jupiter?', a: 'No. Google decides rankings, and anyone who guarantees #1 is guessing. We guarantee the work we control, like your site live in 14 days or your first month is free.' },
    ],
  },
  {
    // Targets "seo boynton beach" (110/mo). Semrush US, 2026-09-27.
    slug: 'boynton-beach',
    name: 'Boynton Beach',
    placeType: 'City',
    seoTitle: 'SEO Company in Boynton Beach for Home Service Businesses',
    metaDescription: `Local SEO for Boynton Beach home service businesses. Google Maps rankings, websites that rank, and AI follow-up, from the marina to the 55+ communities west. No contract.`,
    heroTitle: 'Boynton Beach SEO for the businesses that keep its *homes running*.',
    heroLede: `From the villas near Boynton Harbor Marina to the 55+ communities out west, Boynton homeowners hire whoever shows up first on Google Maps. We get you there with local SEO, a website that ranks, and AI that answers every lead. Run by ${SITE.founder} from ${SITE.homeBase}.`,
    whyTitle: 'Two generations of *55+* buyers, and they both use Google.',
    whyText: 'Boynton Beach has an older east side, where 1960s and 1970s villas and condos like Leisureville still stand, and a newer west side of 55+ communities built from the late 1990s on. Both groups read reviews, both call the business that answers, and both expect a straight price. Many of the agencies ranking for Boynton SEO use the same page for every city. We write for Boynton.',
    localReason: { icon: 'pin', title: 'Local, not a call center', text: `Our office is in ${SITE.homeBase}, about 24 miles from Boynton Beach. You work with ${SITE.founder} directly, and we can meet in person.` },
    market: {
      title: 'An older city east, a *55+ belt* west.',
      paragraphs: [
        'The 1970s were the biggest building decade in Boynton Beach, and the median home dates to 1984. That is a lot of original plumbing, roofs, and AC systems reaching the end of their life, and a lot of owners who want a company they can trust to replace them.',
        'Much of the western 55+ belt, including Quail Ridge, Indian Spring, and Valencia Reserve, has Boynton Beach addresses but sits in unincorporated county. The Boynton Inlet is not in the city either. People search "Boynton Beach" for all of it, so we build your service area and pages around that, not the city limit.',
      ],
      stats: [
        { value: '81,435', label: 'Residents, third largest city in the county' },
        { value: '1984', label: 'Median year homes were built' },
        { value: '65%', label: 'Of homes owner-occupied (county: 70%)' },
        { value: '21%', label: 'Of homes in 20+ unit buildings' },
      ],
      neighborhoods: ['Boynton Leisureville', 'Palm Beach Leisureville', 'Hampshire Gardens', 'Sterling Village', 'Golfview Harbour', 'Hunters Run', 'Quail Ridge', 'Indian Spring', 'Valencia Reserve'],
      gettingThere: 'About 24 miles from our office, down Florida\'s Turnpike to Boynton Beach Blvd. We meet Boynton clients in person.',
      sourceNote: censusNote,
    },
    faqs: [
      { q: 'Do you cover the 55+ communities west of Boynton?', a: 'Yes. Quail Ridge, Indian Spring, Valencia Reserve and the rest of that belt have Boynton Beach addresses, and those homeowners search for Boynton Beach businesses. We make sure your profile and website cover them.' },
      { q: 'How much does SEO cost in Boynton Beach?', a: 'It depends on your trade, how many towns you want to show up in, and where your Google profile and website start today. After a free 30-minute call you get a fixed quote in writing: a one-time website build, then one flat monthly plan. No contract. The monthly plan covers a website built to rank, Google Business Profile management, review automation, lead follow-up, citations and links, and competitor tracking.' },
      { q: 'Many of my customers are retirees. Do they really find contractors on Google?', a: 'Yes. They search, they read reviews closely, and many still prefer to call. That is why every plan includes review automation and missed-call text-back, so the call you miss on a job still gets an answer within seconds.' },
      { q: 'How long until I show up higher on Google Maps?', a: 'Profile fixes can move you within weeks. Competitive searches take a few months of steady reviews, content, and local links. We show you the real numbers every month.' },
      { q: 'Can you promise I will rank #1?', a: 'No. Google decides rankings. We promise the work we control, like having your site live in 14 days or your first month is free.' },
    ],
  },
  {
    // Targets "seo delray beach" (320/mo, KD 6). Semrush US, 2026-09-27.
    slug: 'delray-beach',
    name: 'Delray Beach',
    placeType: 'City',
    seoTitle: 'SEO Company in Delray Beach for Home Service Businesses',
    metaDescription: `Local SEO for Delray Beach home service businesses, from the historic districts to West Delray. Google Maps rankings, websites that rank, and AI follow-up. No contract.`,
    heroTitle: 'Delray Beach SEO for *home service* businesses, not boutiques.',
    heroLede: `Most Delray SEO pages are written for shops on Atlantic Ave. We work with the contractors who keep Delray's homes, condos, and historic houses running, and we get them into the top three on Google Maps. Run by ${SITE.founder} from ${SITE.homeBase}.`,
    whyTitle: 'Delray is a *condo and association* market. Market to it that way.',
    whyText: 'Only about a third of Delray Beach homes are single-family houses. The rest are condos, villas, and 55+ communities, where a board or a property manager often makes the call. They compare reviews, they want paperwork in order, and they hire the same company again when it goes well. We build your Google presence to win those repeat jobs.',
    localReason: { icon: 'pin', title: 'Local, not a call center', text: `Our office is in ${SITE.homeBase}, about 29 miles from Delray Beach. You work with ${SITE.founder} directly, and we can meet in person.` },
    market: {
      title: 'Historic east, *condo country* west.',
      paragraphs: [
        'The 1970s were the biggest building decade in Delray Beach, and about 12 percent of homes are held for seasonal use. East of I-95 you have five local historic districts, including Old School Square and Del-Ida Park, where exterior work gets extra review. West of the city, Kings Point alone is roughly 7,200 condos built between 1973 and 1985.',
        'Here is the catch for your Google profile: West Delray, including Kings Point, Villages of Oriole, and High Point, has Delray Beach addresses but sits outside city limits. Homeowners there still search "Delray Beach." We set your service area and your pages to cover the whole market people call Delray.',
      ],
      stats: [
        { value: '67,979', label: 'Residents' },
        { value: '34%', label: 'Single-family detached homes (county: 46%)' },
        { value: '12%', label: 'Of homes held for seasonal use (county: 9.5%)' },
        { value: '1983', label: 'Median year homes were built' },
      ],
      neighborhoods: ['Old School Square', 'Marina Historic District', 'Del-Ida Park', 'Pineapple Grove', 'Seagate', 'Tropic Isle', 'Delaire Country Club', 'Kings Point', 'Villages of Oriole', 'High Point', 'Valencia Falls'],
      gettingThere: 'About 29 miles from our office, down Florida\'s Turnpike to Atlantic Ave. We meet Delray clients in person.',
      sourceNote: `${censusNote} Kings Point unit count from 55places.com.`,
    },
    faqs: [
      { q: 'Do you work with businesses that serve Kings Point and West Delray?', a: 'Yes. Kings Point, Villages of Oriole, and High Point have Delray Beach addresses even though they are outside city limits, and residents there search for Delray businesses. We make sure you show up for them.' },
      { q: 'How much does SEO cost in Delray Beach?', a: 'It depends on your trade, how many towns you want to show up in, and where your Google profile and website start today. After a free 30-minute call you get a fixed quote in writing: a one-time website build, then one flat monthly plan. No contract. The monthly plan covers a website built to rank, Google Business Profile management, review automation, lead follow-up, citations and links, and competitor tracking.' },
      { q: 'A lot of my work comes from condo associations. Can SEO help with that?', a: 'Yes. Board members and property managers search Google and read reviews before they request bids. A strong profile, recent reviews, and a website with a clear page for association work make you an easy yes.' },
      { q: 'How long until I rank better in Delray?', a: 'Profile fixes can move you within weeks. "Delray Beach" searches are less crowded than West Palm Beach or Boca, so steady work often shows up sooner. We report the real numbers every month.' },
      { q: 'Can you guarantee a #1 ranking?', a: 'No. Google decides rankings. We guarantee the work we control, like having your site live in 14 days or your first month is free.' },
    ],
  },
  {
    // Targets "seo boca raton" (590/mo, KD 16). Semrush US, 2026-09-27.
    slug: 'boca-raton',
    name: 'Boca Raton',
    placeType: 'City',
    seoTitle: 'SEO Company in Boca Raton for Home Service Businesses',
    metaDescription: `Local SEO for Boca Raton home service businesses, east Boca to West Boca. Google Maps rankings, websites that rank, and AI follow-up. No contract. Based in Palm Beach County.`,
    heroTitle: 'Boca Raton SEO for the businesses that keep *Boca* running.',
    heroLede: `Boca homeowners, condo boards, and building managers hire whoever shows up first on Google Maps. We get your business into that top three with local SEO, a website that ranks, and AI that answers every lead. Run by ${SITE.founder} from ${SITE.homeBase}.`,
    whyTitle: 'Ranking in Boca means ranking in *two* Bocas.',
    whyText: 'A lot of people with a Boca Raton address do not live in the city. West of the Turnpike, Boca West, Century Village, and Sandalfoot Cove are unincorporated county, and the City itself says a Boca address does not always mean city limits. Everyone searches "Boca Raton" anyway. Several of the agencies ranking for Boca SEO answer from toll-free numbers and use one template for every city. We build for how Boca actually works.',
    localReason: { icon: 'pin', title: 'Palm Beach County, not a call center', text: `Our office is in ${SITE.homeBase}, about 35 miles up the road. You work with ${SITE.founder} directly, and we can meet in person.` },
    market: {
      title: 'A condo town *and* a country-club town.',
      paragraphs: [
        'About 37 percent of Boca Raton homes sit in buildings with 20 or more units, nearly twice the county rate, and close to one in ten is held for seasonal use. A lot of your buyers are condo boards, building managers, and owners calling from out of state before they fly down. They check reviews hard and they hire whoever answers first.',
        'The rest of the market is single-family and country-club living, from Royal Palm Yacht & Country Club near the ocean to Boca West and Boca Falls, more than 10 miles inland. Boca Raton covers 16 ZIP codes, and St. Andrews Country Club turned down annexation into the city in 2026. We build your service area and your pages around where your customers live, east of I-95 and out past the Turnpike.',
      ],
      stats: [
        { value: '100,234', label: 'Residents, the second largest city in the county' },
        { value: '37%', label: 'Of homes in 20+ unit buildings (county: 19%)' },
        { value: '16', label: 'ZIP codes with a Boca Raton address' },
        { value: '1983', label: 'Median year homes were built' },
      ],
      neighborhoods: ['Royal Palm Yacht & Country Club', 'Old Floresta', 'Camino Gardens', 'Woodfield Country Club', 'Boca West', 'Boca Pointe', 'Century Village', 'Sandalfoot Cove', 'Boca Falls'],
      gettingThere: 'About 35 miles from our office, down Florida\'s Turnpike to Glades Rd. We meet Boca clients in person.',
      sourceNote: censusNote,
    },
    faqs: [
      { q: 'Do you work with businesses in West Boca?', a: 'Yes. Boca West, Century Village, Sandalfoot Cove and the rest of West Boca have Boca Raton addresses but sit in unincorporated county. Those homeowners search for Boca Raton businesses, so we make sure your profile and website cover them.' },
      { q: 'How much does SEO cost in Boca Raton?', a: `Boca agency retainers often run into the thousands per month. It depends on your trade, how many towns you want to show up in, and where your Google profile and website start today. After a free 30-minute call you get a fixed quote in writing: a one-time website build, then one flat monthly plan. No contract. The monthly plan covers a website built to rank, Google Business Profile management, review automation, lead follow-up, citations and links, and competitor tracking.` },
      { q: 'You are in Royal Palm Beach. Why not hire a Boca agency?', a: 'Hire whoever does the work best. What we offer is a founder you can reach directly, a fixed price in writing, and a plan built only for home service businesses. We meet Boca clients in person, and you own everything we build.' },
      { q: 'How long until I show up higher on Google Maps in Boca?', a: 'Profile fixes can move you within weeks. Boca is competitive, so the bigger searches usually take a few months of reviews, content, and local links. We report the real numbers every month.' },
      { q: 'Can you guarantee a #1 ranking?', a: 'No, and be careful with anyone who does. Google decides rankings. We guarantee the work we control, like having your site live in 14 days or your first month is free.' },
    ],
  },
];
