/* eslint-disable no-unused-vars */
import { Model , Types} from 'mongoose';

export type TRefurbishmentSize = {
  name: string;
  subscriberId: Types.ObjectId;
  squareMeterSize: string;
  price: number;
  info: string;
  isDeleted: boolean;
};

export interface RefurbishmentSizeModel extends Model<TRefurbishmentSize> {
  isRefurbishmentSizeExists(id: string): Promise<TRefurbishmentSize | null>;
}
