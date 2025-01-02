import { z } from 'zod';

export const createCallBookingValidationSchema = z.object({
  body: z.object({
    callBooking: z.object({
      userId: z.string(),
      quoteId: z.string(),
      day: z.string(),
      date: z.preprocess((val) => new Date( val as string), z.date()),
      startTime: z.string(),
      endTime: z.string(),
      isDeleted: z.boolean().default(false),
    }),
  }),
});

export const updateCallBookingValidationSchema = z.object({
  body: z.object({
    callBooking: z.object({
      userId: z.string().optional(),
      quoteId: z.string().optional(),
      day: z.string().optional(),
      date: z.preprocess((val) => new Date( val as string), z.date()).optional(),
      startTime: z.string().optional(),
      endTime: z.string().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});
