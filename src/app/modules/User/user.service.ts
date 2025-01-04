/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import mongoose from 'mongoose';

import { TUser } from './user.interface';
import { User } from './user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { usersSearchableFields } from './user.constant';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

export const createUserIntoDB = async (payload: TUser) => {

if(payload.role === 'client'){
  if(!payload.password){
    payload.password = 'client12345';
   }

}
if(payload.role === 'admin'){
  if(!payload.password){
    payload.password = 'admin12345';
   }
}
    const newUser = await User.create(payload);
    if (!newUser) throw new Error('Failed to create user');

    
        return newUser;
};

const getMe = async (userEmail: string) => {
  const result = await User.findOne({ email: userEmail });

  return result;
};
const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(User.find({status: 'active', isDeleted: false}), query)
    .search(usersSearchableFields)
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

const changeStatus = async (id: string, payload: { status: string }) => {
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
    // if(result?.status === 'blocked'){
    //   if(result?.role === 'client'){
    //      await Client.findOneAndUpdate({userId: result?._id}, {status: 'blocked'}, {new: true}).populate('userId');
    //    }
       
    //    if(result?.role === 'admin'){
    //     await Admin.findOneAndUpdate({userId: result?._id}, {status: 'blocked'}, {new: true}).populate('userId');
    //   }

     
    // }

    // if(result?.status === 'active'){
    //   if(result?.role === 'client'){
    //      await Client.findOneAndUpdate({userId: result?._id}, {status: 'active'}, {new: true}).populate('userId');
    //    }
       
    //    if(result?.role === 'admin'){
    //     await Admin.findOneAndUpdate({userId: result?._id}, {status: 'active'}, {new: true}).populate('userId');
    //   }

     
    // }




  return result;
};


const updateUserIntoDB = async (id: string, payload: Partial<TUser>, file?: any) => {
  const { name, ...userData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = { ...userData };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  // Handle file upload if present
  if (file) {
    const imageName = `${file.originalname}`;
    const path = file.path;
    const { secure_url } = await sendImageToCloudinary(imageName, path);
    modifiedUpdatedData.profileImg = secure_url;
  }

  const result = await User.findByIdAndUpdate(
    id,
    modifiedUpdatedData,
    {
      new: true,
      runValidators: true,
    }
  ).select('-password');

  return result;
};


const deleteUserFromDB = async (id: string) => {
  const deletedService = await User.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  if (!deletedService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete User');  
  }

  return deletedService;
};

export const UserServices = {
  deleteUserFromDB,
  createUserIntoDB,
  getMe,
  changeStatus,
  getAllUsersFromDB,
  updateUserIntoDB
};
