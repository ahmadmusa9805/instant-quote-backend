/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import mongoose from 'mongoose';
import { TFinishLevel } from './FinishLevel.interface';
import { FinishLevel } from './FinishLevel.model';
import { FINISHLEVEL_SEARCHABLE_FIELDS } from './FinishLevel.constant';
import { User } from '../User/user.model';

const createFinishLevelIntoDB = async (
  payload: TFinishLevel,
  user: any
) => {

    const {  userEmail } = user;
    const userData = await User.findOne({ email: userEmail });
 if (
    (userData && userData?.role === 'superAdmin') ||
    userData?.role === 'subscriber'
  ) {
        payload.subscriberId = userData._id;
  }else{
        payload.subscriberId = userData!.subscriberId ?? new mongoose.Types.ObjectId();
  }
  const result = await FinishLevel.create(payload);
  
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create FinishLevel');
  }

  return result;
};

const getAllFinishLevelsFromDB = async (query: Record<string, unknown>, user: any) => {
    const {  userEmail } = user;
    const userData = await User.findOne({ email: userEmail });


let subscriberIdValue;

if(userData?.role === 'superAdmin' || userData?.role === 'subscriber'){
  subscriberIdValue = userData?._id;
}
if(userData?.role === 'admin'){
  subscriberIdValue = userData?.subscriberId;
}

  const FinishLevelQuery = new QueryBuilder(
    FinishLevel.find({ subscriberId: subscriberIdValue}),
    query,
  )
    .search(FINISHLEVEL_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await FinishLevelQuery.modelQuery;
  const meta = await FinishLevelQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleFinishLevelFromDB = async (id: string) => {
  const result = await FinishLevel.findOne({ _id:id, isDeleted: false});

 if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'FinishLevel not found!');
  }

  return result;
};

const updateFinishLevelIntoDB = async (id: string, payload: any) => {
  const isDeletedService = await mongoose.connection
    .collection('finishlevels')
    .findOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { projection: { isDeleted: 1, level: 1 } },
    );

  if (!isDeletedService?.level) {
    throw new Error('FinishLevel not found');
  }

  if (isDeletedService.isDeleted) {
    throw new Error('Cannot update a deleted FinishLevel');
  }

  const updatedData = await FinishLevel.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedData) {
    throw new Error('FinishLevel not found after update');
  }

  return updatedData;
};

const deleteFinishLevelFromDB = async (id: string) => {
  const deletedService = await FinishLevel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete FinishLevel');
  }

  return deletedService;
};

export const FinishLevelServices = {
  createFinishLevelIntoDB,
  getAllFinishLevelsFromDB,
  getSingleFinishLevelFromDB,
  updateFinishLevelIntoDB,
  deleteFinishLevelFromDB,
};
