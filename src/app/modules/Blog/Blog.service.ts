/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { BLOG_SEARCHABLE_FIELDS } from './Blog.constant';
import mongoose from 'mongoose';
import { Blog } from './Blog.model';

const createBlogIntoDB = async (
  payload: any,
  file: any
) => {
  if (file) {


    payload.img = file.location as string;
  }
  const result = await Blog.create(payload);
  
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Blog');
  }

  return result;
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const BlogQuery = new QueryBuilder(
    Blog.find({isDeleted: false}),
    query,
  )
    .search(BLOG_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await BlogQuery.modelQuery;
  const meta = await BlogQuery.countTotal();
  return {
    result,
    meta,
  };
};


const getSingleBlogFromDB = async (id: string) => {
  const result = await Blog.findOne({ _id: id, isDeleted: false });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Blog not found!');}

  return result;
};

const updateBlogIntoDB = async (id: string, payload: any) => {
  const isDeletedService = await mongoose.connection
    .collection('blogs')
    .findOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { projection: { isDeleted: 1, title: 1 } },
    );

  if (!isDeletedService?.title) {
    throw new Error('Blog not found');
  }

  if (isDeletedService.isDeleted) {
    throw new Error('Cannot update a deleted Blog');
  }

  const updatedData = await Blog.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedData) {
    throw new Error('Blog not found after update');
  }

  return updatedData;
};

const deleteBlogFromDB = async (id: string) => {
  const deletedService = await Blog.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Blog');
  }

  return deletedService;
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  getSingleBlogFromDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
};
