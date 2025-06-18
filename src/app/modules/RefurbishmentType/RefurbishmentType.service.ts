/* eslint-disable @typescript-eslint/no-explicit-any */
// import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import mongoose from 'mongoose';
import { TRefurbishmentType } from './RefurbishmentType.interface';
import { RefurbishmentType } from './RefurbishmentType.model';
import { REFURBISHMENTTYPE_SEARCHABLE_FIELDS } from './RefurbishmentType.constant';
import httpStatus from 'http-status';
import { User } from '../User/user.model';

const createRefurbishmentTypeIntoDB = async (
  payload: TRefurbishmentType,
  user: any
) => {

  const {  userEmail } = user;
  const userData = await User.findOne({ email: userEmail });
  payload.subscriberId = userData?._id ?? new mongoose.Types.ObjectId();
  const result = await RefurbishmentType.create(payload);
  
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create RefurbishmentType');
  }

  return result;
};

const getAllRefurbishmentTypesFromDB = async (query: Record<string, unknown>, user: any) => {


    const {  userEmail } = user;
    const userData = await User.findOne({ email: userEmail });

  const RefurbishmentTypeQuery = new QueryBuilder(
    RefurbishmentType.find({isDeleted: false, subscriberId: userData?._id}),
    query,
  )
    .search(REFURBISHMENTTYPE_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await RefurbishmentTypeQuery.modelQuery;
  const meta = await RefurbishmentTypeQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleRefurbishmentTypeFromDB = async (id: string) => {
  const result = await RefurbishmentType.findOne({ _id: id, isDeleted: false });
  
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'RefurbishmentType not found!');
  }

  return result;
};

const updateRefurbishmentTypeIntoDB = async (id: string, payload: any) => {


  const isDeletedService = await mongoose.connection
    .collection('refurbishmenttypes')
    .findOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { projection: { isDeleted: 1, title: 1 } },
    );

  if (!isDeletedService?.title) {
    throw new Error('RefurbishmentType not found');
  }

  if (isDeletedService.isDeleted) {
    throw new Error('Cannot update a deleted RefurbishmentType');
  }



  const updatedData = await RefurbishmentType.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedData) {
    throw new Error('RefurbishmentType not found after update');
  }

  return updatedData;
};

const deleteRefurbishmentTypeFromDB = async (id: string) => {
  const deletedService = await RefurbishmentType.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete RefurbishmentType');
  }

  return deletedService;
};

export const RefurbishmentTypeServices = {
  createRefurbishmentTypeIntoDB,
  getAllRefurbishmentTypesFromDB,
  getSingleRefurbishmentTypeFromDB,
  updateRefurbishmentTypeIntoDB,
  deleteRefurbishmentTypeFromDB,
};
