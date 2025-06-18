/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TStartTime = {
  startTime: string;
  subscriberId: Types.ObjectId;
  price: number;
  info: string;
  isDeleted: boolean;
};

export interface StartTimeModel extends Model<TStartTime> {
  isStartTimeExists(id: string): Promise<TStartTime | null>;
}
