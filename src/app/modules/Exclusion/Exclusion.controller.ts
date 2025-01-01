import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ExclusionServices } from './Exclusion.service';

const createExclusion = catchAsync(async (req, res) => {
  const { exclusion: ExclusionData } = req.body;
  const result = await ExclusionServices.createExclusionIntoDB(ExclusionData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Exclusion is created successfully',
    data: result,
  });
});

const getSingleExclusion = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ExclusionServices.getSingleExclusionFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Exclusion is retrieved successfully',
    data: result,
  });
});

const getAllExclusions = catchAsync(async (req, res) => {
  const result = await ExclusionServices.getAllExclusionsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Exclusions are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateExclusion = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { exclusion: Exclusion } = req.body;
  const result = await ExclusionServices.updateExclusionIntoDB(id, Exclusion);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Exclusion is updated successfully',
    data: result,
  });
});

const deleteExclusion = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ExclusionServices.deleteExclusionFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Exclusion is deleted successfully',
    data: result,
  });
});

export const ExclusionControllers = {
  createExclusion,
  getSingleExclusion,
  getAllExclusions,
  updateExclusion,
  deleteExclusion,
};
