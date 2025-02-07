import { z } from 'zod';

export const createDesignIdeaValidationSchema = z.object({
  body: z.object({
    designIdea: z.object({
      clarity: z.string().min(1),
      info: z.string().optional(),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const updateDesignIdeaValidationSchema = z.object({
  body: z.object({
    designIdea: z.object({
      info: z.string().optional(),
      clarity: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
