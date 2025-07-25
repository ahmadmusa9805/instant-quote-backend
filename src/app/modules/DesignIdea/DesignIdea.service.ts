/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { DESIGNIDEA_SEARCHABLE_FIELDS } from './DesignIdea.constant';
import mongoose from 'mongoose';
import { TDesignIdea } from './DesignIdea.interface';
import { DesignIdea } from './DesignIdea.model';
import { User } from '../User/user.model';

const createDesignIdeaIntoDB = async (
  payload: TDesignIdea,
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

  const result = await DesignIdea.create(payload);
  
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create DesignIdea');
  }

  return result;
};

const getAllDesignIdeasFromDB = async (query: Record<string, unknown>, user:any) => {

  const {  userEmail } = user;
  const userData = await User.findOne({ email: userEmail });


let subscriberIdValue;

if(userData?.role === 'superAdmin' || userData?.role === 'subscriber'){
  subscriberIdValue = userData?._id;
}
if(userData?.role === 'admin'){
  subscriberIdValue = userData?.subscriberId;
}

  const DesignIdeaQuery = new QueryBuilder(
    DesignIdea.find({ subscriberId: subscriberIdValue}),
    query,
  )
    .search(DESIGNIDEA_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await DesignIdeaQuery.modelQuery;
  const meta = await DesignIdeaQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleDesignIdeaFromDB = async (id: string) => {
  const result = await DesignIdea.findById(id);

  return result;
};

const updateDesignIdeaIntoDB = async (id: string, payload: any) => {
  const isDeletedService = await mongoose.connection
    .collection('designideas')
    .findOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { projection: { isDeleted: 1, clarity: 1 } },
    );

  if (!isDeletedService?.clarity) {
    throw new Error('DesignIdea not found');
  }

  if (isDeletedService.isDeleted) {
    throw new Error('Cannot update a deleted DesignIdea');
  }

  const updatedData = await DesignIdea.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedData) {
    throw new Error('DesignIdea not found after update');
  }

  return updatedData;
};

const deleteDesignIdeaFromDB = async (id: string) => {
  const deletedService = await DesignIdea.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete DesignIdea');
  }

  return deletedService;
};

export const DesignIdeaServices = {
  createDesignIdeaIntoDB,
  getAllDesignIdeasFromDB,
  getSingleDesignIdeaFromDB,
  updateDesignIdeaIntoDB,
  deleteDesignIdeaFromDB,
};
