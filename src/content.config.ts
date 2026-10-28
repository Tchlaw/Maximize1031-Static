import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const date = z.coerce.date();
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './content/posts', generateId: ({ entry }) => entry.replace(/\.md$/, '') }),
  schema: z.object({
    title: z.string().min(1), date, updated: date.optional(), lastModified: date.optional(),
    description: z.string().optional(), summary: z.string().optional(), excerpt: z.string().optional(),
    author: z.string().default('Shant Tchakerian'), category: z.string().default('1031-exchanges'),
    tags: z.array(z.string()).default([]), featured: z.boolean().default(false),
    draft: z.boolean().default(false), relatedPosts: z.array(z.string()).default([]),
    slug: z.string().optional(), metaTitle: z.string().optional(), metaDescription: z.string().optional(),
  }).refine(data => Boolean(data.description || data.summary || data.excerpt), { message: 'Add a description, summary, or excerpt.' }),
});
export const collections = { posts };
