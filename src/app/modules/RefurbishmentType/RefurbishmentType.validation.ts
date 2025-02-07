import { z } from 'zod';


export const createRefurbishmentTypeValidationSchema = z.object({
  refurbishmentType: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    price: z.number(),
    info: z.string().optional(),
    isDeleted: z.boolean().default(false),
  }),
});

export const updateRefurbishmentTypeValidationSchema = z.object({
  body: z.object({
    refurbishmentType: z.object({
      title: z.string().optional(),
      info: z.string().optional(),
      subtitle: z.string().optional(),
      price: z.number().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
