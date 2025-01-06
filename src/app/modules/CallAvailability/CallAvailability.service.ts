/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { CALLAVAILABILITY_SEARCHABLE_FIELDS } from './CallAvailability.constant';
// import mongoose from 'mongoose';
import { TCallAvailability } from './CallAvailability.interface';
import { CallAvailability } from './CallAvailability.model';
import mongoose from 'mongoose';

const createCallAvailabilityIntoDB = async (payload: TCallAvailability) => {
  const { day, startTime, endTime } = payload;
 
  // Utility function to parse time strings like "09:00 AM" into Date objects
  const parseTime = (time: string | any) => {
    const [hours, minutes] = time.match(/(\d+):(\d+)/).slice(1, 3);
    const period = time.match(/AM|PM/)[0];
    let hour = parseInt(hours, 10);
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;

    return new Date(1970, 0, 1, hour, parseInt(minutes, 10));
  };

  // Convert startTime and endTime to Date objects for comparison
  const newStartTime = parseTime(startTime);
  const newEndTime = parseTime(endTime);

  if (newEndTime <= newStartTime) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "End time must be after start time"
    );
  }

  // Check for overlapping time slots
  const existingRecords = await CallAvailability.find({ day, isDeleted: false });

  for (const record of existingRecords) {
    const recordStartTime = parseTime(record.startTime);
    const recordEndTime = parseTime(record.endTime);


    if (
      (newStartTime >= recordStartTime && newStartTime < recordEndTime) || // Overlaps at the start
      (newEndTime > recordStartTime && newEndTime <= recordEndTime) || // Overlaps at the end
      (newStartTime <= recordStartTime && newEndTime >= recordEndTime) // Fully contains the existing slot
    ) {
      throw new AppError(
        httpStatus.CONFLICT,
        `Time slot ${startTime} to ${endTime} overlaps with an existing slot`
      );
    }
  }

  // If no overlap, create the new record
  const result = await CallAvailability.create(payload);

  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Failed to create CallAvailability"
    );
  }

  return result;
};


const getAllCallAvailabilitysFromDB = async (query: Record<string, unknown>) => {
  const CallAvailabilityQuery = new QueryBuilder(
    CallAvailability.find({isDeleted: false}),
    query,
  )
    .search(CALLAVAILABILITY_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await CallAvailabilityQuery.modelQuery;
  const meta = await CallAvailabilityQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleCallAvailabilityFromDB = async (id: string) => {
  const result = await CallAvailability.findOne({ _id: id, isDeleted: false });

  return result;
};

const updateCallAvailabilityIntoDB = async (id: string, payload: any) => {
  const isDeletedService = await mongoose.connection
    .collection('callavailabilitys')
    .findOne(
      { _id: new mongoose.Types.ObjectId(id) },
      // { projection: { isDeleted: 1, day: 1 } },
    );

  if (!isDeletedService) {
    throw new Error('CallAvailability not found');
  }

  if (isDeletedService.isDeleted) {
    throw new Error('Cannot update a deleted CallAvailability');
  }
//

const { day, startTime, endTime } = payload;
 
if (!day || !startTime || !endTime) {
  throw new Error('CallAvailability day, startTime, or endTime not found');
}

  // Utility function to parse time strings like "09:00 AM" into Date objects
  const parseTime = (time: string | any) => {
    const [hours, minutes] = time.match(/(\d+):(\d+)/).slice(1, 3);
    const period = time.match(/AM|PM/)[0];
    let hour = parseInt(hours, 10);
    if (period === 'PM' && hour !== 12) hour += 12;
    if (period === 'AM' && hour === 12) hour = 0;

    return new Date(1970, 0, 1, hour, parseInt(minutes, 10));
  };

  // Convert startTime and endTime to Date objects for comparison
  const newStartTime = parseTime(startTime);
  const newEndTime = parseTime(endTime);

  if (newEndTime <= newStartTime) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "End time must be after start time"
    );
  }

  // Check for overlapping time slots
  const existingRecords = await CallAvailability.find({ day, isDeleted: false });

  for (const record of existingRecords) {
    const recordStartTime = parseTime(record.startTime);
    const recordEndTime = parseTime(record.endTime);


    if (
      (newStartTime >= recordStartTime && newStartTime < recordEndTime) || // Overlaps at the start
      (newEndTime > recordStartTime && newEndTime <= recordEndTime) || // Overlaps at the end
      (newStartTime <= recordStartTime && newEndTime >= recordEndTime) // Fully contains the existing slot
    ) {
      throw new AppError(
        httpStatus.CONFLICT,
        `Time slot ${startTime} to ${endTime} overlaps with an existing slot`
      );
    }
  }




////
  const updatedData = await CallAvailability.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedData) {
    throw new Error('CallAvailability not found after update');
  }

  return updatedData;
};

const deleteCallAvailabilityFromDB = async (id: string) => {
  const deletedService = await CallAvailability.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete CallAvailability');
  }

  return deletedService;
};

export const CallAvailabilityServices = {
  createCallAvailabilityIntoDB,
  getAllCallAvailabilitysFromDB,
  getSingleCallAvailabilityFromDB,
  updateCallAvailabilityIntoDB,
  deleteCallAvailabilityFromDB,
};
