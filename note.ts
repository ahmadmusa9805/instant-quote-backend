// userName: instant-quote
// pass: uxdrWlloE1SEx11X
// mongodb+srv://instant-quote:uxdrWlloE1SEx11X@dbuser1.gcypv06.mongodb.net/instant-quote?retryWrites=true&w=majority&appName=dbUser1


// 1. if subsciber or admin it will get differently monthly basis result all user monthly


//   subscriberId: Types.ObjectId;
//   subscriberId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//   subscriberId: z.string(),
    // auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),

    //     const {  userEmail } = user;
    // const userData = await User.findOne({ email: userEmail });
    // subscriberId: userData?._id

    // 1 = 685150de67859a426fed3b93
    // 2 = 685155d39522735ec381a3c5
    //=================================================================================================
    // const { day, startTime, endTime } = payload;
  // const { day, startTime, endTime, date } = payload;
  
// Get the current date
// const currentDate = new Date();

// Convert the date from the payload to a Date object
// const inputDate = new Date(date as any);

// Check if the input date is in the past
// if (inputDate < currentDate) {
//     throw new Error("The date is in the past. Please provide a future date.");
// }

  // // Utility function to parse time strings like "09:00 AM" into Date objects
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

  // Check for overlapping time slots
  // const existingRecords = await CallAvailability.find({ day, isDeleted: false });

  // for (const record of existingRecords) {
  //   const recordStartTime = parseTime(record.startTime);
  //   const recordEndTime = parseTime(record.endTime);


  //   if (
  //     (newStartTime >= recordStartTime && newStartTime < recordEndTime) || // Overlaps at the start
  //     (newEndTime > recordStartTime && newEndTime <= recordEndTime) || // Overlaps at the end
  //     (newStartTime <= recordStartTime && newEndTime >= recordEndTime) // Fully contains the existing slot
  //   ) {
  //     throw new AppError(
  //       httpStatus.CONFLICT,
  //       `Time slot ${startTime} to ${endTime} overlaps with an existing slot`
  //     );
  //   }
  // }

  // If no overlap, create the new record
  // const result = await CallAvailability.create(payload);

  // if (!result) {
  //   throw new AppError(
  //     httpStatus.BAD_REQUEST,
  //     "Failed to create CallAvailability"
  //   );
  // }

  // return result;
