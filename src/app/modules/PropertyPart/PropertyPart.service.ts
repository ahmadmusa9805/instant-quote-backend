/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import mongoose from 'mongoose';
import { TPropertyPart } from './PropertyPart.interface';
import { PropertyPart } from './PropertyPart.model';
import { PROPERTYPART_SEARCHABLE_FIELDS } from './PropertyPart.constant';
import { User } from '../User/user.model';

const createPropertyPartIntoDB = async (
  payload: TPropertyPart,
  file: any
) => {
  if (file) {
    payload.image = file.location as string;
  }

  const result = await PropertyPart.create(payload);
  
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create PropertyPart');
  }

  return result;
};

const getAllPropertyPartsFromDB = async (query: Record<string, unknown>, user:any) => {

    const {  userEmail } = user;
    const userData = await User.findOne({ email: userEmail });

  const PropertyPartQuery = new QueryBuilder(
    PropertyPart.find({isDeleted: false, subscriberId: userData?._id}),
    query,
  )
    .search(PROPERTYPART_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await PropertyPartQuery.modelQuery;
  const meta = await PropertyPartQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSinglePropertyPartFromDB = async (id: string) => {
   console.log(id, "yes");
  const propertyPart = await mongoose.connection
  .collection('propertyparts')
  .findOne(
    { _id: new mongoose.Types.ObjectId(id) }, // Query
    // { projection: { isDeleted: 1 } } // Projection
  );
 
 if (!propertyPart) {
   throw new Error('PropertyPart not found');
 }

 if (propertyPart.isDeleted) {
   throw new Error('Cannot retrieve a deleted PropertyPart');
 }


  const result = await PropertyPart.findById(id);

  return result;
};

const updatePropertyPartIntoDB = async (id: string, payload: any, file: any) => {
 
  if (file) {

    payload.image = file.location as string;
  }

  const propertyPart = await mongoose.connection
    .collection('propertyparts')
    .findOne(
      { _id: new mongoose.Types.ObjectId(id) },
      // { projection: { isDeleted: 1, name: 1 } },
    );


  if (!propertyPart) {
    throw new Error('PropertyPart not found');
  }

  if (propertyPart.isDeleted) {
    throw new Error('Cannot update a deleted PropertyPart');
  }


  const updatedData = await PropertyPart.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedData) {
    throw new Error('PropertyPart not found after update');
  }

  return updatedData;
};

const deletePropertyPartFromDB = async (id: string) => {

  const isDeletedCart = await mongoose.connection
  .collection('propertyparts')
  .findOne(
    { _id: new mongoose.Types.ObjectId(id) }, // Query
    { projection: { isDeleted: 1 } } // Projection
  );
 
 if (!isDeletedCart) {
   throw new Error('PropertyPart not found');
 }

 if (isDeletedCart.isDeleted) {
   throw new Error('Cannot retrieve a deleted PropertyPart');
 }


  const deletedService = await PropertyPart.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete PropertyPart');
  }

  return deletedService;
};

export const PropertyPartServices = {
  createPropertyPartIntoDB,
  getAllPropertyPartsFromDB,
  getSinglePropertyPartFromDB,
  updatePropertyPartIntoDB,
  deletePropertyPartFromDB,
};
