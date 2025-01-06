/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TWeDo = {
  title: string;
  description?: string;
  isDeleted: boolean;
};

export interface WeDoModel extends Model<TWeDo> {
  isWeDoExists(id: string): Promise<TWeDo | null>;
}
