import { z } from 'zod';

export const createServiceValidationSchema = z.object({
  body: z.object({
    service: z.object({
      name: z.string().min(1),
      price: z.number().min(1),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const updateServiceValidationSchema = z.object({
  body: z.object({
    service: z.object({
      name: z.string().optional(),
      price: z.number().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
