/* eslint-disable no-unused-vars */
import { Model,Types } from 'mongoose';

export type TInclusion = {
  title: string;
    subscriberId: Types.ObjectId;
  info: string;
  isDeleted: boolean;
};

export interface InclusionModel extends Model<TInclusion> {
  isInclusionExists(id: string): Promise<TInclusion | null>;
}
