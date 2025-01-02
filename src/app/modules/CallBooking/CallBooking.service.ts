/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { CALLBOOKING_SEARCHABLE_FIELDS } from './CallBooking.constant';
import mongoose from 'mongoose';
import { TCallBooking } from './CallBooking.interface';
import { CallBooking } from './CallBooking.model';

// const createCallBookingIntoDB = async (payload: TCallBooking) => {
//   // Check for existing booking with the same day, startTime, and endTime
//   const existingBooking = await CallBooking.findOne({
//     day: payload.day,
//     startTime: payload.startTime,
//     endTime: payload.endTime,
//     isDeleted: false, // Optionally exclude deleted records
//   });

//   if (existingBooking) {
//     throw new AppError(
//       httpStatus.CONFLICT,
//       'A booking already exists for the specified day and time.'
//     );
//   }

//   // Create the new booking if no conflict is found
//   const result = await CallBooking.create(payload);

//   if (!result) {
//     throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create CallBooking');
//   }

//   return result;
// };

const createCallBookingIntoDB = async (payload: TCallBooking) => {
  // Check for existing bookings with overlapping times on the same day
  const overlappingBooking = await CallBooking.findOne({
    day: payload.day,
    isDeleted: false, // Optionally exclude deleted records
    $or: [
      // Case 1: The new booking starts within an existing booking
      {
        startTime: { $lte: payload.startTime },
        endTime: { $gt: payload.startTime },
      },
      // Case 2: The new booking ends within an existing booking
      {
        startTime: { $lt: payload.endTime },
        endTime: { $gte: payload.endTime },
      },
      // Case 3: The new booking fully contains an existing booking
      {
        startTime: { $gte: payload.startTime },
        endTime: { $lte: payload.endTime },
      }
    ],
  });

  if (overlappingBooking) {
    throw new AppError(
      httpStatus.CONFLICT,
      'A booking already exists that overlaps with the specified time range.'
    );
  }

  // Create the new booking if no conflict is found
  const result = await CallBooking.create(payload);

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create CallBooking');
  }

  return result;
};

const getAllCallBookingsFromDB = async (query: Record<string, unknown>) => {
  const CallBookingQuery = new QueryBuilder(
    CallBooking.find(),
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

const getSingleCallBookingFromDB = async (id: string) => {
  const result = await CallBooking.findById(id);

  return result;
};

const updateCallBookingIntoDB = async (id: string, payload: any) => {
  const isDeletedService = await mongoose.connection
    .collection('callbookings')
    .findOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { projection: { isDeleted: 1, name: 1 } },
    );

  if (!isDeletedService?.name) {
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
};
