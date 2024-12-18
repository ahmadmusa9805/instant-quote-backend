import { z } from 'zod';

const createUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  middleName: z.string().max(20),
  lastName: z.string().max(20),
});

export const createAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      name: createUserNameValidationSchema,
      email: z.string().email(),
      profileImg: z.string().optional(),
      status: z.string().default('active'),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(3).max(20).optional(),
  middleName: z.string().max(20).optional(),
  lastName: z.string().min(3).max(20).optional(),
});

export const updateAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object({
      name: updateUserNameValidationSchema.optional(),
      email: z.string().email().optional(),
      status: z.string().optional(),
    }).optional(),
  }),
});

export const AdminValidations = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
