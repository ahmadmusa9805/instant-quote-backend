import { Model } from 'mongoose';

export type TService = {
  name: string;
  description?: string;
  atcCodes: string;
  isDeleted: boolean;
};

export interface ServiceModel extends Model<TService> {
  isServiceExists(id: string): Promise<TService | null>;
}
