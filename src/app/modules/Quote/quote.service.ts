/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// import mongoose from 'mongoose';

import { Actor } from '../Client/actor.model';
import { TAdmin } from '../Admin/admin.interface';
import { Admin } from '../Admin/admin.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { usersSearchableFields } from './quote.constant';
// import { TQuote } from './quote.interface';
import { Quote } from './quote.model';

export const createQuoteIntoDB = async (payload: any, file: any) => {
    
console.log(file, "file") 
console.log(payload, "payload") 

  // const userData: Partial<TQuote> = {
  //   password: payload.password,
  //   role: 'actor',
  //   email: payload.email,
  // };

  // const session = await mongoose.startSession();

  try {
    // session.startTransaction();

    const newUser = await Quote.create(payload);
    // const newUser = await User.create([userData], { session });

    if (!newUser) throw new Error('Failed to create user');
    // if (!newUser.length) throw new Error('Failed to create user');

    payload.userId = newUser._id;
    // payload.userId = newUser[0]._id;

    const newActor = await Actor.create(payload);
    // const newActor = await Actor.create([payload], { session });
    if (!newActor) throw new Error('Failed to create actor');
    // if (!newActor.length) throw new Error('Failed to create actor');

    // await session.commitTransaction();
    // await session.endSession();

    return newActor;
  } catch (err: any) {
    // await session.abortTransaction();
    // await session.endSession();
    throw new Error(err?.message);
  }
};
export const createAdminIntoDB = async (payload: TAdmin) => {
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
    payload.userId = newUser._id;
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

const getMe = async (userEmail: string, role: string) => {
  let result = null;
  if (role === 'actor') {
    result = await Actor.findOne({ email: userEmail }).populate('userId');
  }
  if (role === 'admin') {
    result = await Admin.findOne({ email: userEmail }).populate('userId');
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
