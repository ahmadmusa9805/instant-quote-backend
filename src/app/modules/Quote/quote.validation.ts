import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const createQuoteValidationSchema = z.object({
  body: z.object({
    quote: z.object({
      userId: z.string()
        .regex(objectIdRegex, "Invalid ObjectId format for userId")
        .nonempty("User ID is required").optional(),
      property: z.string(),
      propertyPart: z.string(),
      refurbishType: z.object({
        type: z.string(),
        percentage: z.number(),
      }),
      refurbishSize: z.object({
        quantity: z.number(),
        price: z.number(),
      }),
      extendSize: z.object({
        quantity: z.number(),
        price: z.number(),
      }),
      finishLevel: z.object({
        level: z.string(),
        percentage: z.number(),
      }),
      bathrooms: z.object({
        quantity: z.number(),
        price: z.number(),
      }),
      windowSize: z.object({
        quantity: z.number(),
        price: z.number(),
      }),
      startTime: z.object({
        startTime: z.string().min(1, "Start time is required"),
        percentage: z.number(),
      }),
      designIdea: z.string().min(1, "Design idea is required"),
      file: z.string().optional(),
      total: z.number().optional().default(0),
      service: z.object({}).optional(),
      extendCost: z.number().optional().default(0),
      refurbishCost: z.number().optional().default(0),
      isDeleted: z.boolean().optional().default(false),
    }),
  }),
});


export const QuoteValidation = {
  createQuoteValidationSchema,
};


