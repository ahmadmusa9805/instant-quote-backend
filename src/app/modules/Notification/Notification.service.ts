/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TNotification } from './Notification.interface';
import { Notification } from './Notification.model';

const createNotificationIntoDB = async (
  payload: TNotification,
) => {
  const result = await Notification.create(payload);
  
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Notification');
  }
  return result;
};

const getAllUnreadNotificationsFromDB = async () => {
  const notification =  await Notification.find().sort({ createdAt: -1 }).limit(20);
  return notification;
};


export const getUnreadNotifications = async () => {
  return await Notification.find({ isRead: false }).sort({ createdAt: -1 });
};


export const markNotificationAsReadIntoDB = async () => {
  return await Notification.updateMany(
    { isRead: false }, // Only update unread notifications
    { isRead: true }   // Mark them as read
  );
};


export const NotificationServices = {
  createNotificationIntoDB,
  getAllUnreadNotificationsFromDB,
  getUnreadNotifications,
  markNotificationAsReadIntoDB
};
