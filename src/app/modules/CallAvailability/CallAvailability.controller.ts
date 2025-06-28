import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CallAvailabilityServices } from './CallAvailability.service';

const createCallAvailability = catchAsync(async (req, res) => {
  const CallAvailabilityData = req.body;
  const result = await CallAvailabilityServices.createCallAvailabilityIntoDB(CallAvailabilityData, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'CallAvailability is created successfully',
    data: result,
  });
});

const getSingleCallAvailability = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CallAvailabilityServices.getSingleCallAvailabilityFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'CallAvailability is retrieved successfully',
    data: result,
  });
});

const getAvailability = catchAsync(async (req, res) => {
  const result = await CallAvailabilityServices.getAvailabilityFromDB();

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
  const result = await CallAvailabilityServices.getCalenderAvailabilityFromDB(month, year, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Availability is retrieved successfully',
    data: result,
  });
});

const getAllCallAvailabilitys = catchAsync(async (req, res) => {
  const result = await CallAvailabilityServices.getAllCallAvailabilitysFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'CallAvailabilitys are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateCallAvailability = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { callAvailability: CallAvailability } = req.body;
  const result = await CallAvailabilityServices.updateCallAvailabilityIntoDB(id, CallAvailability);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'CallAvailability is updated successfully',
    data: result,
  });
});

const deleteCallAvailability = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CallAvailabilityServices.deleteCallAvailabilityFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'CallAvailability is deleted successfully',
    data: result,
  });
});

export const CallAvailabilityControllers = {
  createCallAvailability,
  getSingleCallAvailability,
  getAllCallAvailabilitys,
  updateCallAvailability,
  deleteCallAvailability,
  getAvailability,
  getCalenderAvailability
};
