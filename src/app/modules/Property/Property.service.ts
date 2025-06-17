/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import mongoose from 'mongoose';
import { TProperty } from './Property.interface';
import { Property } from './Property.model';
import { PROPERTY_SEARCHABLE_FIELDS } from './Property.constant';
import { User } from '../User/user.model';


const createPropertyIntoDB = async (
  payload: TProperty,
  file: any
) => {
  if (file) {
    payload.image = file.location as string;
  }
  const result = await Property.create(payload);
  
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create PropertyPart');
  }

  return result;
};

const getAllPropertiesFromDB = async (query: Record<string, unknown>, user: any) => {

  const {  userEmail } = user;
  const userData = await User.findOne({ email: userEmail });

  const PropertyQuery = new QueryBuilder(
    Property.find({isDeleted: false, subscriberId: userData?._id}),
    query,
  )
    .search(PROPERTY_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await PropertyQuery.modelQuery;
  const meta = await PropertyQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSinglePropertyFromDB = async (id: string) => {


 const isDeletedCart = await mongoose.connection
  .collection('properties')
  .findOne(
    { _id: new mongoose.Types.ObjectId(id) }, // Query
    { projection: { isDeleted: 1 } } // Projection
  );
 
 if (!isDeletedCart) {
   throw new Error('Property not found');
 }

 if (isDeletedCart.isDeleted) {
   throw new Error('Cannot retrieve a deleted Property');
 }


  const result = await Property.findById(id);

  return result;
};

const updatePropertyIntoDB = async (id: string, payload: any, file: any) => {
 if (file) {
    payload.image = file.location as string;
  }

  const property = await mongoose.connection
  .collection('properties')
  .findOne(
    { _id: new mongoose.Types.ObjectId(id) }, // Query
    // { projection: { isDeleted: 1 } } // Projection
  );
 
 if (!property) {
   throw new Error('Property not found');
 }

 if (property.isDeleted) {
   throw new Error('Cannot update a deleted Property');
 }


  const updatedData = await Property.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true, runValidators: true },
  );



  if (!updatedData) {
    throw new Error('PropertyPart not found after update');
  }

  return updatedData;
};

const deletePropertyFromDB = async (id: string) => {

  const property = await mongoose.connection
  .collection('properties')
  .findOne(
    { _id: new mongoose.Types.ObjectId(id) }, // Query
    // { projection: { isDeleted: 1 } } // Projection
  );
 
 if (!property) {
   throw new Error('Property not found');
 }

 if (property.isDeleted) {
   throw new Error('Cannot delete a deleted Property');
 }


  const deletedService = await Property.findByIdAndDelete(
    id,
    // { isDeleted: true },
    { new: true },
  );

  if (!deletedService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete PropertyPart');
  }

  return deletedService;
};

export const PropertyServices = {
  createPropertyIntoDB,
  getAllPropertiesFromDB,
  getSinglePropertyFromDB,
  updatePropertyIntoDB,
  deletePropertyFromDB,
};
