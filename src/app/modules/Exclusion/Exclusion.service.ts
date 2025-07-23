/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { EXCLUSION_SEARCHABLE_FIELDS } from './Exclusion.constant';
import mongoose from 'mongoose';
import { TExclusion } from './Exclusion.interface';
import { Exclusion } from './Exclusion.model';
import { User } from '../User/user.model';

const createExclusionIntoDB = async (
  payload: TExclusion,
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
  const result = await Exclusion.create(payload);
  
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Exclusion');
  }

  return result;
};

const getAllExclusionsFromDB = async (query: Record<string, unknown>, user: any) => {
    const {  userEmail } = user;
    const userData = await User.findOne({ email: userEmail });

let subscriberIdValue;

if(userData?.role === 'superAdmin' || userData?.role === 'subscriber'){
  subscriberIdValue = userData?._id;
}
if(userData?.role === 'admin'){
  subscriberIdValue = userData?.subscriberId;
}
    
  const ExclusionQuery = new QueryBuilder(
    Exclusion.find({ subscriberId: subscriberIdValue}),
    query,
  )
    .search(EXCLUSION_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await ExclusionQuery.modelQuery;
  const meta = await ExclusionQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleExclusionFromDB = async (id: string) => {
  const result = await Exclusion.findOne({ _id: id, isDeleted: false });
  return result;
};

const updateExclusionIntoDB = async (id: string, payload: any) => {
  const isDeletedService = await mongoose.connection
    .collection('exclusions')
    .findOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { projection: { isDeleted: 1, title: 1 } },
    );

  if (!isDeletedService?.title) {
    throw new Error('Exclusion not found');
  }

  if (isDeletedService.isDeleted) {
    throw new Error('Cannot update a deleted Exclusion');
  }

  const updatedData = await Exclusion.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedData) {
    throw new Error('Exclusion not found after update');
  }

  return updatedData;
};

const deleteExclusionFromDB = async (id: string) => {
  const deletedService = await Exclusion.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Exclusion');
  }

  return deletedService;
};

export const ExclusionServices = {
  createExclusionIntoDB,
  getAllExclusionsFromDB,
  getSingleExclusionFromDB,
  updateExclusionIntoDB,
  deleteExclusionFromDB,
};
