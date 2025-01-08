/* eslint-disable @typescript-eslint/no-this-alias */
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
      type: String,
      required: true, 
    },
    refurbishTypePrice: {
      type: Number,
      required: true, 
    },
    refurbishSize: {
      type: Number, 
      required: true, 
    },
    refurbishSizePrice: {
      type: Number, 
      required: true, 
    },
    extendSize: {
      type: Number, 
      required: true, 
    },
    extendSizePrice: {
      type: Number, 
      required: true, 
    },
    finishLevel: {
      type: String, 
      required: true, 
    },
    finishLevelPrice: {
      type: Number, 
      required: true, 
    },
    bathrooms: {
      type: Number, 
      required: true, 
    },
    bathroomsPrice: {
      type: Number, 
      required: true, 
    },
    windowSize: {
      type: Number, 
      required: true, 
    },
    windowSizePrice: {
      type: Number, 
      required: true, 
    },
    startTime: {
      type: String, 
      required: true, 
    },
    startTimePrice: {
      type: Number, 
      required: true, 
    },
    service: {
      type: String, 
      required: true, 
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
    otherPrice: {
        interiorDesign: {
          type: Number,
        },
        architectural: {
          type: Number,
        },
        structuralEngineering: {
          type: Number,
        },
        planning: {
          type: Number,
        }
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
