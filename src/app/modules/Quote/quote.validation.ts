import { z } from 'zod';

export const createQuoteValidationSchema = z.object({
  body: z.object({
    quote: z.object({
      name: z.object({
        firstName: z.string().nonempty('First Name is required'),
        lastName: z.string().nonempty('Last Name is required'),
      }).optional(),
      email: z.string().email('Invalid email format').optional(),
      contactNo: z.string().optional(),
      propertyAddress: z.string(),
      propertyPostCode: z.string(),
      // userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format for userId"), // MongoDB ObjectId validation
      property: z.string().min(1, "Property is required"),
      propertyPart: z.string().min(1, "Property part is required"),
      refurbishType: z.string().min(1, "Refurbish type is required"),
      refurbishSize: z.number().positive("Refurbish size must be a positive number"),
      extendSize: z.number().positive("Extend size must be a positive number"),
      finishLevel: z.string().min(1, "Finish level is required"),
      bathrooms: z.number().nonnegative("Bathrooms must be a non-negative number"),
      windowSize: z.number().nonnegative("Window size must be a non-negative number"),
      startTime: z.string().min(1, "Start time is required"),
      service: z.string().min(1, "Service is required"),
      designIdea: z.string().min(1, "Design idea is required"),
      file: z.string().optional(), // Optional field for file
      isDeleted: z.boolean().optional(), // Optional field with default value
    }),
  }),
});

export const QuoteValidation = {
  createQuoteValidationSchema,
};


