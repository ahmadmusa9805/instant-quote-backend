/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { CALLBOOKING_SEARCHABLE_FIELDS } from './CallBooking.constant';
import mongoose from 'mongoose';
import { TCallBooking } from './CallBooking.interface';
import { CallBooking } from './CallBooking.model';
import { CallAvailability } from '../CallAvailability/CallAvailability.model';
import { NotificationServices } from '../Notification/Notification.service';


const createCallBookingIntoDB = async (payload: TCallBooking) => {
  console.log(payload, "payload");

  // Check for existing bookings with overlapping times on the same day
  // const callAvailability = await CallAvailability.find()
  const callAvailability = await CallAvailability.find({day: payload.day, startTime: payload.startTime, endTime: payload.endTime, isDeleted: false})
  console.log(callAvailability, "callAvailability");

  // return null
 if (!callAvailability.length) {
    throw new AppError(
      httpStatus.CONFLICT,
      'Call availability not found for the specified day.'
    );
  }
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
  
  const callBookingExists = await CallBooking.findOne({ userId: payload.userId });
  if(callBookingExists){
    throw new Error('User Have already Call Booked');
  }


  // Create the new booking if no conflict is found
  const result = await CallBooking.create(payload);

  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create CallBooking');
  }

  await NotificationServices.createNotificationIntoDB({
    type: 'callBooking',
    message: `New call booking created for ${payload.day} at ${payload.startTime} - ${payload.endTime}`,
    isDeleted: false,
    isRead: false,
    createdAt: new Date(),
  });

  const deletedCallAvailability = await CallAvailability.findOneAndUpdate(
    // { day: payload.day, isDeleted: false },
    { day: payload.day, startTime: payload.startTime, endTime: payload.endTime, isDeleted: false },
    { isDeleted: true },
    { new: true },
  );

  if (!deletedCallAvailability) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete CallAvailability');
  }
  return result;
};

const getAllCallBookingsFromDB = async (query: Record<string, unknown>) => {
  const CallBookingQuery = new QueryBuilder(
    CallBooking.find().populate('userId').populate('adminId'),
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

const getAllCallBookingsByUserFromDB = async (query: Record<string, unknown>, userId: string) => {
  const CallBookingQuery = new QueryBuilder(
    CallBooking.find({userId, isDeleted: false}),
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
  getAllCallBookingsByUserFromDB
};
