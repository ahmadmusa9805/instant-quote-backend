import { Model } from 'mongoose';

export type TRefurbishmentSize = {
  name: string;
  description?: string;
  atcCodes: string;
  isDeleted: boolean;
};

export interface RefurbishmentSizeModel extends Model<TRefurbishmentSize> {
  isRefurbishmentSizeExists(id: string): Promise<TRefurbishmentSize | null>;
}
