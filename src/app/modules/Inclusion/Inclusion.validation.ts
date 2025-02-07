import { z } from 'zod';

export const createInclusionValidationSchema = z.object({
  body: z.object({
    inclusion: z.object({
      title: z.string(),
      info: z.string().optional(),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const updateInclusionValidationSchema = z.object({
  body: z.object({
    inclusion: z.object({
      info: z.string().optional(),
      title: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
