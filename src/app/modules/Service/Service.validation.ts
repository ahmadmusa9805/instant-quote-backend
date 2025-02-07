import { z } from 'zod';

export const createServiceValidationSchema = z.object({
  body: z.object({
    service: z.object({
      name: z.string(),
      price: z.number(),
      hotChoice: z.boolean().default(false),
      info: z.string().optional(),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const updateServiceValidationSchema = z.object({
  body: z.object({
    service: z.object({
      info: z.string().optional(),
      name: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
