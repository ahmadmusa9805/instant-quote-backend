import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FinishLevelServices } from './FinishLevel.service';

const createFinishLevel = catchAsync(async (req, res) => {
  const { finishLevel: FinishLevelData } = req.body;
  const result = await FinishLevelServices.createFinishLevelIntoDB(FinishLevelData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FinishLevel is created successfully',
    data: result,
  });
});

const getSingleFinishLevel = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FinishLevelServices.getSingleFinishLevelFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FinishLevel is retrieved successfully',
    data: result,
  });
});

const getAllFinishLevels = catchAsync(async (req, res) => {
  const result = await FinishLevelServices.getAllFinishLevelsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FinishLevels are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateFinishLevel = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { finishLevel: FinishLevel } = req.body;
  const result = await FinishLevelServices.updateFinishLevelIntoDB(id, FinishLevel);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FinishLevel is updated successfully',
    data: result,
  });
});

const deleteFinishLevel = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FinishLevelServices.deleteFinishLevelFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'FinishLevel is deleted successfully',
    data: result,
  });
});

export const FinishLevelControllers = {
  createFinishLevel,
  getSingleFinishLevel,
  getAllFinishLevels,
  updateFinishLevel,
  deleteFinishLevel,
};
