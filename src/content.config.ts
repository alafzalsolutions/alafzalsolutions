import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z
    .object({
      title: z.string().max(65),
      seoTitle: z.string().max(65).optional(),
      description: z.string().min(50).max(160),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      // keep these in sync with the categories in public/admin/config.yml
      category: z.enum(['learning', 'productivity', 'health', 'reading', 'stationery']),
      author: z.string().default('Your Name'),
      image: z.string().optional(),
      imageAlt: z.string().optional(),
      related: z.array(z.string()).default([]),
      sources: z.array(z.string()).default([]),
      noindex: z.boolean().default(false),
      draft: z.boolean().default(false),
    })
    .refine((d) => !d.image || d.imageAlt, {
      message: 'imageAlt is required when an image is set',
      path: ['imageAlt'],
    }),
});

export const collections = { blog };