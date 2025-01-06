/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TBathroom = {
  bathroomQuantity: number;
  price: number;
  isDeleted: boolean;
};

export interface BathroomModel extends Model<TBathroom> {
  isBathroomExists(id: string): Promise<TBathroom | null>;
}
