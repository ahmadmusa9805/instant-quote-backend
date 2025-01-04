/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { PRIVACY_SEARCHABLE_FIELDS } from './Privacy.constant';
import mongoose from 'mongoose';
import { TPrivacy } from './Privacy.interface';
import { Privacy } from './Privacy.model';

const createPrivacyIntoDB = async (
  payload: TPrivacy,
) => {
  const result = await Privacy.create(payload);
  
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Privacy');
  }

  return result;
};

const getAllPrivacysFromDB = async (query: Record<string, unknown>) => {
  const PrivacyQuery = new QueryBuilder(
    Privacy.find({isDeleted: false}),
    query,
  )
    .search(PRIVACY_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await PrivacyQuery.modelQuery;
  const meta = await PrivacyQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSinglePrivacyFromDB = async (id: string) => {
  const result = await Privacy.findOne({ _id: id, isDeleted: false });

  return result;
};

const updatePrivacyIntoDB = async (id: string, payload: any) => {
  const isDeletedService = await mongoose.connection
    .collection('privacies')
    .findOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { projection: { isDeleted: 1, description: 1 } },
    );

  if (!isDeletedService?.description) {
    throw new Error('Privacy not found');
  }

  if (isDeletedService.isDeleted) {
    throw new Error('Cannot update a deleted Privacy');
  }

  const updatedData = await Privacy.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedData) {
    throw new Error('Privacy not found after update');
  }

  return updatedData;
};

const deletePrivacyFromDB = async (id: string) => {
  const deletedService = await Privacy.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Privacy');
  }

  return deletedService;
};

export const PrivacyServices = {
  createPrivacyIntoDB,
  getAllPrivacysFromDB,
  getSinglePrivacyFromDB,
  updatePrivacyIntoDB,
  deletePrivacyFromDB,
};
