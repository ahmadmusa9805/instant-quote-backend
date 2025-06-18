/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TWindow = {
  windowSquareMeters: number;
  subscriberId: Types.ObjectId;
  price: number;
  info: string;
  isDeleted: boolean;
};

export interface WindowModel extends Model<TWindow> {
  isWindowExists(id: string): Promise<TWindow | null>;
}
