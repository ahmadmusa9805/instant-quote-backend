/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TFinishLevel = {
  level: string;
  price: number;
  info: string;
  isDeleted: boolean;
};

export interface FinishLevelModel extends Model<TFinishLevel> {
  isFinishLevelExists(id: string): Promise<TFinishLevel | null>;
}
