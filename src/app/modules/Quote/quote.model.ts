
import { Schema, model } from 'mongoose';
import { QuoteModel, TQuote, TService } from './quote.interface';


const serviceSchema = new Schema<TService>(
  {
    name: {
      type: String,
      required: [true, 'Service name is required'],
    },
    value: {
      type: Number,
      required: [true, 'Service value is required'],
    },
  },
  { _id: false } // Prevent creation of a separate _id for each service object
);

const quoteSchema = new Schema<TQuote, QuoteModel>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      ref: 'User',
    },
    subscriberId: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      ref: 'User',
    },
    property: {
      type: String,
      required: true, 
    },
    propertyPart: {
      type: String,
      required: true, 
    },
    refurbishType: {
      type: {
        type: String,
        required: true,
      },
      percentage: {
        type: Number,
        required: true,
      }
    },
    refurbishSize: {
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      }
    },
    extendSize: {
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      }
    },
    finishLevel: {
      level: {
        type: String,
        required: true,
      },
      percentage: {
        type: Number,
        required: true,
      }
    },
    bathrooms: {
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      }
    },
    bathroomsPrice: {
      type: Number, 
      required: true, 
    },
    windowSize: {
      quantity: {
        type: Number,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      }
    },
    windowSizePrice: {
      type: Number, 
      required: true, 
    },
    startTime: {
      startTime: {
        type: String,
        required: true,
      },
      percentage: {
        type: Number,
        required: true,
      }
    },
    startTimePrice: {
      type: Number, 
      required: true, 
    },
    services: {
      type: [serviceSchema], // Use the service schema to define an array of service objects
      required: [true, 'Services are required'],
    },
    designIdea: {
      type: String,
      required: true, 
    },
    file: {
      type: String, 
    },
    total: {
      type: Number,
      required: true, // Ensures `total` must be provided
    },
      extendCost: {
        type: Number, 
        default: 0, 
      },
      refurbishCost: {
        type: Number, 
        default: 0, 
      },
    // },
    propertyPostCode: {
      type: String,
      required: true,
    },
    propertyAddress: {
      type: String,
      required: true,
    },
    readBy: [
       {
      type: Schema.Types.ObjectId,
      ref: 'User',
      },
    ],
    note: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);


quoteSchema.statics.isQuoteExistById = async function (id: string) {
  return await Quote.findOne({ id });
};



export const Quote = model<TQuote, QuoteModel>('Quote', quoteSchema);
