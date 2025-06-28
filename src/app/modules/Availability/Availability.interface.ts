/* eslint-disable no-unused-vars */
import { Model, Types} from 'mongoose';


export type TAvailability = {
  daysOfWeek: number[]; // 0=Sun, 1=Mon, ...
  timeSlots: {
    start: string; // "09:00"
    end: string;   // "10:00"
  }[];
  createdBy: Types.ObjectId;
  subscriberId: Types.ObjectId;
};

export interface AvailabilityModel extends Model<TAvailability> {
  isAvailabilityExists(id: string): Promise<TAvailability | null>;
}
