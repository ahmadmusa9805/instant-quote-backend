/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { INCLUSION_SEARCHABLE_FIELDS } from './Inclusion.constant';
import mongoose from 'mongoose';
import { TInclusion } from './Inclusion.interface';
import { Inclusion } from './Inclusion.model';
import { User } from '../User/user.model';

const createInclusionIntoDB = async (
  payload: TInclusion,
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
  const result = await Inclusion.create(payload);
  
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Inclusion');
  }

  return result;
};

const getAllInclusionsFromDB = async (query: Record<string, unknown>,   user: any) => {

  
    const {  userEmail } = user;
    const userData = await User.findOne({ email: userEmail });

let subscriberIdValue;

if(userData?.role === 'superAdmin' || userData?.role === 'subscriber'){
  subscriberIdValue = userData?._id;
}
if(userData?.role === 'admin'){
  subscriberIdValue = userData?.subscriberId;
}


  const InclusionQuery = new QueryBuilder(
    Inclusion.find({ subscriberId: subscriberIdValue}),
    query,
  )
    .search(INCLUSION_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await InclusionQuery.modelQuery;
  const meta = await InclusionQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleInclusionFromDB = async (id: string) => {
  const result = await Inclusion.findOne({ _id: id, isDeleted: false });

  return result;
};

const updateInclusionIntoDB = async (id: string, payload: any) => {
  const isDeletedService = await mongoose.connection
    .collection('inclusions')
    .findOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { projection: { isDeleted: 1, title: 1 } },
    );

  if (!isDeletedService?.title) {
    throw new Error('Inclusion not found');
  }

  if (isDeletedService.isDeleted) {
    throw new Error('Cannot update a deleted Inclusion');
  }

  const updatedData = await Inclusion.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedData) {
    throw new Error('Inclusion not found after update');
  }

  return updatedData;
};

const deleteInclusionFromDB = async (id: string) => {
  const deletedService = await Inclusion.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Inclusion');
  }

  return deletedService;
};

export const InclusionServices = {
  createInclusionIntoDB,
  getAllInclusionsFromDB,
  getSingleInclusionFromDB,
  updateInclusionIntoDB,
  deleteInclusionFromDB,
};
