/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import mongoose from 'mongoose';
import { TWindow } from './Window.interface';
import { Window } from './Window.model';
import { WINDOW_SEARCHABLE_FIELDS } from './Window.constant';
import { User } from '../User/user.model';

// const createWindowIntoDB = async (
//   payload: TWindow,
// ) => {
//   const result = await Window.create(payload);
  
//   if (!result) {
//     throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Window');
//   }

//   return result;
// };

const createWindowIntoDB = async (
  payload: TWindow,
  user:any
) => {

  const {  userEmail } = user;
  const userData = await User.findOne({ email: userEmail });
  payload.subscriberId = userData?._id ?? new mongoose.Types.ObjectId();

  // Check if a window already exists
  const existingWindow = await Window.findOne({subscriberId:payload.subscriberId});

  if (existingWindow) {
    throw new AppError(
      httpStatus.CONFLICT, 
      'A window already exists. Cannot create another.'
    );
  }

  // Create the new window if none exists
  const result = await Window.create(payload);

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Window');
  }

  return result;
};

const getAllWindowsFromDB = async (query: Record<string, unknown>, user:any) => {

  const {  userEmail } = user;
  const userData = await User.findOne({ email: userEmail });

  const WindowQuery = new QueryBuilder(
    Window.find({isDeleted: false, subscriberId: userData?._id}),
    query,
  )
    .search(WINDOW_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await WindowQuery.modelQuery;
  const meta = await WindowQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleWindowFromDB = async (id: string) => {
  const result = await Window.findOne({ _id: id, isDeleted: false });

  return result;
};

const updateWindowIntoDB = async (id: string, payload: any) => {

  const isDeletedService = await mongoose.connection
    .collection('windows')
    .findOne(
      { _id: new mongoose.Types.ObjectId(id) },
      // { projection: { isDeleted: 1, windowSquareMeters: 1 } },
    );

  if (!isDeletedService) {
    throw new Error('Window not found');
  }

  if (isDeletedService.isDeleted) {
    throw new Error('Cannot update a deleted Window');
  }

  const updatedData = await Window.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedData) {
    throw new Error('Window not found after update');
  }

  return updatedData;
};

const deleteWindowFromDB = async (id: string) => {
  const deletedService = await Window.findByIdAndDelete(
    id,
    { new: true },
  );

  if (!deletedService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Window');
  }

  return deletedService;
};

export const WindowServices = {
  createWindowIntoDB,
  getAllWindowsFromDB,
  getSingleWindowFromDB,
  updateWindowIntoDB,
  deleteWindowFromDB,
};
