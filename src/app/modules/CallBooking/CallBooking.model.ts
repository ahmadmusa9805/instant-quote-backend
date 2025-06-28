import { Schema, model } from 'mongoose';
      import { TCallBooking, CallBookingModel } from './CallBooking.interface';

  const CallBookingSchema = new Schema<TCallBooking, CallBookingModel>({
     day: { type: String, required: true },
      date: { type: String, required: true }, // format: YYYY-MM-DD
    start: { type: String, required: true },
    end: { type: String, required: true },
    bookedBy: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    subscriberId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    quoteId: { type: Schema.Types.ObjectId, ref: 'Quote', required: true },
    state: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' },
  }, { timestamps: true });
      
      CallBookingSchema.statics.isCallBookingExists = async function (id: string) {
        return await this.findOne({ _id: id, isDeleted: false });
      };
      
      export const CallBooking = model<TCallBooking, CallBookingModel>('CallBooking', CallBookingSchema);
      