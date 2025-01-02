import { Model } from 'mongoose';

export type TProject = {
  name: string;
  description?: string;
  atcCodes: string;
  isDeleted: boolean;
};

export interface ProjectModel extends Model<TProject> {
  isProjectExists(id: string): Promise<TProject | null>;
}
