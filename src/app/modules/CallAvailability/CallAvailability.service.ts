/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { CALLAVAILABILITY_SEARCHABLE_FIELDS } from './CallAvailability.constant';
// import mongoose from 'mongoose';
import { TCallAvailability } from './CallAvailability.interface';
import { CallAvailability } from './CallAvailability.model';
import mongoose from 'mongoose';
import { User } from '../User/user.model';
import { CallBooking } from '../CallBooking/CallBooking.model';

const createCallAvailabilityIntoDB = async (payload: TCallAvailability,   user: any) => {
  const {  userEmail } = user;
  const userData = await User.findOne({ email: userEmail });
  // console.log('userData', userData);


  if(userData?.role==='subscriber'){
      payload.subscriberId = userData?._id ?? new mongoose.Types.ObjectId();
      payload.createdBy = userData?._id ?? new mongoose.Types.ObjectId();
  }else if(userData?.role==='admin'){
          payload.subscriberId = userData?.subscriberId ?? new mongoose.Types.ObjectId();
          payload.createdBy = userData?._id ?? new mongoose.Types.ObjectId();

  }else{
      throw new AppError(httpStatus.BAD_REQUEST, 'Only subscriber can create availability');
  }


  // Utility function to parse time strings like "09:00 AM" into Date objects
  // const parseTime = (time: string | any) => {
  //   const [hours, minutes] = time.match(/(\d+):(\d+)/).slice(1, 3);
  //   const period = time.match(/AM|PM/)[0];
  //   let hour = parseInt(hours, 10);
  //   if (period === 'PM' && hour !== 12) hour += 12;
  //   if (period === 'AM' && hour === 12) hour = 0;

  //   return new Date(1970, 0, 1, hour, parseInt(minutes, 10));
  // };

  // // Convert startTime and endTime to Date objects for comparison
  // const newStartTime = parseTime(payload.timeSlots[0].start);
  // const newEndTime = parseTime(payload.timeSlots[0].end);

  // if (newEndTime <= newStartTime) {
  //   throw new AppError(
  //     httpStatus.BAD_REQUEST,
  //     "End time must be after start time"
  //   );
  // }



    // Check if a Availability already exists
    const existingAvailability = await CallAvailability.find({ }); // or use another unique field like 'code'
    if (existingAvailability[0]) {
      // If a term exists, update it with the new payload
      const updatedAvailability = await CallAvailability.findByIdAndUpdate(existingAvailability[0]._id, payload, { new: true });
      return updatedAvailability;  // Return the updated term
    }

      const result = await CallAvailability.create(payload);
  
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Availability');
  }

  return result;
};


const getAllCallAvailabilitysFromDB = async (query: Record<string, unknown>) => {
  const CallAvailabilityQuery = new QueryBuilder(
    CallAvailability.find({isDeleted: false}).populate('subscriberId'),
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

const getAvailabilityFromDB = async () => {
  const result = await CallAvailability.findOne();

  return result;
};

const getCalenderAvailabilityFromDB = async (month: any, year: any, user: any) => {
let rule;
  const {  userEmail } = user;
  const userData = await User.findOne({ email: userEmail });
  // console.log('user', userData);

  if(userData?.role==='superAdmin'){
      throw new AppError(httpStatus.BAD_REQUEST, 'Not Allowed for super admin');
  }else if(userData?.role==='admin' || userData?.role==='client'){
    console.log('userData', userData)
    console.log('client')
     const  result = await CallAvailability.findOne({ subscriberId: userData?.subscriberId });
    console.log('result', result)

       rule = result
  }else{
      rule = await CallAvailability.findOne({ subscriberId: userData?._id });
  }
  // payload.subscriberId = userData?._id ?? new mongoose.Types.ObjectId();
  // console.log('Service: Calendar Availability');
  // console.log(rule,'rule');

  if (!rule) throw new Error('No availability rule found.');

  const daysInMonth = new Date(Date.UTC(year, month + 1, 0)).getUTCDate(); // e.g. 31 for July
    // console.log('daysInMonth', daysInMonth);

  const results: any[] = [];

  for (let day = 1; day <= daysInMonth; day++) {
      //  console.log('<<<<<<<Start>>>>>>>>', );

      // console.log('day', day);


    
    const currentDate = new Date(Date.UTC(year, month, day)); // Create date in UTC
              // console.log('currentDate', currentDate);

    const dayOfWeek = currentDate.getUTCDay(); // Get day of week in UTC (0 = Sun ... 6 = Sat)
          // console.log('dayOfWeek', dayOfWeek);
          // console.log('rule.daysOfWeek.includes(dayOfWeek)', rule.daysOfWeek.includes(dayOfWeek));
    if (rule.daysOfWeek.includes(dayOfWeek)) {
            // console.log('currentDate.toISOString().split', currentDate.toISOString().split('T')[0]);

      const dateStr = currentDate.toISOString().split('T')[0];
          // console.log('dateStr', dateStr);

      const appointments = await CallBooking.find({ date: dateStr });
          // console.log('appointments', appointments);

      const availableSlots = [];
      const bookedSlots = [];

      for (const slot of rule.timeSlots) {
          // console.log('rule.timeSlots', rule.timeSlots);
          // console.log('slot', slot);
        const isBooked = appointments.find(
          a => a.start === slot.start && a.end === slot.end
        );
      //  console.log('isBooked', isBooked);
        if (isBooked) {
          bookedSlots.push(slot);
                //  console.log('bookedSlots', bookedSlots);

        } else {
          availableSlots.push(slot);
                //  console.log('availableSlots', availableSlots);

        }

      }

        //  console.log('dateStr', dateStr);
        //   console.log('availableSlots', availableSlots);
        //   console.log('bookedSlots', bookedSlots);

      results.push({
        date: dateStr,
        availableSlots,
        bookedSlots,
      });
    }
  
  
        //  console.log('<<<<<<<end>>>>>>>>', );

  }

  return results;
};


const getSingleCallAvailabilityFromDB = async (id: string) => {
  const result = await CallAvailability.findOne({ _id: id, isDeleted: false }).populate('subscriberId');

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
    const recordStartTime = parseTime(record.timeSlots[0].start);
    const recordEndTime = parseTime(record.timeSlots[0].end);


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
  getAvailabilityFromDB,
  getCalenderAvailabilityFromDB
};
