import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { NotificationServices } from './Notification.service';

const createNotification = catchAsync(async (req, res) => {
  const notification = req.body;
  const result = await NotificationServices.createNotificationIntoDB(notification);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notification is created successfully',
    data: result,
  });
});


const getAllUnreadNotifications = catchAsync(async (req, res) => {
  const result = await NotificationServices.getAllUnreadNotificationsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notifications are retrieved successfully',
    data: result,
  });
});

const markNotificationAsRead = catchAsync(async (req, res) => {
  const result = await NotificationServices.markNotificationAsReadIntoDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Notification is updated successfully',
    data: result,
  });
});


export const NotificationControllers = {
  createNotification,
  getAllUnreadNotifications,
  markNotificationAsRead,
};
