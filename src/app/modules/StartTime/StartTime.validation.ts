import { z } from 'zod';

export const createStartTimeValidationSchema = z.object({
  body: z.object({
    startTime: z.object({
      startTime: z.string().min(1),
      price: z.number().min(1),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const updateStartTimeValidationSchema = z.object({
  body: z.object({
    startTime: z.object({
      startTime: z.string().optional(),
      price: z.number().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
