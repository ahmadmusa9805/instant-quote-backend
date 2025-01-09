import { z } from 'zod';

export const createInclusionValidationSchema = z.object({
  body: z.object({
    inclusion: z.object({
      title: z.string(),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const updateInclusionValidationSchema = z.object({
  body: z.object({
    inclusion: z.object({
      title: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
