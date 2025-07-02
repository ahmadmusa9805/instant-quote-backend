/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TNotification } from './Notification.interface';
import { Notification } from './Notification.model';
import { User } from '../User/user.model';

const createNotificationIntoDB = async (
  payload: TNotification,
) => {
  const result = await Notification.create(payload);
  
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Notification');
  }
  return result;
};

const getAllUnreadNotificationsFromDB = async (user: any) => {

  const {userEmail} = user;
  const currentUser = await User.findOne({email: userEmail});
  if(!currentUser) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

const allNotifications = await Notification.find({
  subscriberId: currentUser.subscriberId,
}).sort({ createdAt: -1 }).lean().limit(20);

const response = allNotifications.map((notif) => ({
  ...notif,
  isRead: notif.readBy?.some(
    (entry:any) => entry?.userId.toString() === currentUser._id.toString()
  ),
}));


  return response;
};

export const getUnreadNotifications = async () => {
  return await Notification.find({ isRead: false }).sort({ createdAt: -1 });
};


export const markNotificationsAsReadIntoDB = async (user: any) => {
  // return await Notification.updateMany(
  //   { isRead: false }, // Only update unread notifications
  //   { isRead: true }   // Mark them as read
  // );
const {userEmail} = user;
const currentUser = await User.findOne({email: userEmail});
if(!currentUser) throw new AppError(httpStatus.NOT_FOUND, 'User not found');

await Notification.updateMany(
  {
    subscriberId: currentUser.subscriberId,
    'readBy.userId': { $ne: currentUser._id }, // not read yet
  },
  {
    $push: {
      readBy: {
        userId: currentUser._id,
        readAt: new Date(),
      },
    },
  }
);


};


export const markNotificationAsReadIntoDB = async (id: any, user: any) => {
  const {userEmail} = user;
  const currentUser = await User.findOne({email: userEmail});
  if(!currentUser) throw new AppError(httpStatus.NOT_FOUND, 'User not found');


const notification = await Notification.findById(id);
if (!notification) {throw new AppError(404, 'Notification not found.')}

// Protect against cross-subscriber access
if (notification.subscriberId.toString() !== currentUser?.subscriberId?.toString()) {
  throw new AppError(403, 'Access denied');
}

// Mark as read if not already
if (!notification.readBy.includes(currentUser?._id)) {
  notification.readBy.push(currentUser?._id);
  await notification.save();
}

// If already marked as read by user, do nothing
// const alreadyRead = notification.readBy?.some(
//   (r:any) => r.userId.toString() === currentUser._id.toString()
// );

// if (!alreadyRead) {
// notification.readBy.push(currentUser?._id);
//   await notification.save();
// }

return 'Notification marked as read.'
};



export const NotificationServices = {
  createNotificationIntoDB,
  getAllUnreadNotificationsFromDB,
  getUnreadNotifications,
  markNotificationAsReadIntoDB, 
  markNotificationsAsReadIntoDB
};
