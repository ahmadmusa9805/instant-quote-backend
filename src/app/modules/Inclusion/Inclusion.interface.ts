/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TInclusion = {
  title: string;
  isDeleted: boolean;
};

export interface InclusionModel extends Model<TInclusion> {
  isInclusionExists(id: string): Promise<TInclusion | null>;
}
