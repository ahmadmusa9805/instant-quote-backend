import { Schema, model } from 'mongoose';
import { TBooking, BookingModel } from './Booking.interface';

const BookingSchema = new Schema<TBooking, BookingModel>(
  {
    date: { type: String, required: true }, // format: YYYY-MM-DD
    start: { type: String, required: true },
    end: { type: String, required: true },
    bookedBy: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    subscriberId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

BookingSchema.statics.isBookingExists = async function (id: string) {
  return await this.findOne({ _id: id, isDeleted: false });
};

export const Booking = model<TBooking, BookingModel>('Booking', BookingSchema);
