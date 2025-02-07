import { z } from 'zod';

export const createStartTimeValidationSchema = z.object({
  body: z.object({
    startTime: z.object({
      startTime: z.string(),
      price: z.number(),
      info: z.string().optional(),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const updateStartTimeValidationSchema = z.object({
  body: z.object({
    startTime: z.object({
      startTime: z.string().optional(),
      price: z.number().optional(),
      info: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
