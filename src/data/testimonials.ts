/**
 * TESTIMONIALS. None collected yet.
 *
 * Rules:
 *  - Only add REAL quotes, with the client's written permission.
 *  - Never invent names, star ratings, or review counts.
 *  - Set `todo: false` on an entry once it is real. The section stays HIDDEN in production
 *    until at least one entry has `todo: false`. In `npm run dev` the placeholders show
 *    with a visible "dev only" notice so you can see the layout.
 */
export interface Testimonial {
  todo: boolean;
  quote: string;
  name: string;
  business: string;
  town: string;
  /** Optional: phrase inside the quote to highlight in the accent color. */
  highlight?: string;
  /** Optional: /images/testimonials/*.jpg */
  photo?: string;
  /** Optional: link to the public Google review. */
  sourceUrl?: string;
}

export const testimonials: Testimonial[] = [
  {
    todo: true,
    quote: 'TODO: Real quote from the mold inspection client about the report automation (ask for permission).',
    name: 'TODO: Owner name',
    business: 'Mold inspection company',
    town: 'TODO: town',
  },
  {
    todo: true,
    quote: "TODO: Real quote from the paver client about the website + Google rankings (ask for permission).",
    name: 'TODO: Owner name',
    business: 'Paver contractor',
    town: 'Lake Worth Beach',
  },
  {
    todo: true,
    quote: 'TODO: Real quote from the HVAC client once results come in.',
    name: 'TODO: Owner name',
    business: 'HVAC contractor',
    town: 'TODO: town',
  },
];

export const realTestimonials = testimonials.filter((t) => !t.todo);
