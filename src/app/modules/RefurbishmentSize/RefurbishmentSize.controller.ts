import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RefurbishmentSizeServices } from './RefurbishmentSize.service';

const createRefurbishmentSize = catchAsync(async (req, res) => {
  const { refurbishmentSize: RefurbishmentSizeData } = req.body;
  const result = await RefurbishmentSizeServices.createRefurbishmentSizeIntoDB(RefurbishmentSizeData, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'RefurbishmentType is created successfully',
    data: result,
  });
});

const getSingleRefurbishmentSize = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RefurbishmentSizeServices.getSingleRefurbishmentSizeFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'RefurbishmentType is retrieved successfully',
    data: result,
  });
});

const getAllRefurbishmentSizes = catchAsync(async (req, res) => {
  const result = await RefurbishmentSizeServices.getAllRefurbishmentSizesFromDB(req.query, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'RefurbishmentTypes are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateRefurbishmentSize = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { refurbishmentSize: RefurbishmentSize } = req.body;
  const result = await RefurbishmentSizeServices.updateRefurbishmentSizeIntoDB(id, RefurbishmentSize);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'RefurbishmentType is updated successfully',
    data: result,
  });
});

const deleteRefurbishmentSize = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RefurbishmentSizeServices.deleteRefurbishmentSizeFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'RefurbishmentType is deleted successfully',
    data: result,
  });
});

export const RefurbishmentSizeControllers = {
  createRefurbishmentSize,
getSingleRefurbishmentSize,
getAllRefurbishmentSizes,
updateRefurbishmentSize,
deleteRefurbishmentSize,
};
