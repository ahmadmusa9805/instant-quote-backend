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
  startTime: Date;
  service: string;
  designIdea: string;
  file: string;
  isDeleted: boolean;
}

export interface QuoteModel extends Model<TQuote> {
  //instance methods for checking if the user exist
  isQuoteExistById(id: string): Promise<TQuote>;

}

  // password: string;
  // passwordChangedAt?: Date;
  // role: 'superAdmin' | 'admin' | 'actor' | 'judge';
  // status?: 'active' | 'blocked';