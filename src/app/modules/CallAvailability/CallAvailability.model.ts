import { Schema, model } from 'mongoose';
import { TCallAvailability, CallAvailabilityModel } from './CallAvailability.interface';

const CallAvailabilitySchema = new Schema<TCallAvailability, CallAvailabilityModel>({
    daysOfWeek: { type: [Number], required: true },
    timeSlots: {
      type: [
        {
          start: { type: String, required: true },
          end: { type: String, required: true },
        },
      ],
      required: true,
    },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    subscriberId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });
      

CallAvailabilitySchema.statics.isCallAvailabilityExists = async function (id: string) {
        return await this.findOne({ _id: id, isDeleted: false });
};
      
export const CallAvailability = model<TCallAvailability, CallAvailabilityModel>('CallAvailability', CallAvailabilitySchema);
      