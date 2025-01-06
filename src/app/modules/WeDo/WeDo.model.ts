import { Schema, model } from 'mongoose';
      import { TWeDo, WeDoModel } from './WeDo.interface';
      
      const WeDoSchema = new Schema<TWeDo, WeDoModel>({
        title: { type: String, required: true },
        description: { type: String },
        isDeleted: { type: Boolean, default: false },
      });
      
      WeDoSchema.statics.isWeDoExists = async function (id: string) {
        return await this.findOne({ _id: id, isDeleted: false });
      };
      
      export const WeDo = model<TWeDo, WeDoModel>('WeDo', WeDoSchema);
      