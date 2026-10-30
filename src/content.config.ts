import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Decap can save untouched optional fields as "" or nothing. Treat them as "not set".
const blankToUndefined = (value: unknown) =>
  value === '' || value === null ? undefined : value;
const blankToEmptyList = (value: unknown) =>
  value === '' || value === null || value === undefined ? [] : value;

// Accepts dates, date text and numbers. Blank values and stray objects count as "not set".
const toDate = (value: unknown) => {
  if (value === '' || value === null || value === undefined) return undefined;
  if (value instanceof Date) return value;
  if (typeof value === 'string' || typeof value === 'number') return new Date(value);
  return undefined;
};

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z
    .object({
      title: z.string().max(65),
      seoTitle: z.preprocess(blankToUndefined, z.string().max(65).optional()),
      description: z.string().min(50).max(160),
      pubDate: z.preprocess(toDate, z.date()),
      updatedDate: z.preprocess(toDate, z.date().optional()),
      // keep these in sync with the categories in public/admin/config.yml
      category: z.enum(['learning', 'productivity', 'health', 'reading', 'stationery']),
      author: z.string().default('Your Name'),
      image: z.preprocess(blankToUndefined, z.string().optional()),
      imageAlt: z.preprocess(blankToUndefined, z.string().optional()),
      related: z.preprocess(blankToEmptyList, z.array(z.string())),
      sources: z.preprocess(blankToEmptyList, z.array(z.string())),
      noindex: z.boolean().default(false),
      draft: z.boolean().default(false),
    })
    .refine((d) => !d.image || d.imageAlt, {
      message: 'imageAlt is required when an image is set',
      path: ['imageAlt'],
    }),
});

// Standalone pages: About, Editorial policy, Health disclaimer, Privacy, Contact
const pages = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string().max(65),
    description: z.string().min(50).max(160),
    kicker: z.preprocess(blankToUndefined, z.string().max(40).optional()),
    updatedDate: z.preprocess(toDate, z.date().optional()),
    noindex: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

// Free tools: each tool is one file in src/content/tools/
const tools = defineCollection({
  loader: glob({ base: './src/content/tools', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string().max(65),
    seoTitle: z.preprocess(blankToUndefined, z.string().max(65).optional()),
    description: z.string().min(50).max(160),
    // keep these in sync with the blog categories above
    category: z.enum(['learning', 'productivity', 'health', 'reading', 'stationery']),
    // light = plain JavaScript, heavy = a framework such as React
    kind: z.enum(['light', 'heavy']).default('light'),
    updatedDate: z.preprocess(toDate, z.date().optional()),
    faq: z.preprocess(
      blankToEmptyList,
      z.array(z.object({ question: z.string(), answer: z.string() }))
    ),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, pages, tools };