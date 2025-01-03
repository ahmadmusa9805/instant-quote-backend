import { z } from 'zod';

export const createBlogValidationSchema = z.object({
  body: z.object({
    blog: z.object({
      title: z.string().min(1),
      description: z.string().optional(),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const updateBlogValidationSchema = z.object({
  body: z.object({
    blog: z.object({
      title: z.string().optional(),
      description: z.string().optional(),
      img: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
