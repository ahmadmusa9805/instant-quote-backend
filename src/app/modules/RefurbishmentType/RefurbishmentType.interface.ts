/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TRefurbishmentType = {
  title: string;
  subtitle: string;
  price: number;
  isDeleted: boolean;
};

export interface RefurbishmentTypeModel extends Model<TRefurbishmentType> {
  isRefurbishmentTypeExists(id: string): Promise<TRefurbishmentType | null>;
}
