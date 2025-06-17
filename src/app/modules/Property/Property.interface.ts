/* eslint-disable no-unused-vars */
import { Model , Types} from 'mongoose';

export type TProperty = {
  subscriberId: Types.ObjectId;
  name: string;
  image: string;
  info: string;
  isDeleted: boolean;
};


export interface PropertyModel extends Model<TProperty> {
  isPropertyExists(id: string): Promise<TProperty | null>;
}
