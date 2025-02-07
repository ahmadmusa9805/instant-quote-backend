/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TExclusion = {
  title: string;
  info: string;
  isDeleted: boolean;
};

export interface ExclusionModel extends Model<TExclusion> {
  isExclusionExists(id: string): Promise<TExclusion | null>;
}
