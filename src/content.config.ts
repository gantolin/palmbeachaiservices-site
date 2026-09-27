import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/**
 * Guides: long-form how-to articles that target the "get seen on Google" and "save time with AI"
 * searches home-service owners actually type. One target keyword per guide (see docs/keyword-map.md).
 * Files: src/content/guides/<slug>.md, rendered at /guides/<slug>/.
 */
const guides = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/guides' }),
  schema: z.object({
    /** <title> tag, 50-60 characters, target keyword near the front, ends with " | Palm Beach AI Services" only if it fits. */
    metaTitle: z.string().max(70),
    /** Meta description, 140-160 characters. */
    description: z.string().min(100).max(170),
    /** The on-page H1. Contains the target keyword naturally. */
    title: z.string(),
    /** The one search phrase this guide is built to rank for. */
    keyword: z.string(),
    /** Short line under the H1. */
    lede: z.string(),
    pillar: z.enum(['Get seen on Google', 'Get your time back with AI']),
    published: z.coerce.date(),
    updated: z.coerce.date(),
    /** 3-6 short Q&As rendered as <details> and FAQPage schema. Answers under 70 words. */
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    /** Which service page this guide should point readers to. */
    relatedService: z.enum(['google-maps-seo', 'websites', 'ai-automation', 'ai-answering-service']),
  }),
});

export const collections = { guides };
