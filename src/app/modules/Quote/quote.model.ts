
import { Schema, model } from 'mongoose';
import { QuoteModel, TQuote } from './quote.interface';


const quoteSchema = new Schema<TQuote, QuoteModel>(
  {
    userId: {
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
    service: {
      interiorDesign: Number,
  architectural: Number,
  structuralEngineering: Number,
  planning: Number
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
      default: 0, 
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
