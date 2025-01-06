/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { WEDO_SEARCHABLE_FIELDS } from './WeDo.constant';
import mongoose from 'mongoose';
import { TWeDo } from './WeDo.interface';
import { WeDo } from './WeDo.model';

const createWeDoIntoDB = async (
  payload: TWeDo,
) => {
  const result = await WeDo.create(payload);
  
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create WeDo');
  }

  return result;
};

const getAllWeDosFromDB = async (query: Record<string, unknown>) => {
  const WeDoQuery = new QueryBuilder(
    WeDo.find({isDeleted: false}),
    query,
  )
    .search(WEDO_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await WeDoQuery.modelQuery;
  const meta = await WeDoQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleWeDoFromDB = async (id: string) => {
  const result = await WeDo.findOne({ _id: id, isDeleted: false });

  return result;
};

const updateWeDoIntoDB = async (id: string, payload: any) => {
  const isDeletedService = await mongoose.connection
    .collection('wedos')
    .findOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { projection: { isDeleted: 1, title: 1 } },
    );

  if (!isDeletedService?.title) {
    throw new Error('WeDo not found');
  }

  if (isDeletedService.isDeleted) {
    throw new Error('Cannot update a deleted WeDo');
  }

  const updatedData = await WeDo.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedData) {
    throw new Error('WeDo not found after update');
  }

  return updatedData;
};

const deleteWeDoFromDB = async (id: string) => {
  const deletedService = await WeDo.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete WeDo');
  }

  return deletedService;
};

export const WeDoServices = {
  createWeDoIntoDB,
  getAllWeDosFromDB,
  getSingleWeDoFromDB,
  updateWeDoIntoDB,
  deleteWeDoFromDB,
};
