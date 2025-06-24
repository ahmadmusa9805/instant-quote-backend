import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './Booking.service';

const createBooking = catchAsync(async (req, res) => {
  const BookingData = req.body;
  const result = await BookingServices.createBookingIntoDB(BookingData, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking is created successfully',
    data: result,
  });
});

const getSingleBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.getSingleBookingFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking is retrieved successfully',
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { Booking } = req.body;
  const result = await BookingServices.updateBookingIntoDB(id, Booking);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking is updated successfully',
    data: result,
  });
});

const deleteBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.deleteBookingFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking is deleted successfully',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getSingleBooking,
  getAllBookings,
  updateBooking,
  deleteBooking,
};
