/* eslint-disable @typescript-eslint/no-explicit-any */
// import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import { TRefurbishmentSize } from './RefurbishmentSize.interface';
import { RefurbishmentSize } from './RefurbishmentSize.model';
import { REFURBISHMENTSIZE_SEARCHABLE_FIELDS } from './RefurbishmentSize.constant';
import { User } from '../User/user.model';

const createRefurbishmentSizeIntoDB = async (
  payload: TRefurbishmentSize,
  user:any
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
  const result = await RefurbishmentSize.create(payload);
  
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create RefurbishmentSize');
  }

  return result;
};

const getAllRefurbishmentSizesFromDB = async (query: Record<string, unknown>, user:any) => {

    const {  userEmail } = user;
    const userData = await User.findOne({ email: userEmail });


let subscriberIdValue;

if(userData?.role === 'superAdmin' || userData?.role === 'subscriber'){
  subscriberIdValue = userData?._id;
}
if(userData?.role === 'admin'){
  subscriberIdValue = userData?.subscriberId;
}

  const RefurbishmentSizeQuery = new QueryBuilder(
    RefurbishmentSize.find({ subscriberId: subscriberIdValue}),
    query,
  )
    .search(REFURBISHMENTSIZE_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await RefurbishmentSizeQuery.modelQuery;
  const meta = await RefurbishmentSizeQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleRefurbishmentSizeFromDB = async (id: string) => {
  const result = await RefurbishmentSize.findOne({ _id: id, isDeleted: false });
  
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'RefurbishmentSize not found!');
  }

  return result;
};

const updateRefurbishmentSizeIntoDB = async (id: string, payload: any) => {
  
  const isDeletedService = await mongoose.connection
    .collection('refurbishmentsizes')
    .findOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { projection: { isDeleted: 1, name: 1 } },
    );

  if (!isDeletedService?.name) {
    throw new Error('RefurbishmentSize not found');
  }

  if (isDeletedService.isDeleted) {
    throw new Error('Cannot update a deleted RefurbishmentSize');
  }

  
  const updatedData = await RefurbishmentSize.findByIdAndUpdate(
      id ,
      payload,
      { new: true, runValidators: true },
    );
    
  if (!updatedData) {
    throw new Error('RefurbishmentSize not found after update');
  }

  return updatedData;
};

const deleteRefurbishmentSizeFromDB = async (id: string) => {
  const deletedService = await RefurbishmentSize.findByIdAndDelete(
    id,
    // { isDeleted: true },
    { new: true },
  );

  if (!deletedService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete RefurbishmentSize');
  }

  return deletedService;
};

export const RefurbishmentSizeServices = {
    createRefurbishmentSizeIntoDB,
    getAllRefurbishmentSizesFromDB,
    getSingleRefurbishmentSizeFromDB,
    updateRefurbishmentSizeIntoDB,
    deleteRefurbishmentSizeFromDB,
};
