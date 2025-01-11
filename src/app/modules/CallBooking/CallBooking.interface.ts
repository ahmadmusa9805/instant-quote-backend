/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TCallBooking = {
  adminId: Types.ObjectId;
  userId: Types.ObjectId;
  quoteId: Types.ObjectId;
  day: string;
  date: Date;
  startTime: string;
  state: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  endTime: string;
  isDeleted: boolean;
};

export interface CallBookingModel extends Model<TCallBooking> {
  isCallBookingExists(id: string): Promise<TCallBooking | null>;
}
