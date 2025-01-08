import { model, Schema } from "mongoose";
import { QuotePricingModel, TQuotePricing } from "./QuotePricing.interface";



const QuotePricingSchema = new Schema<TQuotePricing, QuotePricingModel>(
  {
    refurbishSize: {
      type: Map,
      of: Number,
      required: true,
    },
    refurbishType: {
      type: Map,
      of: Number,
      required: true,
    },
    extendSize: {
      type: Map,
      of: Number,
      required: true,
    },
    finishLevel: {
      type: Map,
      of: Number,
      required: true,
    },
    bathroom: {
      type: Map,
      of: Number,
      required: true,
    },
    window: {
      type: Map,
      of: Number,
      required: true,
    },
    startTime: {
      type: Map,
      of: Number,
      required: true,
    },
    feesPerSqm: {
      type: {
        interiorDesign: { type: Number, required: true },
        architectural: { type: Number, required: true },
        structuralEngineering: { type: Number, required: true },
        planning: { type: Number, required: true },
      },
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

      
 QuotePricingSchema.statics.isQuotePricingExists = async function (id: string) {
      return await this.findOne({ _id: id, isDeleted: false });
};
      
export const QuotePricing = model<TQuotePricing, QuotePricingModel>('QuotePricing', QuotePricingSchema);
      