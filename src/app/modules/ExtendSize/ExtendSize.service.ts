/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import mongoose from 'mongoose';
import { TExtendSize } from './ExtendSize.interface';
import { ExtendSize } from './ExtendSize.model';
import { EXTENDSIZE_SEARCHABLE_FIELDS } from './ExtendSize.constant';

const createExtendSizeIntoDB = async (
  payload: TExtendSize,
) => {
  const result = await ExtendSize.create(payload);
  
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create ExtendSize');
  }

  return result;
};

const getAllExtendSizesFromDB = async (query: Record<string, unknown>) => {
  const ExtendSizeQuery = new QueryBuilder(
    ExtendSize.find({isDeleted: false}),
    query,
  )
    .search(EXTENDSIZE_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await ExtendSizeQuery.modelQuery;
  const meta = await ExtendSizeQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleExtendSizeFromDB = async (id: string) => {
  const result = await ExtendSize.findOne({_id:id, isDeleted: false});

  return result;
};

const updateExtendSizeIntoDB = async (id: string, payload: any) => {
  const isDeletedService = await mongoose.connection
    .collection('extendsizes')
    .findOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { projection: { isDeleted: 1, name: 1 } },
    );

  if (!isDeletedService?.name) {
    throw new Error('ExtendSize not found');
  }

  if (isDeletedService.isDeleted) {
    throw new Error('Cannot update a deleted ExtendSize');
  }

  const updatedData = await ExtendSize.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedData) {
    throw new Error('ExtendSize not found after update');
  }

  return updatedData;
};

const deleteExtendSizeFromDB = async (id: string) => {
  const deletedService = await ExtendSize.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete ExtendSize');
  }

  return deletedService;
};

export const ExtendSizeServices = {
  createExtendSizeIntoDB,
  getAllExtendSizesFromDB,
  getSingleExtendSizeFromDB,
  updateExtendSizeIntoDB,
  deleteExtendSizeFromDB,
};
