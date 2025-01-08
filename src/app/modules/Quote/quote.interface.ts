/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';



export type  TQuote = {
  userId: Types.ObjectId;
  property: string;
  propertyPart: string;
  refurbishType: string;
  refurbishTypePrice: number;
  refurbishSize: number;
  refurbishSizePrice: number;
  extendSize: number;
  extendSizePrice: number;
  finishLevel: string;
  finishLevelPrice: number;
  bathrooms: number;
  bathroomsPrice: number;
  windowSize: number;
  windowSizePrice: number;
  startTime: string;
  startTimePrice: number;
  service: string;
  designIdea: string;
  file?: string;
  propertyAddress: string;
  propertyPostCode: string;
  otherPrice: {
    interiorDesign: number;
    architectural: number;
    structuralEngineering: number;
    planning: number;
  };
  total: number;
  isDeleted: boolean;
}


export interface QuoteModel extends Model<TQuote> {
  //instance methods for checking if the user exist
  isQuoteExistById(id: string): Promise<TQuote>;
}
