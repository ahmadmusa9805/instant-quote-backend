import { z } from 'zod';

export const createCallAvailabilityValidationSchema = z.object({
  body: z.object({
    callAvailability: z.object({
      day: z.string().min(1),
      adminId: z.string().min(1),
      startTime : z.string().min(1),
      endTime: z.string().min(1),
      date: z.preprocess((val) => new Date( val as string), z.date()).optional(),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const updateCallAvailabilityValidationSchema = z.object({
  body: z.object({
    callAvailability: z.object({
      day: z.string().optional(),
      adminId: z.string().optional(),
      startTime : z.string().optional(),
      endTime: z.string().optional(),
      date: z.date().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
