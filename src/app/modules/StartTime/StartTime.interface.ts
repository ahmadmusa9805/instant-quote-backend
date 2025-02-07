/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TStartTime = {
  startTime: string;
  price: number;
  info: string;
  isDeleted: boolean;
};

export interface StartTimeModel extends Model<TStartTime> {
  isStartTimeExists(id: string): Promise<TStartTime | null>;
}
