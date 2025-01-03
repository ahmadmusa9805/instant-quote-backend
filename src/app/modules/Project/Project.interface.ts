/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TProject = {
  title: string;
  description: string;
  img: string;
  isDeleted: boolean;
};

export interface ProjectModel extends Model<TProject> {
  isProjectExists(id: string): Promise<TProject | null>;
}
