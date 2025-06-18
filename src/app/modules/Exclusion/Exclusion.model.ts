import { Schema, model } from 'mongoose';
      import { TExclusion, ExclusionModel } from './Exclusion.interface';
      
      const ExclusionSchema = new Schema<TExclusion, ExclusionModel>({
        title: { type: String, required: true },
        subscriberId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        info: { type: String},
        isDeleted: { type: Boolean, default: false },
      });
      
      ExclusionSchema.statics.isExclusionExists = async function (id: string) {
        return await this.findOne({ _id: id, isDeleted: false });
      };
      
      export const Exclusion = model<TExclusion, ExclusionModel>('Exclusion', ExclusionSchema);
      