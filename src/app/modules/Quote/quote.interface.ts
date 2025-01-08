/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type  TQuote = {
  userId: Types.ObjectId;
  property: string;
  propertyPart: string;
  refurbishType: string;
  refurbishSize: number;
  extendSize: number;
  finishLevel: string;
  bathrooms: number;
  windowSize: number;
  startTime: string;
  service: string;
  designIdea: string;
  file?: string;
  propertyAddress: string;
  propertyPostCode: string;
  total: number;
  isDeleted: boolean;
}

export interface QuoteModel extends Model<TQuote> {
  //instance methods for checking if the user exist
  isQuoteExistById(id: string): Promise<TQuote>;
}
