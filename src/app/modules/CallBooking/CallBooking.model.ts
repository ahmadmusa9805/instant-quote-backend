import { Schema, model } from 'mongoose';
      import { TCallBooking, CallBookingModel } from './CallBooking.interface';

  const CallBookingSchema = new Schema<TCallBooking, CallBookingModel>({
     userId: { type: Schema.Types.ObjectId,  required: true },
     quoteId: { type: Schema.Types.ObjectId, required: true },
     day: { type: String, required: true },
     date: { type: Date, required: true },
     startTime: { type: String, required: true },
     endTime: { type: String, required: true },
     state: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' },
     isDeleted: { type: Boolean, default: false },
  });
      
      CallBookingSchema.statics.isCallBookingExists = async function (id: string) {
        return await this.findOne({ _id: id, isDeleted: false });
      };
      
      export const CallBooking = model<TCallBooking, CallBookingModel>('CallBooking', CallBookingSchema);
      