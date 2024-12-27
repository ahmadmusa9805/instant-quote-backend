import { z } from 'zod';

export const createRefurbishmentSizeValidationSchema = z.object({
  body: z.object({
    RefurbishmentSize: z.object({
      name: z.string().min(1),
      description: z.string().optional(),
      atcCodes: z.string().min(1),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

// Other validations...
