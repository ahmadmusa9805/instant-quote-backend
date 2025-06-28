import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AvailabilityServices } from './Availability.service';

const createAvailability = catchAsync(async (req, res) => {
  const availabilityData = req.body;
  const result = await AvailabilityServices.createAvailabilityIntoDB(availabilityData, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Availability is created successfully',
    data: result,
  });
});

const getSingleAvailability = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AvailabilityServices.getSingleAvailabilityFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Availability is retrieved successfully',
    data: result,
  });
});
const getAvailability = catchAsync(async (req, res) => {
  const result = await AvailabilityServices.getAvailabilityFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Availability is retrieved successfully',
    data: result,
  });
});
const getCalenderAvailability = catchAsync(async (req, res) => {
    const year = parseInt(req.query.year as string);
  const month = parseInt(req.query.month as string); // 0 = Jan, 6 = July

  if (isNaN(year) || isNaN(month)) {
    return res.status(400).json({ success: false, message: 'Invalid year or month' });
  }
  const result = await AvailabilityServices.getCalenderAvailabilityFromDB(month, year, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Availability is retrieved successfully',
    data: result,
  });
});

const getAllAvailabilitys = catchAsync(async (req, res) => {
  const result = await AvailabilityServices.getAllAvailabilitysFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Availabilitys are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateAvailability = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { Availability } = req.body;
  const result = await AvailabilityServices.updateAvailabilityIntoDB(id, Availability);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Availability is updated successfully',
    data: result,
  });
});

const deleteAvailability = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AvailabilityServices.deleteAvailabilityFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Availability is deleted successfully',
    data: result,
  });
});

export const AvailabilityControllers = {
  createAvailability,
  getSingleAvailability,
  getAllAvailabilitys,
  updateAvailability,
  deleteAvailability,
  getAvailability,
  getCalenderAvailability
};
