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
    refurbishSize: {
      type: Number, 
      required: true, 
    },
    extendSize: {
      type: Number, 
      required: true, 
    },
    finishLevel: {
      type: String, 
      required: true, 
    },
    bathrooms: {
      type: Number, 
      required: true, 
    },
    windowSize: {
      type: Number, 
      required: true, 
    },
    startTime: {
      type: String, 
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
