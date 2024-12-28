/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import mongoose from 'mongoose';

import { Admin } from '../Admin/admin.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { usersSearchableFields } from './user.constant';
import mongoose from 'mongoose';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';


export const createAdminIntoDB = async (payload: TUser) => {

  payload.role = 'admin';

 if(!payload.password){
  payload.password = 'client12345';
 }
  const session = await mongoose.startSession();

  try {
    session.startTransaction();


    const newUser = await User.create(payload);
    // const newUser = await User.create([userData], { session });
    if (!newUser) throw new Error('Failed to create user');
    // if (!newUser.length) throw new Error('Failed to create user');

    // payload.id = newUser[0].id;
    // payload.userId = newUser._id;
    // payload.userId = newUser[0]._id;

    const newAdmin = await Admin.create(payload);
    // const newAdmin = await Admin.create([payload], { session });
    if (!newAdmin) throw new Error('Failed to create admin');
    // if (!newAdmin.length) throw new Error('Failed to create admin');

    // await session.commitTransaction();
    // await session.endSession();

    return newAdmin;
  } catch (err: any) {
    // await session.abortTransaction();
    // await session.endSession();
    throw new Error(err.message);
  }
};

const getMe = async (userEmail: string) => {
// const getMe = async (userEmail: string, role: string) => {
  // let result = null;
  // if (role === 'client') {
  //   result = await User.findOne({ email: userEmail });
  // }
  // if (role === 'admin') {
  //   result = await Admin.findOne({ email: userEmail }).populate('userId');
  // }

  const result = await User.findOne({ email: userEmail });

  return result;
};
const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(User.find({status: 'active'}), query)
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

export const UserServices = {
  createAdminIntoDB,
  getMe,
  changeStatus,
  getAllUsersFromDB,
  updateUserIntoDB
};
