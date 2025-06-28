/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TCallBooking = {
  // createdAt: string | number | Date;
  // adminId: Types.ObjectId;
  // userId: Types.ObjectId;
  // quoteId: Types.ObjectId;
  // day: string;
  // startTime: string;
  // endTime: string;
  // date: Date;
  // state: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  // isDeleted: boolean;
  date: string; // e.g., "2025-07-01"
  day: string;
  start: string; // e.g., "09:00"
  end: string;   // e.g., "10:00"
  bookedBy: Types.ObjectId; // User ID
  subscriberId: Types.ObjectId;
  state: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  quoteId: Types.ObjectId;
};

export interface CallBookingModel extends Model<TCallBooking> {
  isCallBookingExists(id: string): Promise<TCallBooking | null>;
}
