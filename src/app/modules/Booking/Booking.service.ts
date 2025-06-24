/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { BOOKING_SEARCHABLE_FIELDS } from './Booking.constant';
import mongoose from 'mongoose';
import { TBooking } from './Booking.interface';
import { Booking } from './Booking.model';
import { User } from '../User/user.model';

const createBookingIntoDB = async (
  payload: TBooking,
  user: any
) => {
  console.log('payload', payload);
    const {  userEmail } = user;
    const userData = await User.findOne({ email: userEmail });
    payload.bookedBy = userData?._id ?? new mongoose.Types.ObjectId();
  const result = await Booking.create(payload);
  
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Booking');
  }

  return result;
};

const getAllBookingsFromDB = async (query: Record<string, unknown>) => {
  const BookingQuery = new QueryBuilder(
    Booking.find(),
    query,
  )
    .search(BOOKING_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await BookingQuery.modelQuery;
  const meta = await BookingQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleBookingFromDB = async (id: string) => {
  const result = await Booking.findById(id);

  return result;
};

const updateBookingIntoDB = async (id: string, payload: any) => {
  const isDeletedService = await mongoose.connection
    .collection('bookings')
    .findOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { projection: { isDeleted: 1, name: 1 } },
    );

  if (!isDeletedService?.name) {
    throw new Error('Booking not found');
  }

  if (isDeletedService.isDeleted) {
    throw new Error('Cannot update a deleted Booking');
  }

  const updatedData = await Booking.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedData) {
    throw new Error('Booking not found after update');
  }

  return updatedData;
};

const deleteBookingFromDB = async (id: string) => {
  const deletedService = await Booking.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Booking');
  }

  return deletedService;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getSingleBookingFromDB,
  updateBookingIntoDB,
  deleteBookingFromDB,
};
