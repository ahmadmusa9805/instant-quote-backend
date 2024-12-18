/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
// import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { User } from '../User/user.model';
import { AdminSearchableFields } from './admin.constant';
import { TAdmin } from './admin.interface';
import { Admin } from './admin.model';

const getAllAdminsFromDB = async (query: Record<string, unknown>) => {
  const adminQuery = new QueryBuilder(Admin.find().populate('userId'), query)
    .search(AdminSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await adminQuery.modelQuery;

  const meta = await adminQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleAdminFromDB = async (id: string) => {
  const result = await Admin.findById(id).populate('userId');
  return result;
};

const updateAdminIntoDB = async (
  files: any,
  id: string,
  payload:Partial<TAdmin> = {}, // Default to an empty object,
) => {
  const { name, ...remainingAdminData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingAdminData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }


  if (files && files.file && Array.isArray(files.file)) {
    files.file.forEach((file:any) => {
      if (file.contentType.startsWith('image')) {
        // If the file is an image, update the profileImage field
        modifiedUpdatedData.profileImg = file.location;
      }
    });
  }


  const result = await Admin.findByIdAndUpdate(
    { _id: id },
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

const deleteAdminFromDB = async (id: string) => {
  // const session = await mongoose.startSession();
  try {
    // session.startTransaction();

    const deletedAdmin = await Admin.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
      // { new: true, session },
    );

    if (!deletedAdmin) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Admin');
    }

    // get user _id from deletedAdmin
    const userId = deletedAdmin.userId;

    const deletedUser = await User.findOneAndUpdate(
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

    return deletedAdmin;
  } catch (err: any) {
    // await session.abortTransaction();
    // await session.endSession();
    throw new Error(err);
  }
};

export const AdminServices = {
  getAllAdminsFromDB,
  getSingleAdminFromDB,
  updateAdminIntoDB,
  deleteAdminFromDB,
};
