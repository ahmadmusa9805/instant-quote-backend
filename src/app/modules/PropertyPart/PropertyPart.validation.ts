import { z } from 'zod';

export const createPropertyPartValidationSchema = z.object({
  body: z.object({
    propertyPart: z.object({
      name: z.string(),
            subscriberId: z.string(),
      info: z.string().optional(),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const updatePropertyPartValidationSchema = z.object({
  body: z.object({
    propertyPart: z.object({
      name: z.string().optional(),
      subscriberId: z.string().optional(),
      info: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
