import { Schema, model } from 'mongoose';
      import { TFinishLevel, FinishLevelModel } from './FinishLevel.interface';

      const FinishLevelSchema = new Schema<TFinishLevel, FinishLevelModel>({
        level: { type: String, required: true },
        subscriberId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        price: { type: Number, required: true },
        info: { type: String},
        isDeleted: { type: Boolean, default: false },
      });
      
      FinishLevelSchema.statics.isFinishLevelExists = async function (id: string) {
        return await this.findOne({ _id: id, isDeleted: false });
      };
      
      export const FinishLevel = model<TFinishLevel, FinishLevelModel>('FinishLevel', FinishLevelSchema);
      