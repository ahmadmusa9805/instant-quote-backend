/* eslint-disable no-unused-vars */
import { Model , Types} from 'mongoose';

export type TExclusion = {
  title: string;
  subscriberId: Types.ObjectId;
  info: string;
  isDeleted: boolean;
};

export interface ExclusionModel extends Model<TExclusion> {
  isExclusionExists(id: string): Promise<TExclusion | null>;
}
