import { z } from 'zod';

export const createServiceValidationSchema = z.object({
  body: z.object({
    service: z.object({
      name: z.string(),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const updateServiceValidationSchema = z.object({
  body: z.object({
    service: z.object({
      name: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
