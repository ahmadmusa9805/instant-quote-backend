import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CallBookingServices } from './CallBooking.service';

const createCallBooking = catchAsync(async (req, res) => {
  const CallBookingData = req.body;
  const result = await CallBookingServices.createCallBookingIntoDB(CallBookingData, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'CallBooking is created successfully',
    data: result,
  });
});

const getSingleCallBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CallBookingServices.getSingleCallBookingFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'CallBooking is retrieved successfully',
    data: result,
  });
});

const getAllCallBookings = catchAsync(async (req, res) => {
  const result = await CallBookingServices.getAllCallBookingsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'CallBookings are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});
const getAllCallBookingsByUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CallBookingServices.getAllCallBookingsByUserFromDB(req.query, id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'CallBookings are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateCallBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { callBooking: CallBooking } = req.body;
  const result = await CallBookingServices.updateCallBookingIntoDB(id, CallBooking);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'CallBooking is updated successfully',
    data: result,
  });
});

const deleteCallBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CallBookingServices.deleteCallBookingFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'CallBooking is deleted successfully',
    data: result,
  });
});

export const CallBookingControllers = {
  createCallBooking,
  getSingleCallBooking,
  getAllCallBookings,
  updateCallBooking,
  deleteCallBooking,
  getAllCallBookingsByUser,
};
