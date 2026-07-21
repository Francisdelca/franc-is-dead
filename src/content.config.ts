import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { technologyIds } from "@data/technologies";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    variant: z.string().optional(),
    year: z.number().optional(),
    category: z.string(),
    track: z.enum(["web", "systems", "concept"]).default("web"),
    client: z.string().optional(),
    experienceId: z.enum(["ludik", "independent"]).optional(),
    contextDescription: z.string().optional(),
    role: z.string(),
    status: z.string(),
    description: z.string(),
    summary: z.string().optional(),
    participation: z.string().optional(),
    responsibilities: z.array(z.string()).default([]),
    challenges: z.array(z.string()).default([]),
    solution: z.array(z.string()).default([]),
    results: z.array(z.string()).default([]),
    technologies: z.array(z.enum(technologyIds)).default([]),
    cover: z.string().optional(),
    thumbnail: z.string().optional(),
    gallery: z.array(z.object({
      src: z.string(),
      label: z.string(),
      alt: z.string(),
      orientation: z.enum(["landscape", "portrait"]).default("landscape"),
    })).default([]),
    externalUrl: z.url().optional(),
    featured: z.boolean().default(false),
    featuredOrder: z.number().int().positive().optional(),
    published: z.boolean().default(true),
    caseStudyReady: z.boolean().default(false),
    collaborationNote: z.string().optional(),
    collaborators: z.array(z.object({
      collaboratorId: z.string(),
      role: z.string(),
      contribution: z.string(),
    })).default([]),
    archiveNote: z.string().optional(),
    disclaimer: z.string().optional(),
  }),
});

export const collections = { projects };
