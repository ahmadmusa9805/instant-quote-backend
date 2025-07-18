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
      propertyPostCode: z.string(),
      propertyAddress: z.string(),
      isRead: z.boolean().optional().default(false),
      note: z.string().optional(),
      isDeleted: z.boolean().optional().default(false),
    }),
  }),
});
export const updateQuoteValidationSchema = z.object({
  body: z.object({
    quote: z.object({
      userId: z.string()
        .regex(objectIdRegex, "Invalid ObjectId format for userId")
        .nonempty("User ID is required").optional(),
      subscriberId: z.string()
        .regex(objectIdRegex, "Invalid ObjectId format for userId")
        .nonempty("User ID is required").optional(),
      property: z.string().optional(),
      propertyPart: z.string().optional(),
      refurbishType: z.object({
        type: z.string().optional(),
        percentage: z.number().optional(),
      }).optional(),
      refurbishSize: z.object({
        quantity: z.number().optional(),
        price: z.number().optional(),
      }).optional(),
      extendSize: z.object({
        quantity: z.number().optional(),
        price: z.number().optional(),
      }).optional(),
      finishLevel: z.object({
        level: z.string().optional(),
        percentage: z.number().optional(),
      }).optional(),
      bathrooms: z.object({
        quantity: z.number().optional(),
        price: z.number().optional(),
      }).optional(),
      windowSize: z.object({
        quantity: z.number().optional(),
        price: z.number().optional(),
      }).optional(),
      startTime: z.object({
        startTime: z.string().min(1, "Start time is required").optional(),
        percentage: z.number().optional(),
      }).optional(),
      designIdea: z.string().min(1, "Design idea is required").optional(),
      file: z.string().optional(),
      total: z.number().optional().default(0),
      service: z.object({}).optional(),
      extendCost: z.number().optional().default(0),
      refurbishCost: z.number().optional().default(0),
      propertyPostCode: z.string().optional(),
      propertyAddress: z.string().optional(),
      isRead: z.boolean().optional().default(false),
      note: z.string().optional(),
      isDeleted: z.boolean().optional().default(false),
    }),
  }),
});


export const QuoteValidation = {
  createQuoteValidationSchema,
  updateQuoteValidationSchema
};


