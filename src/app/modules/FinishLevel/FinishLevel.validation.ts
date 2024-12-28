import { z } from 'zod';

export const createFinishLevelValidationSchema = z.object({
  body: z.object({
    finishLevel: z.object({
      level: z.string().min(1),
      price: z.number().min(1),
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
