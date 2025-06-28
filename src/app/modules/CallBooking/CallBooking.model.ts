import { Schema, model } from 'mongoose';
      import { TCallBooking, CallBookingModel } from './CallBooking.interface';

  const CallBookingSchema = new Schema<TCallBooking, CallBookingModel>({
    //  adminId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    //  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    //  quoteId: { type: Schema.Types.ObjectId, required: true },
    //  startTime: { type: String, required: true },
    //  endTime: { type: String, required: true },
    //  state: { type: String, enum: ['pending', 'confirmed', 'cancelled', 'completed'], default: 'pending' },
    //  isDeleted: { type: Boolean, default: false },
    //  date: { type: Date, required: true },
    //  day: { type: String, required: true },
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
      