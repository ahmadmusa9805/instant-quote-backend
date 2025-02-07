import { z } from 'zod';

export const createFinishLevelValidationSchema = z.object({
  body: z.object({
    finishLevel: z.object({
      level: z.string(),
      price: z.number(),
      info: z.string().optional(),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const updateFinishLevelValidationSchema = z.object({
  body: z.object({
    finishLevel: z.object({
      level: z.string().optional(),
      price: z.number().optional(),    
      isDeleted: z.boolean().optional(),
    }),
  }),
});
