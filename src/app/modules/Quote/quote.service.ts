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
// import { SendEmail } from '../../utils/sendEmail';
import { NotificationServices } from '../Notification/Notification.service';
import { emailValidate } from '../../utils/emailValidate';
import { SendEmail } from '../../utils/sendEmail';
import { CallBooking } from '../CallBooking/CallBooking.model';
// import { emailValidate } from '../../utils/emailValidate';

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

     await emailValidate(payload.email);



    // Validate the email
    // const { valid, flag } = await emailValidate(payload.email);
    // if (!valid) {
    //   userData.needs_review = true; // Flag the email if SMTP validation fails
    // }

    const user = await User.findOne({ email: payload.email , isDeleted: false});
    if (user) {
      
      const quote = await Quote.findOne({ userId: user._id, isDeleted: false });

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


// const getAllQuotesFromDB = async (query: Record<string, unknown>) => {
//   // Step 1: Use QueryBuilder to retrieve the base data
//   const QuoteQuery = new QueryBuilder(
//     Quote.find({ isDeleted: false }).populate('userId'), // Populate userId for accessing user details
//     query
//   )
//     .search(QUOTE_SEARCHABLE_FIELDS) // Search on Quote fields
//     .filter() // Apply filters
//     .sort() // Apply sorting
//     .paginate() // Apply pagination
//     .fields(); // Select specific fields

//   // Step 2: Fetch results and metadata
//   const result = await QuoteQuery.modelQuery;
//   const meta = await QuoteQuery.countTotal();


//   // Step 5: Return final result and metadata
//   return {
//     result,
//     meta
//   };
// };

// export default getAllQuotesFromDB;
// const getAllQuotesFromDB = async (query: Record<string, unknown>) => {
//   // Step 1: Use QueryBuilder to retrieve the base data
//   const QuoteQuery = new QueryBuilder(
//     Quote.find({ isDeleted: false }).populate({
//       path: 'userId',
//       match: query.searchTerm
//         ? {
//             // Search on user fields using regex
//             $or: [
//               { 'name.firstName': { $regex: query.searchTerm, $options: 'i' } }, // Case-insensitive search
//               { 'name.lastName': { $regex: query.searchTerm, $options: 'i' } },
//               { email: { $regex: query.searchTerm, $options: 'i' } },
//             ],
//           }
//         : {}, // If no search term, don't filter users
//     }),
//     query
//   )
//     .search(QUOTE_SEARCHABLE_FIELDS) // Search on Quote fields
//     .filter() // Apply filters
//     .sort() // Apply sorting
//     .paginate() // Apply pagination
//     .fields(); // Select specific fields

//   // Step 2: Fetch Results and Metadata
//   const result = await QuoteQuery.modelQuery;
//   const meta = await QuoteQuery.countTotal();

//   // Step 3: Filter Quotes Without Matching Users
//   const filteredResult = result.filter((quote: any) => quote.userId !== null);

//   // Step 4: Parse the limit from the query as a number
//   const limit = Number(query.limit) || 10; // Default to 10 if limit is not provided or invalid

//   // Step 5: Return Final Result and Metadata
//   return {
//     result: filteredResult,
//     meta: {
//       ...meta,
//       total: filteredResult.length,
//       totalPage: Math.ceil(filteredResult.length / limit), // Use parsed limit here
//     },
//   };
// };
const getAllQuotesFromDB = async (query: Record<string, unknown>) => {
  // Step 1: Extract searchTerm, page, and limit from the query
  const { searchTerm, page = 1, limit = 10 } = query;
  const pageNumber = Number(page) || 1;
  const pageSize = Number(limit) || 10;

  // Step 2: Base Query
  const baseQuery = { isDeleted: false }; // Ensure only non-deleted quotes are fetched

  // Step 3: Add search logic for `userId` fields
  const populateQuery: any = {
    path: 'userId',
    match: {},
  };

  if (searchTerm) {
    populateQuery.match = {
      $or: [
        { 'name.firstName': { $regex: searchTerm, $options: 'i' } },
        { 'name.lastName': { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } },
      ],
    };
  }

  // Step 4: Fetch the Quotes with Pagination
  const quotes = await Quote.find(baseQuery)
    .populate(populateQuery)
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);

  // Step 5: Count total quotes (considering search filter on user fields)
  const totalQuotes = await Quote.find(baseQuery).populate(populateQuery).countDocuments();

  // Step 6: Filter out quotes where `userId` doesn't match the search
  const filteredQuotes = quotes.filter((quote) => quote.userId !== null);

  // Step 7: Return result and metadata
  return {
    result: filteredQuotes,
    meta: {
      page: pageNumber,
      limit: pageSize,
      total: totalQuotes, // Reflect total quotes that match the query
      totalPage: Math.ceil(totalQuotes / pageSize),
    },
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
    const deletedQuote = await Quote.findByIdAndDelete(
      id,
      // { isDeleted: true },
      { new: true, session } // Pass the session
    );

    if (!deletedQuote) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Quote');
    }

    // Step 2: Delete the associated user if the user ID exists in the quote
    if (deletedQuote.userId) {
      const deletedUser = await User.findByIdAndDelete(
        deletedQuote.userId,
        // { isDeleted: true },
        { new: true, session } // Pass the session
      );

      if (!deletedUser) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete associated User');
      }

      const deletedCallBooking = await CallBooking.findOneAndDelete(
        { userId: deletedQuote.userId }, // Correct filter as an object
        // { isDeleted: true },
        { new: true, session } // Pass the session
      );


      if (!deletedCallBooking) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete associated CallBooking');
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
