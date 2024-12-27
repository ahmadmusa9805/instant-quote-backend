import { Schema, model } from 'mongoose';
      import { TRefurbishmentType, RefurbishmentTypeModel } from './RefurbishmentType.interface';
      
      const RefurbishmentTypeSchema = new Schema<TRefurbishmentType, RefurbishmentTypeModel>({
        name: { type: String, required: true },
        description: { type: String },
        atcCodes: { type: String, required: true },
        isDeleted: { type: Boolean, default: false },
      });
      
      RefurbishmentTypeSchema.statics.isRefurbishmentTypeExists = async function (id: string) {
        return await this.findOne({ _id: id, isDeleted: false });
      };
      
      export const RefurbishmentType = model<TRefurbishmentType, RefurbishmentTypeModel>('RefurbishmentType', RefurbishmentTypeSchema);
      