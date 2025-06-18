import { Schema, model } from 'mongoose';
      import { TExtendSize, ExtendSizeModel } from './ExtendSize.interface';
      
      const ExtendSizeSchema = new Schema<TExtendSize, ExtendSizeModel>({
        name: { type: String, required: true },
            subscriberId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        squareMeterSize: { type: String },
        price: { type: Number, required: true },
        info: { type: String},
        isDeleted: { type: Boolean, default: false },
      });
      
      ExtendSizeSchema.statics.isExtendSizeExists = async function (id: string) {
        return await this.findOne({ _id: id, isDeleted: false });
      };
      
      export const ExtendSize = model<TExtendSize, ExtendSizeModel>('ExtendSize', ExtendSizeSchema);
      