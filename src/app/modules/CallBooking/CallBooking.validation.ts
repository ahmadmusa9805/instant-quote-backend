import { z } from 'zod';

export const createCallBookingValidationSchema = z.object({
  body: z.object({
    // callBooking: z.object({
    //   userId: z.string(),
    //   adminId: z.string(),
    //   quoteId: z.string(),
    //   day: z.string(),
    //   date: z.preprocess((val) => new Date( val as string), z.date()),
    //   startTime: z.string(),
    //   endTime: z.string(),
    //   state: z.enum(['pending', 'confirmed', 'cancelled', 'completed']).default('pending'),
    //   isDeleted: z.boolean().default(false),
    // }),
      date: z.string().min(1),
      start: z.string().min(1),
      end: z.string().min(1),
      // day: z.string(),
      // bookedBy: z.string().min(1),
      // subscriberId: z.string().min(1),
      // quoteId: z.string().min(1),
  }),
});

export const updateCallBookingValidationSchema = z.object({
  body: z.object({
    // callBooking: z.object({
    //   userId: z.string().optional(),
    //   adminId: z.string().optional(),
    //   quoteId: z.string().optional(),
    //   day: z.string().optional(),
    //   date: z.preprocess((val) => new Date( val as string), z.date()).optional(),
    //   startTime: z.string().optional(),
    //   endTime: z.string().optional(),
    //   state: z.enum(['pending', 'confirmed', 'cancelled', 'completed']).optional(),
    //   isDeleted: z.boolean().optional(),
    // }),
      date: z.string().optional(),
      day: z.string().optional(),
      start: z.string().optional(),
      end: z.string().optional(),
      bookedBy: z.string().optional(),
      subscriberId: z.string().optional(),
      quote: z.string().min(1).optional(),
  }),
});
