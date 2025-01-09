import { z } from 'zod';

export const createQuotePricingValidationSchema = z.object({
  body: z.object({
    QuotePricing: z.object({
      name: z.string(),
      description: z.string().optional(),
      atcCodes: z.string(),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const updateQuotePricingValidationSchema = z.object({
  body: z.object({
    QuotePricing: z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      atcCodes: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
