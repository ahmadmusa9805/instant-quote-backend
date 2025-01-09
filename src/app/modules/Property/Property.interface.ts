/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TProperty = {
  name: string;
  image: string;
  isDeleted: boolean;
};


export interface PropertyModel extends Model<TProperty> {
  isPropertyExists(id: string): Promise<TProperty | null>;
}
