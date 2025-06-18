/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TFinishLevel = {
  level: string;
  subscriberId: Types.ObjectId;
  price: number;
  info: string;
  isDeleted: boolean;
};

export interface FinishLevelModel extends Model<TFinishLevel> {
  isFinishLevelExists(id: string): Promise<TFinishLevel | null>;
}
