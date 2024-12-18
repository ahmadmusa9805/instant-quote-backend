/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-undef */
import httpStatus from 'http-status';
// import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
// import { sendFileToCloudinary } from '../../utils/sendImageAndVideoToCloudinary';
import { User } from '../User/user.model';
import { actorsSearchableFields } from './actor.constant';
import { TActor } from './actor.interface';
import { Actor } from './actor.model';
// import { Competition } from '../Competetion/competetion.model';
// import { CompetitionModel } from '../Competetion/competetion.interface';


const getAllActorsFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(Actor.find({status: 'active', isDeleted: false}).populate('userId'), query)
    .search(actorsSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await studentQuery.countTotal();
  const result = await studentQuery.modelQuery;

  return {
    meta,
    result,
  };
};

const getSingleActorFromDB = async (id: string) => {
  // const result = await Actor.findById(id, {status: 'active'}).populate('userId');
  const result = await Actor.findOne({ _id: id, status: 'active' }).populate('userId');
  // .populate('academicDepartment academicFaculty');
  return result;
};


const updateActorIntoDB = async (
  id: string,
  files: any,
  payload: Partial<TActor>,
) => {
  const { name, ...remainingStudentData } = payload;
  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (files && files.file && Array.isArray(files.file)) {
    files.file.forEach((file:any) => {
      if (file.contentType.startsWith('video') || file.contentType.endsWith('.mp4') || file.mimetype.startsWith('video')) {
        // If the file is a video, update the profileVideo field
        modifiedUpdatedData.profileVideo = file.location;
      } else if (file.contentType.startsWith('image')) {
        // If the file is an image, update the profileImage field
        modifiedUpdatedData.profileImg = file.location;
      }
    });
  }


  const result = await Actor.findByIdAndUpdate(
    { _id: id },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

const deleteActorFromDB = async (id: string) => {
  // const session = await mongoose.startSession();

  try {
    // session.startTransaction();

    const deletedStudent = await Actor.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
      // { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    // get user _id from deletedStudent
    const userId = deletedStudent.userId;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true },
      // { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    // await session.commitTransaction();
    // await session.endSession();

    return deletedStudent;
  } catch (err) {
    // await session.abortTransaction();
    // await session.endSession();
    throw new Error('Failed to delete student');
  }
};





export const ActorServices = {
  getSingleActorFromDB,
  getAllActorsFromDB,
  updateActorIntoDB,
  deleteActorFromDB,
};
