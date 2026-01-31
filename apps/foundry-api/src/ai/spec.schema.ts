import { z } from 'zod';

export const EntityFieldSchema = z.object({
  name: z.string(),
  type: z.enum(['String', 'Number', 'Boolean', 'DateTime', 'Json']),
  required: z.boolean().default(true),
});

export const EntitySchema = z.object({
  name: z.string(),
  fields: z.array(EntityFieldSchema),
});

export const ProjectSpecSchema = z.object({
  name: z.string(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  description: z.string(),
  entities: z.array(EntitySchema),
  roles: z.array(z.string()).default(['Admin', 'User']),
  integrations: z.array(z.string()).default([]),
  infra: z.object({
    region: z.string().default('us-east-1'),
    containerMemory: z.number().default(1024),
    containerCpu: z.number().default(512),
  }).optional(),
});

export type ProjectSpec = z.infer<typeof ProjectSpecSchema>;
