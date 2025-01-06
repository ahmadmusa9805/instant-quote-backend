import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RefurbishmentTypeServices } from './RefurbishmentType.service';

const createRefurbishmentType = catchAsync(async (req, res) => {
  const { refurbishmentType: RefurbishmentTypeData } = req.body;
  const result = await RefurbishmentTypeServices.createRefurbishmentTypeIntoDB(RefurbishmentTypeData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'RefurbishmentType is created successfully',
    data: result,
  });
});

const getSingleRefurbishmentType = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RefurbishmentTypeServices.getSingleRefurbishmentTypeFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'RefurbishmentType is retrieved successfully',
    data: result,
  });
});

const getAllRefurbishmentTypes = catchAsync(async (req, res) => {
  const result = await RefurbishmentTypeServices.getAllRefurbishmentTypesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'RefurbishmentTypes are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateRefurbishmentType = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { refurbishmentType: RefurbishmentType } = req.body;
  const result = await RefurbishmentTypeServices.updateRefurbishmentTypeIntoDB(id, RefurbishmentType);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'RefurbishmentType is updated successfully',
    data: result,
  });
});

const deleteRefurbishmentType = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RefurbishmentTypeServices.deleteRefurbishmentTypeFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'RefurbishmentType is deleted successfully',
    data: result,
  });
});

export const RefurbishmentTypeControllers = {
  createRefurbishmentType,
  getSingleRefurbishmentType,
  getAllRefurbishmentTypes,
  updateRefurbishmentType,
  deleteRefurbishmentType,
};
