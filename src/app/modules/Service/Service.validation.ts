import { z } from 'zod';

export const createServiceValidationSchema = z.object({
  body: z.object({
    Service: z.object({
      name: z.string().min(1),
      description: z.string().optional(),
      atcCodes: z.string().min(1),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const updateServiceValidationSchema = z.object({
  body: z.object({
    Service: z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      atcCodes: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
