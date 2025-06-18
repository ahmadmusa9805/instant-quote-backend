/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TBathroom = {
  bathroomQuantity: number;
    subscriberId: Types.ObjectId;
  price: number;
  info: string;
  isDeleted: boolean;
};

export interface BathroomModel extends Model<TBathroom> {
  isBathroomExists(id: string): Promise<TBathroom | null>;
}
