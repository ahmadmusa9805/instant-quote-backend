import { z } from 'zod';

export const createExtendSizeValidationSchema = z.object({
  body: z.object({
    ExtendSize: z.object({
      name: z.string().min(1),
      squareMeterSize: z.string().min(1),
      price: z.number().min(1),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const updateExtendSizeValidationSchema = z.object({
  body: z.object({
    ExtendSize: z.object({
      name: z.string().optional(),
      squareMeterSize: z.string().optional(),
      price: z.number().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});

