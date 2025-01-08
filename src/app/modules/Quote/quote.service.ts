/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import mongoose from 'mongoose';

import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { TUser } from '../User/user.interface';
import { User } from '../User/user.model';
import { QUOTE_SEARCHABLE_FIELDS } from './quote.constant';
import { Quote } from './quote.model';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Property } from '../Property/Property.model';
import { PropertyPart } from '../PropertyPart/PropertyPart.model';
import { RefurbishmentType } from '../RefurbishmentType/RefurbishmentType.model';
import { RefurbishmentSize } from '../RefurbishmentSize/RefurbishmentSize.model';
import { ExtendSize } from '../ExtendSize/ExtendSize.model';
import { FinishLevel } from '../FinishLevel/FinishLevel.model';
import { Bathroom } from '../Bathroom/Bathroom.model';
import { StartTime } from '../StartTime/StartTime.model';
import { Service } from '../Service/Service.model';
import { DesignIdea } from '../DesignIdea/DesignIdea.model';
import { Window } from '../Window/Window.model';
import { calculateQuote } from './qoute.formula';
// import { calculateQuote } from '../QuotePricing/Quote.formula';


export const createQuoteIntoDB = async (payload: any, file: any) => {
  const userData: Partial<TUser> = {
    password: payload.password || 'client12345',
    role: 'client',
    email: payload.email,
    contactNo: payload.contactNo,
    name: payload.name,
  };

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    if (file) {
      const imageName = `${file.originalname}`;
      const path = file.path;
      const { secure_url } = await sendImageToCloudinary(imageName, path);
      payload.file = secure_url;
    }




   if(payload.userId){
    const user = await User.findOne({ _id: payload.userId });
    if (!user) {
      throw new Error('User not found');
    }
   }

   
   if(!payload.userId){
    // const newUser = await User.create(userData);
    const newUser = await User.create([userData], { session });

    // if (!newUser) throw new Error('Failed to create user');
    if (!newUser.length) throw new Error('Failed to create user');

    // payload.userId = newUser._id;
    payload.userId = newUser[0]._id;
}

    const result = await calculateQuote(payload);
    if (!result) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Quote');
    }
    console.log(result, "test3");
    
    payload.total = result;
    console.log(payload.total, "payload.total");

    const newQuote = await Quote.create(payload);
    // const newClient = await Quote.create([payload], { session });
    if (!newQuote) throw new Error('Failed to create Client');
    // if (!newClient.length) throw new Error('Failed to create actor');

    await session.commitTransaction();
    await session.endSession();

    return newQuote;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err?.message);
  }
};

const getAllQuotesFromDB = async (query: Record<string, unknown>) => {
  const QuoteQuery = new QueryBuilder(
    Quote.find({isDeleted: false}).populate('userId'),
    query,
  )
    .search(QUOTE_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await QuoteQuery.modelQuery;
  const meta = await QuoteQuery.countTotal();
  return {
    result,
    meta,
  };
};
const getAllQuotesByUserFromDB = async (query: Record<string, unknown>, userId: string) => {
  const QuoteQuery = new QueryBuilder(
    Quote.find({isDeleted: false, userId}),
    query,
  )
    .search(QUOTE_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await QuoteQuery.modelQuery;
  const meta = await QuoteQuery.countTotal();
  return {
    result,
    meta,
  };
};
// const getAllQuotesElementsFromDB = async () => {
//   const result = await Quote.find({isDeleted: false});
//   return result;
// };
const getAllQuotesElementsFromDB = async () => {
  try {
    // Import all the required modules


    // Query all collections in parallel
    const [properties, propertyParts, refurbishmentTypes, refurbishmentSizes, extendSizes, finishLevels, bathrooms, windows, startTimes, services, designIdeas] = await Promise.all([
      Property.find({ isDeleted: false }),
      PropertyPart.find({ isDeleted: false }),
      RefurbishmentType.find({ isDeleted: false }),
      RefurbishmentSize.find({ isDeleted: false }),
      ExtendSize.find({ isDeleted: false }),
      FinishLevel.find({ isDeleted: false }),
      Bathroom.find({ isDeleted: false }),
      Window.find({ isDeleted: false }),
      StartTime.find({ isDeleted: false }),
      Service.find({ isDeleted: false }),
      DesignIdea.find({ isDeleted: false })
    ]);

    // Aggregate all results into a single object or array
    return {
      properties,
      propertyParts,
      refurbishmentTypes,
      refurbishmentSizes,
      extendSizes,
      finishLevels,
      bathrooms,
      windows,
      startTimes,
      services,
      designIdeas
    };
  } catch (error) {
    console.error('Error fetching data from database:', error);
    throw new Error('Failed to fetch data from database');
  }
};


const getSingleQuoteFromDB = async (id: string) => {
  const result = await Quote.findOne({ _id: id, isDeleted: false });
  return result;
};

const updateQuoteIntoDB = async (id: string, payload: any) => {
  const isDeletedService = await mongoose.connection
    .collection('quotes')
    .findOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { projection: { isDeleted: 1, title: 1 } },
    );

  if (!isDeletedService?.title) {
    throw new Error('Quote not found');  }

  if (isDeletedService.isDeleted) {
    throw new Error('Cannot update a deleted Quote');
  }

  const updatedData = await Quote.findByIdAndUpdate(    { _id: id },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedData) {
    throw new Error('Quote not found after update');
  }

  return updatedData;
};

const deleteQuoteFromDB = async (id: string) => {
  const deletedService = await Quote.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Quote');  }

  return deletedService;
};


export const QuoteServices = {
  createQuoteIntoDB,
  getAllQuotesFromDB,
  getSingleQuoteFromDB,
  updateQuoteIntoDB,
  deleteQuoteFromDB,
  getAllQuotesByUserFromDB,
  getAllQuotesElementsFromDB
};
