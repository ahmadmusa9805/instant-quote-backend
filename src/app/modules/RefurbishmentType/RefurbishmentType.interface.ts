import { Model } from 'mongoose';

export type TRefurbishmentType = {
  name: string;
  description?: string;
  atcCodes: string;
  isDeleted: boolean;
};

export interface RefurbishmentTypeModel extends Model<TRefurbishmentType> {
  isRefurbishmentTypeExists(id: string): Promise<TRefurbishmentType | null>;
}
