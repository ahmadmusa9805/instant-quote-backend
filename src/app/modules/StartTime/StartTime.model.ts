import { Schema, model } from 'mongoose';
      import { TStartTime, StartTimeModel } from './StartTime.interface';
      
      const StartTimeSchema = new Schema<TStartTime, StartTimeModel>({
        startTime: { type: String, required: true },
         subscriberId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        price: { type: Number, required: true },
        info: { type: String},
        isDeleted: { type: Boolean, default: false },
      });
      
      StartTimeSchema.statics.isStartTimeExists = async function (id: string) {
        return await this.findOne({ _id: id, isDeleted: false });
      };
      
      export const StartTime = model<TStartTime, StartTimeModel>('StartTime', StartTimeSchema);
      