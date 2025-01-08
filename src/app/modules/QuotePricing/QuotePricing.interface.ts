/* eslint-disable no-unused-vars */
import { Document, Model } from 'mongoose';

export interface TQuotePricing extends Document {
  refurbishSize: Map<string, number>;
  refurbishType: Map<string, number>;
  extendSize: Map<string, number>;
  finishLevel: Map<string, number>;
  bathroom: Map<string, number>;
  window: Map<string, number>;
  startTime: Map<string, number>;
  feesPerSqm: {
    interiorDesign: number;
    architectural: number;
    structuralEngineering: number;
    planning: number;
  };
  isDeleted: boolean;
}
// export interface TQuotePricing extends Document {
//   refurbishSize: Record<string, number>;
//   refurbishType: Record<string, number>;
//   extendSize: Record<string, number>;
//   finishLevel: Record<string, number>;
//   bathroom: Record<string, number>;
//   window: Record<string, number>;
//   startTime: Record<string, number>;
//   feesPerSqm: {
//     interiorDesign: number;
//     architectural: number;
//     structuralEngineering: number;
//     planning: number;
//   };
//   isDeleted: boolean;
// }

// interface QuotePricingModel extends Model<TQuotePricing> {}




export interface QuotePricingModel extends Model<TQuotePricing> {
  isQuotePricingExists(id: string): Promise<TQuotePricing | null>;
}
