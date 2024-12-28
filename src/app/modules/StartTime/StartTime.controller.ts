import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { StartTimeServices } from './StartTime.service';

const createStartTime = catchAsync(async (req, res) => {
  const { startTime: StartTimeData } = req.body;
  const result = await StartTimeServices.createStartTimeIntoDB(StartTimeData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'StartTime is created successfully',
    data: result,
  });
});

const getSingleStartTime = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StartTimeServices.getSingleStartTimeFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'StartTime is retrieved successfully',
    data: result,
  });
});

const getAllStartTimes = catchAsync(async (req, res) => {
  const result = await StartTimeServices.getAllStartTimesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'StartTimes are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateStartTime = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { startTime: StartTimeData } = req.body;
  const result = await StartTimeServices.updateStartTimeIntoDB(id, StartTimeData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'StartTime is updated successfully',
    data: result,
  });
});

const deleteStartTime = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await StartTimeServices.deleteStartTimeFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'StartTime is deleted successfully',
    data: result,
  });
});

export const StartTimeControllers = {
  createStartTime,
  getSingleStartTime,
  getAllStartTimes,
  updateStartTime,
  deleteStartTime,
};
