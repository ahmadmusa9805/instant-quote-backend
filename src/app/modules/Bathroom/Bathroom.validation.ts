import { z } from 'zod';

export const createBathroomValidationSchema = z.object({
  body: z.object({
    bathroom: z.object({
      bathroomQuantity: z.number().min(1),
      price: z.number().min(1),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const updateBathroomValidationSchema = z.object({
  body: z.object({
    bathroom: z.object({
    bathroomQuantity: z.number().optional(),
    price: z.number().optional(),
    isDeleted: z.boolean().optional(),
    }),
  }),
});
