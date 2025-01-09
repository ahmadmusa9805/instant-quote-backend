import { z } from 'zod';

// export const createQuoteValidationSchema = z.object({
//   body: z.object({
//     quote: z.object({
//       name: z.object({
//         firstName: z.string().nonempty('First Name is required'),
//         lastName: z.string().nonempty('Last Name is required'),
//       }).optional(),
//       email: z.string().email('Invalid email format').optional(),
//       contactNo: z.string().optional(),
//       propertyAddress: z.string(),
//       propertyPostCode: z.string(),
//       // userId: z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId format for userId"), // MongoDB ObjectId validation
//       property: z.string().min(1, "Property is required"),
//       propertyPart: z.string().min(1, "Property part is required"),
//       refurbishType: z.string().min(1, "Refurbish type is required"),
//       refurbishSize: z.number().positive("Refurbish size must be a positive number"),
//       extendSize: z.number().positive("Extend size must be a positive number"),
//       finishLevel: z.string().min(1, "Finish level is required"),
//       bathrooms: z.number().nonnegative("Bathrooms must be a non-negative number"),
//       windowSize: z.number().nonnegative("Window size must be a non-negative number"),
//       startTime: z.string().min(1, "Start time is required"),
//       service: z.string().min(1, "Service is required"),
//       designIdea: z.string().min(1, "Design idea is required"),
//       file: z.string().optional(), // Optional field for file
//       total: z.number().optional(), // Optional field for file
//       isDeleted: z.boolean().optional(), // Optional field with default value
//     }),
//   }),
// });
////////
// Utility for validating MongoDB ObjectId
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
      refurbishSizePrice: z.number().optional(),
      extendSize: z.object({
        quantity: z.number(),
        price: z.number(),
      }),
      extendSizePrice: z.number().optional(),
      finishLevel: z.object({
        level: z.string(),
        percentage: z.number(),
      }),
      bathrooms: z.object({
        quantity: z.number(),
        price: z.number(),
      }),
      bathroomsPrice: z.number().optional(),
      windowSize: z.object({
        quantity: z.number(),
        price: z.number(),
      }),
      windowSizePrice: z.number().optional(),
      startTime: z.object({
        startTime: z.string().min(1, "Start time is required"),
        percentage: z.number(),
      }),
      startTimePrice: z.number().positive("Start time price is required").optional(),
      service: z.string().min(1, "Service is required"),
      designIdea: z.string().min(1, "Design idea is required"),
      file: z.string().optional(),
      total: z.number().optional().default(0),
      otherPrice: z.object({
        interiorDesign: z.number().optional(),
        architectural: z.number().optional(),
        structuralEngineering: z.number().optional(),
        planning: z.number().optional(),
      }).optional(),
      extendCost: z.number().optional().default(0),
      refurbishCost: z.number().optional().default(0),
      isDeleted: z.boolean().optional().default(false),
    }),
  }),
});


export const QuoteValidation = {
  createQuoteValidationSchema,
};


