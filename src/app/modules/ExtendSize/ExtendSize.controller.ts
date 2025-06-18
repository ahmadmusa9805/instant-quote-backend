import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ExtendSizeServices } from './ExtendSize.service';

const createExtendSize = catchAsync(async (req, res) => {
  const { extendSize: ExtendSizeData } = req.body;
  const result = await ExtendSizeServices.createExtendSizeIntoDB(ExtendSizeData, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'ExtendSize is created successfully',
    data: result,
  });
});

const getSingleExtendSize = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ExtendSizeServices.getSingleExtendSizeFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'ExtendSize is retrieved successfully',
    data: result,
  });
});

const getAllExtendSizes = catchAsync(async (req, res) => {
  const result = await ExtendSizeServices.getAllExtendSizesFromDB(req.query, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'ExtendSizes are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateExtendSize = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { extendSize } = req.body;
  const result = await ExtendSizeServices.updateExtendSizeIntoDB(id, extendSize);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'ExtendSize is updated successfully',
    data: result,
  });
});

const deleteExtendSize = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ExtendSizeServices.deleteExtendSizeFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'ExtendSize is deleted successfully',
    data: result,
  });
});

export const ExtendSizeControllers = {
  createExtendSize,
  getSingleExtendSize,
  getAllExtendSizes,
  updateExtendSize,
  deleteExtendSize,
};
