/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import mongoose from 'mongoose';

import mongoose from 'mongoose';
import QueryBuilder from '../../builder/QueryBuilder';
import { sendImageToCloudinary } from '../../utils/sendImageToCloudinary';
import { TUser } from '../User/user.interface';
import { User } from '../User/user.model';
import { usersSearchableFields } from './quote.constant';
import { Quote } from './quote.model';

export const createQuoteIntoDB = async (payload: any, file: any) => {
  const userData: Partial<TUser> = {
    password: payload.password || 'client12345',
    role: 'client',
    email: payload.email,
    contactNo: payload.contactNo,
    name: payload.name,
  };

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    if (file) {
      const imageName = `${file.originalname}`;
      const path = file.path;

      const { secure_url } = await sendImageToCloudinary(imageName, path);

      payload.file = secure_url;
    }



    // const newUser = await User.create(userData);
    const newUser = await User.create([userData], { session });

    // if (!newUser) throw new Error('Failed to create user');
    if (!newUser.length) throw new Error('Failed to create user');

    // payload.userId = newUser._id;
    payload.userId = newUser[0]._id;

    // const newClient = await Quote.create(payload);
    const newClient = await Quote.create([payload], { session });
    // if (!newClient) throw new Error('Failed to create Client');
    if (!newClient.length) throw new Error('Failed to create actor');

    await session.commitTransaction();
    await session.endSession();

    return newClient;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err?.message);
  }
};
export const createAdminIntoDB = async (payload: TUser) => {
  // export const createAdminIntoDB = async (file: any, payload: TAdmin) => {
  // const userData: Partial<TQuote> = {
  //   password: payload?.password,
  //   role: 'admin',
  //   email: payload.email,
  // };

  // const session = await mongoose.startSession();

  try {
    // session.startTransaction();


    const newUser = await Quote.create(payload);
    // const newUser = await User.create([userData], { session });
    if (!newUser) throw new Error('Failed to create user');
    // if (!newUser.length) throw new Error('Failed to create user');

    // payload.id = newUser[0].id;
    // payload.userId = newUser._id;
    // payload.userId = newUser[0]._id;

    const newAdmin = await Quote.create(payload);
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

const getMe = async (userEmail: string, role: string) => {
  let result = null;
  if (role === 'actor') {
    result = await Quote.findOne({ email: userEmail }).populate('userId');
  }
  if (role === 'admin') {
    result = await Quote.findOne({ email: userEmail }).populate('userId');
  }

  return result;
};
const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const studentQuery = new QueryBuilder(Quote.find({status: 'active'}), query)
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
  const result = await Quote.findByIdAndUpdate(id, payload, {
    new: true,
  });
    // if(result?.status === 'blocked'){
    //   if(result?.role === 'actor'){
    //      await Actor.findOneAndUpdate({userId: result?._id}, {status: 'blocked'}, {new: true}).populate('userId');
    //    }
       
    //    if(result?.role === 'admin'){
    //     await Admin.findOneAndUpdate({userId: result?._id}, {status: 'blocked'}, {new: true}).populate('userId');
    //   }

     
    // }

    // if(result?.status === 'active'){
    //   if(result?.role === 'actor'){
    //      await Actor.findOneAndUpdate({userId: result?._id}, {status: 'active'}, {new: true}).populate('userId');
    //    }
       
    //    if(result?.role === 'admin'){
    //     await Admin.findOneAndUpdate({userId: result?._id}, {status: 'active'}, {new: true}).populate('userId');
    //   }

     
    // }




  return result;
};


export const QuoteServices = {
  createQuoteIntoDB,
  getMe,
  changeStatus,
  getAllUsersFromDB
};
