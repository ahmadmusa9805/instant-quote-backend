/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TCallAvailability = {
  // adminId: Types.ObjectId;
  // day: string;
  // startTime: string;
  // endTime: string;
  // date?: Date;
  // isDeleted: boolean;

    daysOfWeek: number[]; // 0=Sun, 1=Mon, ...
  timeSlots: {
    start: string; // "09:00"
    end: string;   // "10:00"
  }[];
  createdBy: Types.ObjectId;
  subscriberId: Types.ObjectId;
};

export interface CallAvailabilityModel extends Model<TCallAvailability> {
  isCallAvailabilityExists(id: string): Promise<TCallAvailability | null>;
}
