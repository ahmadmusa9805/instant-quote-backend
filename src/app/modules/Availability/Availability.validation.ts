import { z } from 'zod';

export const createAvailabilityValidationSchema = z.object({
  body: z.object({
      daysOfWeek: z.array(z.number().min(0).max(6)),
      timeSlots: z.array(
      z.object({
        start: z.string(), // You can add regex validation here for HH:mm
        end: z.string(),
      })
    ),
      // createdBy: z.string(),
    }),
  })

export const updateAvailabilityValidationSchema = z.object({
  body: z.object({
     daysOfWeek: z.array(z.number().min(0).max(6)).optional(),
      timeSlots: z.array(
      z.object({
        start: z.string().optional(), // You can add regex validation here for HH:mm
        end: z.string().optional(),
      })
    ).optional(),
      createdBy: z.string().optional(),
  }),
});
