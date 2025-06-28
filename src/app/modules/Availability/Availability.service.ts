/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { AVAILABILITY_SEARCHABLE_FIELDS } from './Availability.constant';
import mongoose from 'mongoose';
import { TAvailability } from './Availability.interface';
import { Availability } from './Availability.model';
import { Booking } from '../Booking/Booking.model';
import { User } from '../User/user.model';

const createAvailabilityIntoDB = async (
  payload: TAvailability,
  user: any
) => {

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


  // Check if a term already exists based on a unique field (e.g., term name or code)
  const existingAvailability = await Availability.find({ }); // or use another unique field like 'code'
  if (existingAvailability[0]) {
    // If a term exists, update it with the new payload
    const updatedAvailability = await Availability.findByIdAndUpdate(existingAvailability[0]._id, payload, { new: true });
    return updatedAvailability;  // Return the updated term
  }




  const result = await Availability.create(payload);
  
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Availability');
  }

  return result;
};

const getAllAvailabilitysFromDB = async (query: Record<string, unknown>) => {
  const AvailabilityQuery = new QueryBuilder(
    Availability.find(),
    query,
  )
    .search(AVAILABILITY_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await AvailabilityQuery.modelQuery;
  const meta = await AvailabilityQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getAvailabilityFromDB = async () => {
  const result = await Availability.findOne();

  return result;
};

const getCalenderAvailabilityFromDB = async (month: any, year: any, user: any) => {
let rule;
  const {  userEmail } = user;
  const userData = await User.findOne({ email: userEmail });
  // console.log('user', userData);

  if(userData?.role==='superAdmin'){
      throw new AppError(httpStatus.BAD_REQUEST, 'Only subscriber can get availability');
  }else if(userData?.role==='admin' || userData?.role==='client'){
       rule = await Availability.findOne({ subscriberId: userData?.subscriberId });
  }else{
      rule = await Availability.findOne({ subscriberId: userData?._id });
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

      const appointments = await Booking.find({ date: dateStr });
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



////////////////////

// const getCalenderAvailabilityFromDB = async (month: number, year: number) => {
//   const rule = await Availability.findOne();
//   if (!rule) throw new Error('No availability rule found.');

//   const daysInMonth = new Date(year, month + 1, 0).getDate(); // e.g. 31 for July
//   const results: any[] = [];

//   for (let day = 1; day <= daysInMonth; day++) {
//     const currentDate = new Date(year, month, day); // month is 0-based

//     if (currentDate.getMonth() !== month) continue; // 🚫 Skip wrong month like June 30

//     const dayOfWeek = currentDate.getDay(); // 0 = Sun, 1 = Mon, ..., 6 = Sat

//     if (rule.daysOfWeek.includes(dayOfWeek)) {
//       const dateStr = currentDate.toISOString().split('T')[0];
//       const appointments = await Booking.find({ date: dateStr });

//       const availableSlots = [];
//       const bookedSlots = [];

//       for (const slot of rule.timeSlots) {
//         const isBooked = appointments.find(
//           a => a.start === slot.start && a.end === slot.end
//         );

//         if (isBooked) {
//           bookedSlots.push(slot);
//         } else {
//           availableSlots.push(slot);
//         }
//       }

//       results.push({
//         date: dateStr,
//         availableSlots,
//         bookedSlots,
//       });
//     }
//   }

//   return results;
// };



const getSingleAvailabilityFromDB = async (id: string) => {
  const result = await Availability.findById(id);

  return result;
};

const updateAvailabilityIntoDB = async (id: string, payload: any) => {
  const isDeletedService = await mongoose.connection
    .collection('availabilitys')
    .findOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { projection: { isDeleted: 1, name: 1 } },
    );

  if (!isDeletedService?.name) {
    throw new Error('Availability not found');
  }

  if (isDeletedService.isDeleted) {
    throw new Error('Cannot update a deleted Availability');
  }

  const updatedData = await Availability.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedData) {
    throw new Error('Availability not found after update');
  }

  return updatedData;
};

const deleteAvailabilityFromDB = async (id: string) => {
  const deletedService = await Availability.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Availability');
  }

  return deletedService;
};

export const AvailabilityServices = {
  createAvailabilityIntoDB,
  getAllAvailabilitysFromDB,
  getSingleAvailabilityFromDB,
  updateAvailabilityIntoDB,
  deleteAvailabilityFromDB,
  getAvailabilityFromDB,
  getCalenderAvailabilityFromDB,
  // getCalenderAvailabilityFromDBs
};
