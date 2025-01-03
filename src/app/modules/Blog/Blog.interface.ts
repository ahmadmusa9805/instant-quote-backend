/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TBlog = {
  title: string;
  description?: string;
  img: string;
  isDeleted: boolean;
};

export interface BlogModel extends Model<TBlog> {
  isBlogExists(id: string): Promise<TBlog | null>;
}
