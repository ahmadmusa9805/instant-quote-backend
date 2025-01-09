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
      property: z.string().min(1, "Property is required"),
      propertyPart: z.string().min(1, "Property part is required"),
      refurbishType: z.object({
        type: z.string().min(1, "Refurbish type is required"),
        percentage: z.number().positive("Percentage must be a positive number"),
      }),
      refurbishSize: z.object({
        quantity: z.number().positive("Quantity must be a positive number"),
        price: z.number().positive("Price must be a positive number"),
      }),
      refurbishSizePrice: z.number().positive("Refurbish size price is required").optional(),
      extendSize: z.object({
        quantity: z.number().positive("Quantity must be a positive number"),
        price: z.number().positive("Price must be a positive number"),
      }),
      extendSizePrice: z.number().positive("Extend size price is required").optional(),
      finishLevel: z.object({
        level: z.string().min(1, "Finish level is required"),
        percentage: z.number().positive("Percentage must be a positive number"),
      }),
      bathrooms: z.object({
        quantity: z.number().nonnegative("Bathrooms quantity must be non-negative"),
        price: z.number().positive("Bathrooms price must be positive"),
      }),
      bathroomsPrice: z.number().positive("Bathrooms price is required").optional(),
      windowSize: z.object({
        quantity: z.number().nonnegative("Window size quantity must be non-negative"),
        price: z.number().positive("Window size price must be positive"),
      }),
      windowSizePrice: z.number().positive("Window size price is required").optional(),
      startTime: z.object({
        startTime: z.string().min(1, "Start time is required"),
        percentage: z.number().positive("Percentage must be a positive number"),
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


