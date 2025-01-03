/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { COMMENT_SEARCHABLE_FIELDS } from './comment.constant';
import mongoose from 'mongoose';
import { TComment } from './comment.interface';
import { Comment } from './comment.model';

const createCommentIntoDB = async (
  payload: TComment,
) => {
  const result = await Comment.create(payload);
  
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Comment');
  }

  return result;
};

const getAllCommentsFromDB = async (query: Record<string, unknown>) => {
  const CommentQuery = new QueryBuilder(
    Comment.find({isDeleted: false}).populate('userId'),
    query,
  )
    .search(COMMENT_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await CommentQuery.modelQuery;
  const meta = await CommentQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleCommentFromDB = async (id: string) => {
  const result = await Comment.findOne({id, isDeleted: false}).populate('userId');

  return result;
};

const updateCommentIntoDB = async (id: string, payload: any) => {
  const isDeletedService = await mongoose.connection
    .collection('comments')
    .findOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { projection: { isDeleted: 1 } },
    );

  if (!isDeletedService) {
    throw new Error('Comment not found');
  }

  if (isDeletedService.isDeleted) {
    throw new Error('Cannot update a deleted comment');
  }

  const updatedData = await Comment.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedData) {
    throw new Error('Comment not found after update');
  }

  return updatedData;
};

const deleteCommentFromDB = async (id: string) => {
  const deletedService = await Comment.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Comment');
  }

  return deletedService;
};

export const CommentServices = {
  createCommentIntoDB,
  getAllCommentsFromDB,
  getSingleCommentFromDB,
  updateCommentIntoDB,
  deleteCommentFromDB,
};
