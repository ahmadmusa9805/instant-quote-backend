import { Schema, model } from 'mongoose';
import { TCallAvailability, CallAvailabilityModel } from './CallAvailability.interface';

const CallAvailabilitySchema = new Schema<TCallAvailability, CallAvailabilityModel>({
        adminId: { type: Schema.Types.ObjectId,         
        required: [true, 'User id is required'],
        ref: 'User', },
        day: { type: String, required: true },
        startTime : { type: String, required: true },
        endTime: { type: String, required: true },
        date: { type: Date },
        isDeleted: { type: Boolean, default: false },
});
      

CallAvailabilitySchema.statics.isCallAvailabilityExists = async function (id: string) {
        return await this.findOne({ _id: id, isDeleted: false });
};
      
export const CallAvailability = model<TCallAvailability, CallAvailabilityModel>('CallAvailability', CallAvailabilitySchema);
      