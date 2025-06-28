import { z } from 'zod';

export const createCallAvailabilityValidationSchema = z.object({
  // body: z.object({
  //   callAvailability: z.object({
  //     day: z.string().min(1),
  //     adminId: z.string().min(1),
  //     startTime : z.string().min(1),
  //     endTime: z.string().min(1),
  //     date: z.preprocess((val) => new Date( val as string), z.date()).optional(),
  //     isDeleted: z.boolean().default(false),
  //   }),
  // }),
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
});

export const updateCallAvailabilityValidationSchema = z.object({
  // body: z.object({
  //   callAvailability: z.object({
  //     day: z.string().optional(),
  //     adminId: z.string().optional(),
  //     startTime : z.string().optional(),
  //     endTime: z.string().optional(),
  //     date: z.date().optional(),
  //     isDeleted: z.boolean().optional(),
  //   }),
  // }),
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
