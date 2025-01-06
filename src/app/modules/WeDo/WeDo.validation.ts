import { z } from 'zod';

export const createWeDoValidationSchema = z.object({
  body: z.object({
    weDo: z.object({
      title: z.string().min(1),
      description: z.string(),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const updateWeDoValidationSchema = z.object({
  body: z.object({
    weDo: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
