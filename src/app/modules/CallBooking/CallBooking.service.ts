/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import {
  CALLBOOKING_SEARCHABLE_FIELDS,
  dayNames,
  normalizeDate,
  normalizeTime
} from './CallBooking.constant';
import mongoose from 'mongoose';
import { TCallBooking } from './CallBooking.interface';
import { CallBooking } from './CallBooking.model';
// import { CallAvailability } from '../CallAvailability/CallAvailability.model';
import { NotificationServices } from '../Notification/Notification.service';
import { User } from '../User/user.model';
import { CallAvailability } from '../CallAvailability/CallAvailability.model';
import { Quote } from '../Quote/quote.model';

const createCallBookingIntoDB = async (payload: TCallBooking, user: any) => {
  payload.date = payload.date.split('T')[0];

  const date = new Date(payload.date);
  const day = date.toLocaleDateString('en-US', { weekday: 'long' });
  const dayNumber = date.getDay();

  const { userEmail } = user;
  const userData = await User.findOne({ email: userEmail });
  const quote = await Quote.findOne({ userId: userData?._id });


  payload.quoteId = quote?._id ?? new mongoose.Types.ObjectId();
  payload.bookedBy = userData?._id ?? new mongoose.Types.ObjectId();
  payload.day = day; 
  payload.subscriberId = userData?.subscriberId ?? new mongoose.Types.ObjectId(); 

  // New: Check day availability
  const callAvailabilityData = await CallAvailability.findOne({
    subscriberId: payload.subscriberId,
  });

  if (!callAvailabilityData) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'No availability set for this subscriber.',
    );
  }

  if (!callAvailabilityData.daysOfWeek.includes(dayNumber)) {
    const availableDayNames = callAvailabilityData.daysOfWeek
      .map((d) => dayNames[d])
      .join(', ');
    throw new AppError(
      httpStatus.CONFLICT,
      `Booking not allowed on ${payload.date} (${day}). Available booking days are: ${availableDayNames}.`,
    );
  }



  // Normalize input
  payload.date = normalizeDate(payload.date);
  payload.start = normalizeTime(payload.start);
  payload.end = normalizeTime(payload.end);

  // Time logic validation
  if (payload.start >= payload.end) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Invalid time range: start time (${payload.start}) must be before end time (${payload.end}).`,
    );
  }

  // Overlap check
  const overlappingBookings = await CallBooking.findOne({
    date: payload.date,
    subscriberId: payload.subscriberId,
    $or: [
      {
        start: { $lt: payload.end },
        end: { $gt: payload.start },
      },
    ],
  });

  if (overlappingBookings) {
    throw new AppError(
      httpStatus.CONFLICT,
      'A booking already exists that overlaps with the specified time range.',
    );
  }

  // Overlap check
  const overlappingBooking = await CallBooking.findOne({
    date: payload.date,
    start: payload.start,
    end: payload.end,
    subscriberId: payload.subscriberId,
  });

  if (overlappingBooking) {
    throw new AppError(
      httpStatus.CONFLICT,
      'A booking already exists that overlaps with the specified date and time range.',
    );
  }

  const createdCallBooking = await CallBooking.create(payload);

  if (!createdCallBooking) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create CallBooking');
  }

  await NotificationServices.createNotificationIntoDB({
    type: 'callBooking',
    readBy: [],
    message: `New call booking created for ${payload.day} at ${payload.start} - ${payload.end}`,
    subscriberId: payload.subscriberId,
  });

  return createdCallBooking;
};

//     const overlappingBookings = await CallBooking.findOne({
//     date: payload.date,
//     day: day,
//   // isDeleted: false, // Optionally exclude deleted records
//    $or: [
//     // Case 1: The new booking starts within an existing booking
//     {
//       start: { $lte: payload.start },
//       end: { $gt: payload.start },
//     },
//     // Case 2: The new booking ends within an existing booking
//     {
//       start: { $lt: payload.end },
//       end: { $gte: payload.end },
//     },
//     // Case 3: The new booking fully contains an existing booking
//     {
//       start: { $gte: payload.start },
//       end: { $lte: payload.end },
//     }
//   ],
// });

// Before checking in DB
// Utility functions
// if (overlappingBookings) {
//   throw new AppError(
//     httpStatus.CONFLICT,
//     'A booking already exists that overlaps with the specified slots.'
//   );
// }

const getAllCallBookingsFromDB = async (query: Record<string, unknown>, user: any) => {


  const { userEmail } = user;
  const userData = await User.findOne({ email: userEmail });
  let subscriberIdValue;

  if(userData?.role === 'superAdmin' || userData?.role === 'subscriber'){
    subscriberIdValue = userData?._id;
  }
  if(userData?.role === 'admin'){
    subscriberIdValue = userData?.subscriberId;
  }

  const CallBookingQuery = new QueryBuilder(
    CallBooking.find({subscriberId:subscriberIdValue}).populate('bookedBy').populate('subscriberId').populate('quoteId'),
    // CallBooking.find({ status: 'completed' }).populate('userId').populate('adminId'),
    query,
  )
    .search(CALLBOOKING_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await CallBookingQuery.modelQuery;
  const meta = await CallBookingQuery.countTotal();


  return {
    result,
    meta,
  };
};

const getAllCallBookingsByUserFromDB = async (
  query: Record<string, unknown>,
  userId: string,
) => {


  const CallBookingQuery = new QueryBuilder(
    CallBooking.find({ 
      // bookedBy: userId, state: 'confirmed' 
       bookedBy: userId,
  state: { $in: ["confirmed", "pending"] }, 
    }),
    query,
  )
    .search(CALLBOOKING_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await CallBookingQuery.modelQuery;
  const meta = await CallBookingQuery.countTotal();

    // console.log('result', result);


  return {
    result,
    meta,
  };
};

const getSingleCallBookingFromDB = async (id: string) => {
  const result = await CallBooking.findById(id);

  return result;
};

const updateCallBookingIntoDB = async (id: string, payload: any) => {
  const isDeletedService = await mongoose.connection
    .collection('callbookings')
    .findOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { projection: { isDeleted: 1, day: 1 } },
    );

  if (!isDeletedService?.day) {
    throw new Error('CallBooking not found');
  }

  if (isDeletedService.isDeleted) {
    throw new Error('Cannot update a deleted CallBooking');
  }

  const updatedData = await CallBooking.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedData) {
    throw new Error('CallBooking not found after update');
  }

  return updatedData;
};

const deleteCallBookingFromDB = async (id: string) => {
  const deletedService = await CallBooking.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete CallBooking');
  }

  return deletedService;
};

export const CallBookingServices = {
  createCallBookingIntoDB,
  getAllCallBookingsFromDB,
  getSingleCallBookingFromDB,
  updateCallBookingIntoDB,
  deleteCallBookingFromDB,
  getAllCallBookingsByUserFromDB,
};
