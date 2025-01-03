import { z } from 'zod';

export const createProjectValidationSchema = z.object({
  body: z.object({
    project: z.object({
      title: z.string(),
      description: z.string(),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const updateProjectValidationSchema = z.object({
  body: z.object({
    project: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      img: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
