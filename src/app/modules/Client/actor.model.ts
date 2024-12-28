// import { model, Schema } from 'mongoose';
// import {  ClientStatus } from './actor.constant';
// import {  ClientModel, TClient, TUserName } from './actor.interface';

// const clientNameSchema = new Schema<TUserName>({
//   firstName: {
//     type: String,
//     required: [true, 'First Name is required'],
//     trim: true,
//     maxlength: [20, 'Name can not be more than 20 characters'],
//   },
//   lastName: {
//     type: String,
//     trim: true,
//     required: [true, 'Last Name is required'],
//     maxlength: [20, 'Name can not be more than 20 characters'],
//   },
// });

// const clientSchema = new Schema<TClient, ClientModel>( 
//   {
//     name: {
//       type: clientNameSchema,
//       required: [true, 'Name is required'],
//     },
//     dateOfBirth: { type: Date, default: '' },
//     email: {
//       type: String,
//       required: [true, 'Email is required'],
//       unique: true,
//     },
//     contactNo: { type: String, required: [true, 'Contact no is required'] },
//     address: {
//        type: String, default: '' ,
//     },
//     profileImg: { type: String, default: '' },
//     isDeleted: {
//       type: Boolean,
//       default: false,
//     },
//     status: {
//       type: String,
//       enum: ClientStatus,
//       default: 'active',
//     },

//   },
//   {
//     timestamps: true,
//     toJSON: {
//       virtuals: true,
//     },
//   },

// );

// //virtual
// clientSchema.virtual('fullName').get(function () {
//   return this?.name?.firstName + ' ' + this?.name?.lastName;
// });

// // Query Middleware
// clientSchema.pre('find', function (next) {
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });

// clientSchema.pre('findOne', function (next) {
//   this.find({ isDeleted: { $ne: true } });
//   next();
// });

// clientSchema.pre('aggregate', function (next) {
//   this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
//   next();
// });

// //creating a custom static method
// clientSchema.statics.isClientExists = async function (id: string) {
//   const existingClient = await Client.findOne({ id });
//   return existingClient;
// };

// export const Client = model<TClient, ClientModel>('Client', clientSchema);
