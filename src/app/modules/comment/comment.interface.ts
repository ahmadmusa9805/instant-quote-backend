/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TComment = {
  blogId: Types.ObjectId;
  userId: Types.ObjectId;
  text: string;
  isDeleted: boolean;
};

export interface CommentModel extends Model<TComment> {
  isCommentExists(id: string): Promise<TComment | null>;
}
