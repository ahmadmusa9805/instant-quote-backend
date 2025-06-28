import { z } from 'zod';

export const createBookingValidationSchema = z.object({
  body: z.object({
      date: z.string().min(1),
      start: z.string().min(1),
      end: z.string().min(1),
      // bookedBy: z.string().min(1),
      subscriberId: z.string().min(1),
      quoteId: z.string().min(1),
    }),
  })

export const updateBookingValidationSchema = z.object({
  body: z.object({
      date: z.string().optional(),
      start: z.string().optional(),
      end: z.string().optional(),
      bookedBy: z.string().optional(),
      subscriberId: z.string().optional(),
      quote: z.string().min(1).optional(),
  }),
});
