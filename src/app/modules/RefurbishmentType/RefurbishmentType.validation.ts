import { z } from 'zod';


export const createRefurbishmentTypeValidationSchema = z.object({
  refurbishmentType: z.object({
    title: z.string().min(1),
    subtitle: z.string().optional(),
    price: z.number().min(1),
    isDeleted: z.boolean().default(false),
  }),
});

export const updateRefurbishmentTypeValidationSchema = z.object({
  body: z.object({
    refurbishmentType: z.object({
      title: z.string().optional(),
      subtitle: z.string().optional(),
      price: z.number().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
