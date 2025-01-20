/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import mongoose from 'mongoose';

import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
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
import { calculateOtherPrices, generateRandomPassword } from './quote.utils';
import { SendEmail } from '../../utils/sendEmail';
import { NotificationServices } from '../Notification/Notification.service';

export const createQuoteIntoDB = async (payload: any, file: any) => {
 
  const password = payload.password || generateRandomPassword();

  const userData: Partial<TUser> = {
    password,
    role: 'client',
    email: payload.email,
    contactNo: payload.contactNo,
    name: payload.name,
  };

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    if (file) {
      payload.file = file?.location;
    }


    const user = await User.findOne({ email: payload.email });
    if (user) {
      
      const quote = await Quote.findOne({ userId: user._id });
      console.log('quote', quote);
      if(quote){
        throw new Error('User Have already Created a Quote');
      }
    }
   
   if(!user){
    const newUser = await User.create([userData], { session });

    if (!newUser.length) throw new Error('Failed to create user');

    payload.userId = newUser[0]._id;
  }


  const modifyPayload = await calculateOtherPrices(payload);

    // const newQuote = await Quote.create(payload);
    const newQuote = await Quote.create([modifyPayload], { session });
    if (!newQuote.length) throw new Error('Failed to create Client');

    await NotificationServices.createNotificationIntoDB({
      type: 'quote',
      message: `New quote created with Email: ${payload.email}`,
      isDeleted: false,
      isRead: false,
      createdAt: new Date(),
    });

    
    if(!user){
      await SendEmail.sendQuoteEmailToClient(
        payload.email,
        password,
      );
    }
     

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
  const result = await Quote.findOne({ _id: id, isDeleted: false }).populate('userId');
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
  const session = await mongoose.startSession(); // Start a session
  session.startTransaction(); // Start transaction

  try {
    // Step 1: Find and soft-delete the quote
    const deletedQuote = await Quote.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session } // Pass the session
    );

    if (!deletedQuote) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Quote');
    }

    // Step 2: Delete the associated user if the user ID exists in the quote
    if (deletedQuote.userId) {
      const deletedUser = await User.findByIdAndUpdate(
        deletedQuote.userId,
        { isDeleted: true },
        { new: true, session } // Pass the session
      );

      if (!deletedUser) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete associated User');
      }
    }

    // Commit the transaction if all operations succeed
    await session.commitTransaction();
    session.endSession();

    return deletedQuote;
  } catch (error) {
    // Rollback the transaction if any operation fails
    await session.abortTransaction();
    session.endSession();
    throw error; // Propagate the error to be handled by the caller
  }
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
