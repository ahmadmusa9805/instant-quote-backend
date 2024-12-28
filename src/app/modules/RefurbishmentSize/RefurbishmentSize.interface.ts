/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TRefurbishmentSize = {
  name: string;
  squareMeterSize: string;
  price: number;
  isDeleted: boolean;
};

export interface RefurbishmentSizeModel extends Model<TRefurbishmentSize> {
  isRefurbishmentSizeExists(id: string): Promise<TRefurbishmentSize | null>;
}
