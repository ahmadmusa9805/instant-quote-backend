import { z } from 'zod';

export const createPropertyValidationSchema = z.object({
  body: z.object({
    property: z.object({
      name: z.string(),
      info: z.string().optional(),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const updatePropertyValidationSchema = z.object({
  body: z.object({
    property: z.object({
      name: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
