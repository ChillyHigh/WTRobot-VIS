import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { docsLoader, i18nLoader } from '@astrojs/starlight/loaders';
import { docsSchema, i18nSchema } from '@astrojs/starlight/schema';

const downloadSchema = z.object({
	label: z.string(),
	file: z.string(),
	note: z.string().optional(),
});

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				section: z.enum(['brand', 'assets', 'guidelines', 'merch']).optional(),
				category: z.string().optional(),
				year: z.number().optional(),
				tags: z.array(z.string()).default([]),
				usage: z.string().optional(),
				preview: z.string().optional(),
				downloads: z.array(downloadSchema).default([]),
			}),
		}),
	}),
	i18n: defineCollection({ loader: i18nLoader(), schema: i18nSchema() }),
};
