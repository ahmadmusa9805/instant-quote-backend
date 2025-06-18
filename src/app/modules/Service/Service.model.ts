import { Schema, model } from 'mongoose';
      import { TService, ServiceModel } from './Service.interface';
      
      const ServiceSchema = new Schema<TService, ServiceModel>({
        name: { type: String, required: true },
        subscriberId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        price: { type: Number, required: true },
        hotChoice: { type: Boolean, default: false },
        info: { type: String},
        isDeleted: { type: Boolean, default: false },
      });
      
      ServiceSchema.statics.isServiceExists = async function (id: string) {
        return await this.findOne({ _id: id, isDeleted: false });
      };
      
      export const Service = model<TService, ServiceModel>('Service', ServiceSchema);
      