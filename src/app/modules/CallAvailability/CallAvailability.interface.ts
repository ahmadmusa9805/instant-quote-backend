/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TCallAvailability = {
  day: string;
  startTime: string;
  endTime: string;
  date?: Date;
  isDeleted: boolean;
};

export interface CallAvailabilityModel extends Model<TCallAvailability> {
  isCallAvailabilityExists(id: string): Promise<TCallAvailability | null>;
}
