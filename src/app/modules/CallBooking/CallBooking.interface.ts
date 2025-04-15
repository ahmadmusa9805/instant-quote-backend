/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TCallBooking = {
  createdAt: string | number | Date;
  adminId: Types.ObjectId;
  userId: Types.ObjectId;
  quoteId: Types.ObjectId;
  day: string;
  startTime: string;
  endTime: string;
  date: Date;
  state: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  isDeleted: boolean;
};

export interface CallBookingModel extends Model<TCallBooking> {
  isCallBookingExists(id: string): Promise<TCallBooking | null>;
}
