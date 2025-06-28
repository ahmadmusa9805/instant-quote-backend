/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TBooking = {
  date: string; // e.g., "2025-07-01"
  day: string;
  start: string; // e.g., "09:00"
  end: string;   // e.g., "10:00"
  bookedBy: Types.ObjectId; // User ID
  subscriberId: Types.ObjectId;
  state: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  quoteId: Types.ObjectId;
};

export interface BookingModel extends Model<TBooking> {
  isBookingExists(id: string): Promise<TBooking | null>;
}
