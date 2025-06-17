import { z } from 'zod';

export const createPropertyValidationSchema = z.object({
  body: z.object({
    property: z.object({
      name: z.string(),
      subscriberId: z.string(),
      info: z.string().optional(),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const updatePropertyValidationSchema = z.object({
  body: z.object({
    property: z.object({
      info: z.string().optional(),
      subscriberId: z.string().optional(),
      name: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
