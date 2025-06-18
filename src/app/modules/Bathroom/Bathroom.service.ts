/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import mongoose from 'mongoose';
import { TBathroom } from './Bathroom.interface';
import { Bathroom } from './Bathroom.model';
import { BATHROOM_SEARCHABLE_FIELDS } from './Bathroom.constant';
import { User } from '../User/user.model';

const createBathroomIntoDB = async (
  payload: TBathroom,
  user: any
) => {


  const {  userEmail } = user;
  const userData = await User.findOne({ email: userEmail });
  payload.subscriberId = userData?._id ?? new mongoose.Types.ObjectId();

  const result = await Bathroom.create(payload);
  
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Bathroom');
  }

  return result;
};

const getAllBathroomsFromDB = async (query: Record<string, unknown>, user: any) => {

      const {  userEmail } = user;
    const userData = await User.findOne({ email: userEmail });

  const BathroomQuery = new QueryBuilder(
    Bathroom.find({isDeleted: false, subscriberId: userData?._id}),
    query,
  )
    .search(BATHROOM_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await BathroomQuery.modelQuery;
  const meta = await BathroomQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleBathroomFromDB = async (id: string) => {
  const result = await Bathroom.findOne({_id:id, isDeleted: false});

  return result;
};

const updateBathroomIntoDB = async (id: string, payload: any) => {


  
  const isDeletedService = await mongoose.connection
    .collection('bathrooms')
    .findOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { projection: { isDeleted: 1, bathroomQuantity: 1 } },
    );

  if (!isDeletedService?.bathroomQuantity) {
    throw new Error('Bathroom not found');
  }

  if (isDeletedService.isDeleted) {
    throw new Error('Cannot update a deleted Bathroom');
  }

  const updatedData = await Bathroom.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedData) {
    throw new Error('Bathroom not found after update');
  }

  return updatedData;
};

const deleteBathroomFromDB = async (id: string) => {
  const deletedService = await Bathroom.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Bathroom');
  }

  return deletedService;
};

export const BathroomServices = {
  createBathroomIntoDB,
  getAllBathroomsFromDB,
  getSingleBathroomFromDB,
  updateBathroomIntoDB,
  deleteBathroomFromDB,
};
