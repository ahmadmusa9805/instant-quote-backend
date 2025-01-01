import { Schema, model } from 'mongoose';
      import { TInclusion, InclusionModel } from './Inclusion.interface';
      
      const InclusionSchema = new Schema<TInclusion, InclusionModel>({
        title: { type: String, required: true },
        isDeleted: { type: Boolean, default: false },
      });
      
      InclusionSchema.statics.isInclusionExists = async function (id: string) {
        return await this.findOne({ _id: id, isDeleted: false });
      };
      
      export const Inclusion = model<TInclusion, InclusionModel>('Inclusion', InclusionSchema);
      