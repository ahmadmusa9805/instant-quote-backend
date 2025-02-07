/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TWindow = {
  windowSquareMeters: number;
  price: number;
  info: string;
  isDeleted: boolean;
};

export interface WindowModel extends Model<TWindow> {
  isWindowExists(id: string): Promise<TWindow | null>;
}
