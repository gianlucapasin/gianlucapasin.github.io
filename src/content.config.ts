import { defineCollection, z } from 'astro:content';
import { file, glob } from 'astro/loaders';

const profile = defineCollection({
  loader: file('src/data/profile.yaml'),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    affiliation: z.string(),
    affiliationUrl: z.string().optional(),
    location: z.string().optional(),
    description: z.string(),
    bio: z.string(),
    links: z.array(z.object({ label: z.string(), url: z.string() })),
  }),
});

const news = defineCollection({
  loader: file('src/data/news.yaml'),
  schema: z.object({ date: z.coerce.date(), text: z.string(), url: z.string().optional() }),
});

const research = defineCollection({
  loader: file('src/data/research.yaml'),
  schema: z.object({ title: z.string(), order: z.number(), description: z.string() }),
});

const wip = defineCollection({
  loader: file('src/data/wip.yaml'),
  schema: z.object({
    title: z.string(),
    authors: z.string(),
    status: z.string(),
    url: z.string().optional(),
  }),
});

const teaching = defineCollection({
  loader: file('src/data/teaching.yaml'),
  schema: z.object({
    course: z.string(),
    institution: z.string(),
    level: z.string().optional(),
    years: z.string(),
    description: z.string().optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '*.md', base: 'src/data/projects' }),
  schema: z.object({
    title: z.string(),
    period: z.string(),
    role: z.string().optional(),
    funder: z.string().optional(),
    partners: z.array(z.string()).default([]),
    url: z.string().optional(),
    order: z.number().default(0),
  }),
});

export const collections = { profile, news, research, wip, teaching, projects };
