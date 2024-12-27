import { z } from 'zod';

export const createPropertyPartValidationSchema = z.object({
  body: z.object({
    propertyPart: z.object({
      name: z.string().min(1),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const updatePropertyPartValidationSchema = z.object({
  body: z.object({
    propertyPart: z.object({
      name: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
