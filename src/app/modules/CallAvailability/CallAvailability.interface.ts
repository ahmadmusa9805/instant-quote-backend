/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TCallAvailability = {
  adminId: Types.ObjectId;
  day: string;
  startTime: string;
  endTime: string;
  date?: Date;
  isDeleted: boolean;
};

export interface CallAvailabilityModel extends Model<TCallAvailability> {
  isCallAvailabilityExists(id: string): Promise<TCallAvailability | null>;
}
