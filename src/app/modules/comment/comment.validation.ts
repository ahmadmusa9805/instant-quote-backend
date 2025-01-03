import { z } from 'zod';

export const createCommentValidationSchema = z.object({
  body: z.object({
    comment: z.object({
      userId: z.string().min(1),
      blogId: z.string().min(1),      
      text: z.string().min(1),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const updateCommentValidationSchema = z.object({
  body: z.object({
    comment: z.object({
      userId: z.string().optional(),
      blogId: z.string().optional(),
      text: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
