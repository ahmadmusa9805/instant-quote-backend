/* eslint-disable no-unused-vars */
import { Model , Types} from 'mongoose';

export type TRefurbishmentType = {
  title: string;
  subscriberId: Types.ObjectId;
  subtitle: string;
  price: number;
  info: string;
  isDeleted: boolean;
};

export interface RefurbishmentTypeModel extends Model<TRefurbishmentType> {
  isRefurbishmentTypeExists(id: string): Promise<TRefurbishmentType | null>;
}
