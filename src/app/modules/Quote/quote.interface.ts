
/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TService = {
  name: string; // String property
  value: number;  // Number property
};

export type  TQuote = {
  userId: Types.ObjectId;
  subscriberId: Types.ObjectId;
  property: string;
  propertyPart: string;
  refurbishType: {
    type: string;
    percentage: number;
  };
  refurbishSize: {
    quantity: number;
    price: number;
  };
  extendSize: {
    quantity: number;
    price: number;
  };
  finishLevel: {
    level: string;
    percentage: number;
  };
  bathrooms: {
    quantity: number;
    price: number;
  };
  bathroomsPrice: number;
  windowSize: {
    quantity: number;
    price: number;
  };
  windowSizePrice: number;
  startTime: {
    startTime: string;
    percentage: number;
  };
  startTimePrice: number;
  designIdea: string;
  file?: string;
  propertyAddress: string;
  propertyPostCode: string;
  services: TService[];
  note: string;
  // services: Array<Record<string, number>>;
  extendCost: number;
  refurbishCost: number;
  total: number;
  // isRead: boolean;
  readBy: Types.ObjectId[],
  isDeleted: boolean;
}


export interface QuoteModel extends Model<TQuote> {
  //instance methods for checking if the user exist
  isQuoteExistById(id: string): Promise<TQuote>;
}
