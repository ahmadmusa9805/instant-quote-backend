import { z } from 'zod';

export const createExclusionValidationSchema = z.object({
  body: z.object({
    exclusion: z.object({
      title: z.string().min(1),
      info: z.string().optional(),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const updateExclusionValidationSchema = z.object({
  body: z.object({
    exclusion: z.object({
      info: z.string().optional(),
      title: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
