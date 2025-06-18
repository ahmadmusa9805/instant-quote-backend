/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import mongoose from 'mongoose';
import { TStartTime } from './StartTime.interface';
import { StartTime } from './StartTime.model';
import { STARTTIME_SEARCHABLE_FIELDS } from './StartTime.constant';
import { User } from '../User/user.model';

const createStartTimeIntoDB = async (
  payload: TStartTime,
  user:any
) => {

    const {  userEmail } = user;
    const userData = await User.findOne({ email: userEmail });
    payload.subscriberId = userData?._id ?? new mongoose.Types.ObjectId();

  const result = await StartTime.create(payload);
  
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create StartTime');
  }

  return result;
};

const getAllStartTimesFromDB = async (query: Record<string, unknown>, user:any) => {

    const {  userEmail } = user;
    const userData = await User.findOne({ email: userEmail });

  const StartTimeQuery = new QueryBuilder(
    StartTime.find({isDeleted: false, subscriberId:userData?._id}),
    query,
  )
    .search(STARTTIME_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await StartTimeQuery.modelQuery;
  const meta = await StartTimeQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleStartTimeFromDB = async (id: string) => {
  const result = await StartTime.findOne({ _id: id, isDeleted: false });

  return result;
};

const updateStartTimeIntoDB = async (id: string, payload: any) => {
  const isDeletedService = await mongoose.connection
    .collection('starttimes')
    .findOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { projection: { isDeleted: 1, startTime: 1 } },
    );

  if (!isDeletedService?.startTime) {
    throw new Error('StartTime not found');
  }

  if (isDeletedService.isDeleted) {
    throw new Error('Cannot update a deleted StartTime');
  }

  const updatedData = await StartTime.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedData) {
    throw new Error('StartTime not found after update');
  }

  return updatedData;
};

const deleteStartTimeFromDB = async (id: string) => {
  const deletedService = await StartTime.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete StartTime');
  }

  return deletedService;
};

export const StartTimeServices = {
  createStartTimeIntoDB,
  getAllStartTimesFromDB,
  getSingleStartTimeFromDB,
  updateStartTimeIntoDB,
  deleteStartTimeFromDB,
};
