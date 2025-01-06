import { z } from 'zod';

export const createRefurbishmentSizeValidationSchema = z.object({
  body: z.object({
    refurbishmentSize: z.object({
      name: z.string().min(1),
      squareMeterSize: z.string().min(1),
      price: z.number().min(1),
      isDeleted: z.boolean().default(false),
    }),
  }),
});


export const updateRefurbishmentSizeValidationSchema = z.object({
  body: z.object({
    refurbishmentSize: z.object({
      name: z.string().optional(),
      squareMeterSize: z.string().optional(),
      price: z.number().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
