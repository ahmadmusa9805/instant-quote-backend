/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TExtendSize = {
  name: string;
  squareMeterSize: string;
  price: number;
  info: string;
  isDeleted: boolean;
};

export interface ExtendSizeModel extends Model<TExtendSize> {
  isExtendSizeExists(id: string): Promise<TExtendSize | null>;
}
