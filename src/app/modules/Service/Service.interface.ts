/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TService = {
  name: string;
  subscriberId: Types.ObjectId;
  price: number;
  hotChoice: boolean;
  info: string;
  isDeleted: boolean;
};

export interface ServiceModel extends Model<TService> {
  isServiceExists(id: string): Promise<TService | null>;
}
