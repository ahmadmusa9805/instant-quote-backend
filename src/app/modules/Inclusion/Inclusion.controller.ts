import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { InclusionServices } from './Inclusion.service';

const createInclusion = catchAsync(async (req, res) => {
  const { inclusion: InclusionData } = req.body;
  const result = await InclusionServices.createInclusionIntoDB(InclusionData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Inclusion is created successfully',
    data: result,
  });
});

const getSingleInclusion = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await InclusionServices.getSingleInclusionFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Inclusion is retrieved successfully',
    data: result,
  });
});

const getAllInclusions = catchAsync(async (req, res) => {
  const result = await InclusionServices.getAllInclusionsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Inclusions are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateInclusion = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { inclusion: InclusionData } = req.body;
  const result = await InclusionServices.updateInclusionIntoDB(id, InclusionData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Inclusion is updated successfully',
    data: result,
  });
});

const deleteInclusion = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await InclusionServices.deleteInclusionFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Inclusion is deleted successfully',
    data: result,
  });
});

export const InclusionControllers = {
  createInclusion,
  getSingleInclusion,
  getAllInclusions,
  updateInclusion,
  deleteInclusion,
};
