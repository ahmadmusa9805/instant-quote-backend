import { z } from 'zod';

// Define the Zod schema for TUserName
const createUserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: 'First Name must start with a capital letter',
    }),
  middleName: z.string().optional(),
  lastName: z.string().max(20, 'Last name cannot be longer than 20 characters'),
});

export const createActorValidationSchema = z.object({
  body: z.object({
    actor: z.object({
      name: createUserNameValidationSchema, // Nested name schema
      email: z.string().email('Invalid email format'),
      profileImg: z.string().optional(),
      profileVideo: z.string().optional(),
      status: z.string().default('active'),
      address: z.string().default(''),
      bio: z.string().optional(),
      stripeAccountId: z.string().optional(),
      shortBio: z.string().optional(),
      LinkedIn: z.string().optional(),
      Spotlight: z.string().optional(),
      instagram: z.string().optional(),
      Facebook: z.string().optional(),
      TikTok: z.string().optional(),
      X: z.string().optional(),
      skills: z.array(z.string()).optional(),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
}).optional();

export const updateActorValidationSchema = z.object({
  body: z.object({
    actor: z.object({
      name: updateUserNameValidationSchema.optional(),
      email: z.string().email().optional(),
      profileImg: z.string().optional(),
      profileVideo: z.string().optional(),
      shortBio: z.string().optional(),
      address: z.string().optional(),
      bio: z.string().optional(),
      status: z.string().optional(),
      LinkedIn: z.string().optional(),
      instagram: z.string().optional(),
      Spotlight: z.string().optional(),
      Facebook: z.string().optional(),
      TikTok: z.string().optional(),
      X: z.string().optional(),
      skills: z.array(z.string()).optional(),
    }),
  }),
});

export const studentValidations = {
  createActorValidationSchema,
  updateActorValidationSchema,
};
