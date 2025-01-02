import { z } from 'zod';

export const createProjectValidationSchema = z.object({
  body: z.object({
    Project: z.object({
      name: z.string().min(1),
      description: z.string().optional(),
      atcCodes: z.string().min(1),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const updateProjectValidationSchema = z.object({
  body: z.object({
    Project: z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      atcCodes: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
