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
import { calculateOtherPrices } from './quote.utils';
// import { calculateOtherPrices, generateRandomPassword } from './quote.utils';
// import { SendEmail } from '../../utils/sendEmail';
import { NotificationServices } from '../Notification/Notification.service';
// import { emailValidate } from '../../utils/emailValidate';
// import { SendEmail } from '../../utils/sendEmail';
// import { CallBooking } from '../CallBooking/CallBooking.model';
import { Booking } from '../Booking/Booking.model';
// import { emailValidate } from '../../utils/emailValidate';

export const createQuoteIntoDB = async (payload: any, file: any) => {
console.log('payload test', payload);
  const password = payload.password;
  // const password = payload.password || generateRandomPassword();
  const userData: Partial<TUser> = {
    password,
    role: 'client',
    email: payload.email,
    contactNo: payload.contactNo,
    name: payload.name,
    propertyAddress: payload.propertyAddress, 
    subscriberId: payload.subscriberId, 
    propertyPostCode: payload.propertyPostCode,
    status: payload.status
  };

console.log('userData test', userData);

  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    if (file) {
      payload.file = file?.location;
    }
    //  await emailValidate(payload.email);
    // Validate the email
    // const { valid, flag } = await emailValidate(payload.email);
    // if (!valid) {
    //   userData.needs_review = true; // Flag the email if SMTP validation fails
    // }

    const user = await User.findOne({ email: payload.email , isDeleted: false});
    console.log('user test', user);

    if (user) {
      payload.userId = user._id
          console.log('user test inside' , user );

  //     const quote = await Quote.findOne({ userId: user._id, isDeleted: false });
  //     if(quote){
  //       // throw new Error('User Have already Created a Quote');
         
  //    const updatedData = await Quote.findOneAndUpdate( { _id: quote._id },
  //        payload,
  //        { new: true, runValidators: true },
  //     );

  // if (!updatedData) {
  //   throw new Error('Quote not found after update');
  // } 
    
  //       return updatedData

  //     }
    }
   
   if(!user){
    console.log('user not test' , user );
    const newUser = await User.create([userData], { session });

    if (!newUser.length) throw new Error('Failed to create user');

    payload.userId = newUser[0]._id;
        console.log('newUser[0]  test' , newUser[0] );

  }


  const modifyPayload = await calculateOtherPrices(payload);

    // const newQuote = await Quote.create(payload);
    const newQuote = await Quote.create([modifyPayload], { session });
    if (!newQuote.length) throw new Error('Failed to create Client');
        console.log('newQuote  test' , newQuote );

    await NotificationServices.createNotificationIntoDB({
      type: 'quote',
      message: `New quote created with Email: ${payload.email}`,
      isDeleted: false,
      isRead: false,
      subscriberId: payload.subscriberId,
      createdAt: new Date(),
    });

    // if(!user){
    //   await SendEmail.sendQuoteEmailToClient(
    //     payload.email,
    //   );
    // }

    await session.commitTransaction();
    await session.endSession();

    return newQuote;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err?.message);
  }
};

const getAllQuotesFromDB = async (query: Record<string, unknown>, user: any) => {
  const {  userEmail } = user;
  const userData = await User.findOne({ email: userEmail });


  // Step 1: Extract searchTerm, page, and limit from the query
  const { searchTerm, page = 1, limit = 10 } = query;
  const pageNumber = Number(page) || 1;
  const pageSize = Number(limit) || 10;
 
  // Step 2: Base Query
  let baseQuery = {}; // Ensure only non-deleted quotes are fetched
   
  if(userData?.role === 'subscriber'){
   baseQuery = { isDeleted: false, subscriberId: userData?._id }; // Ensure only non-deleted quotes are fetched
  }else{
    baseQuery = { isDeleted: false };
  }


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
    .sort({ createdAt: -1 }) // Sort by createdAt in descending order
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);

  // Step 5: Count total quotes (considering search filter on user fields)
  const totalQuotes = await Quote.find(baseQuery).populate(populateQuery).countDocuments();
  console.log(totalQuotes, 'totalQuotes');

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
  const result = await Quote.findOneAndUpdate(
    { _id: id, isDeleted: false }, // Find the quote
    // { $set: { isRead: true } }, // Update isRead to true
    { new: true } // Return the updated document
  ).populate('userId');

  return result;
};
// const getLastQuoteFromDB = async () => {
//   const result = await Quote.findOneAndUpdate(
//     { isDeleted: false }, // Find the quote
//     // { $set: { isRead: true } }, // Update isRead to true
//     { new: true } // Return the updated document
//   ).populate('userId');

//   return result;
// };

const quoteReadStateUpdateFromDB = async (id: string, payload: any) => {
// Ensure payload is a boolean value, not an object
const isRead = payload.isRead ?? payload;  // Extract isRead if payload is an object

if (typeof isRead !== 'boolean') {
  throw new Error('isRead must be a boolean value');
}

  const result = await Quote.findOneAndUpdate(
    { _id: id, isDeleted: false }, // Find the quote
    { $set: { isRead: isRead } }, // Update isRead to true
    { new: true } // Return the updated document
  ).populate('userId');

  return result;
};


const updateQuoteIntoDB = async (id: string, payload: any) => {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID format");
  }

  const isDeletedService = await Quote.findOne({
    _id: new mongoose.Types.ObjectId(id),
    isDeleted: false,
  });


  if (!isDeletedService) {
    throw new Error("Quote not found");
  }

  const modifyPayload = await calculateOtherPrices(payload);

  const updatedData = await Quote.findByIdAndUpdate(
    id,
    modifyPayload,
    { new: true, runValidators: true }
  );

  if (!updatedData) {
    throw new Error("Quote not found after update");
  }

  await NotificationServices.createNotificationIntoDB({
    type: "quote",
    message: `New quote created with Email: ${payload.email}`,
    isDeleted: false,
    isRead: false,
    subscriberId: updatedData.subscriberId,
    createdAt: new Date(),
  });

      // if(!user){
    //   await SendEmail.sendQuoteEmailToClient(
    //     payload.email,
    //   );
    // }

  return updatedData;
};

// const deleteQuoteFromDB = async (id: string) => {
//   const session = await mongoose.startSession(); // Start a session
//   session.startTransaction(); // Start transaction
//   try {
//     // Step 1: Find and soft-delete the quote
//     const deletedQuote = await Quote.findByIdAndDelete(
//       id,
//       // { isDeleted: true },
//       { new: true, session } // Pass the session
//     );

//     if (!deletedQuote) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Quote');
//     }

//     // Step 2: Delete the associated user if the user ID exists in the quote
//     if (deletedQuote.userId) {
//       const deletedUser = await User.findByIdAndDelete(
//         deletedQuote.userId,
//         // { isDeleted: true },
//         { new: true, session } // Pass the session
//       );

//       if (!deletedUser) {
//         throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete associated User');
//       }

//       const deletedCallBooking = await CallBooking.findOneAndDelete(
//         { userId: deletedQuote.userId }, // Correct filter as an object
//         // { isDeleted: true },
//         { new: true, session } // Pass the session
//       );


//       if (!deletedCallBooking) {
//         throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete associated CallBooking');
//       }

//     }

//     // Commit the transaction if all operations succeed
//     await session.commitTransaction();
//     session.endSession();

//     return deletedQuote;
//   } catch (error) {
//     // Rollback the transaction if any operation fails
//     await session.abortTransaction();
//     session.endSession();
//     throw error; // Propagate the error to be handled by the caller
//   }
// };
const deleteQuoteFromDB = async (id: string, user: any) => { 

  const {  userEmail } = user;
  const userData = await User.findOne({ email: userEmail });
const quotes = (await Quote.find({ userId: userData?._id })).length;  

  if (!quotes) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Quote DB is empty');
  }

      // Step 1: Check if the quote exists
    const quote = await Quote.findById(id); // Find the quote with the session
    if (!quote) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Quote not found');
    }


if(quotes > 1){
    // console.log('User has more than one quote');
   const deletedQuote = await Quote.findByIdAndDelete(id); // Pass session for deletion
   return deletedQuote
}else{
  const session = await mongoose.startSession(); // Start a session
  session.startTransaction(); // Start transaction

  try {
    // // Step 1: Check if the quote exists
    // const quote = await Quote.findById(id).session(session); // Find the quote with the session
    // if (!quote) {
    //   throw new AppError(httpStatus.BAD_REQUEST, 'Quote not found');
    // }
    // Step 2: Delete the quote
    const deletedQuote = await Quote.findByIdAndDelete(id, { session }); // Pass session for deletion

    // Step 3: Check and delete the associated user
    if (quote.userId) {
      const user = await User.findById(quote.userId).session(session); // Find the associated user
      if (user) {
         await User.findByIdAndDelete(quote.userId, { session }); // Delete the user
        
      } else {
        console.warn(`No user found for userId: ${quote.userId}`);
      }
    } else {
      console.warn(`Quote does not have an associated userId`);
    }

    // Step 4: Check and delete the associated call booking
    const callBooking = await Booking.findOne({ userId: quote.userId }).session(session); // Find associated call booking
    if (callBooking) {
       await Booking.findOneAndDelete(
        { userId: quote.userId },
        { session } // Pass session for deletion
      );
    } else {
      console.warn(`No call booking found for userId: ${quote.userId}`);
    }

    // Commit the transaction if all operations succeed
    await session.commitTransaction();
    session.endSession();

    return deletedQuote; // Return the deleted quote document
  } catch (error) {
    // Rollback the transaction if any operation fails
    await session.abortTransaction();
    session.endSession();
    throw error; // Propagate the error to be handled by the caller
  }
}



};

export const QuoteServices = {
  createQuoteIntoDB,
  getAllQuotesFromDB,
  getSingleQuoteFromDB,
  updateQuoteIntoDB,
  deleteQuoteFromDB,
  getAllQuotesByUserFromDB,
  getAllQuotesElementsFromDB,
  quoteReadStateUpdateFromDB,
  // getLastQuoteFromDB
};
