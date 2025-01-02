/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TCallBooking = {
  userId: Types.ObjectId;
  quoteId: Types.ObjectId;
  day: string;
  date: Date;
  startTime: string;
  endTime: string;
  isDeleted: boolean;
};

export interface CallBookingModel extends Model<TCallBooking> {
  isCallBookingExists(id: string): Promise<TCallBooking | null>;
}
