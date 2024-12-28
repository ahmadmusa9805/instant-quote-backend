import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BathroomServices } from './Bathroom.service';

const createBathroom = catchAsync(async (req, res) => {
  const { bathroom: BathroomData } = req.body;

  const result = await BathroomServices.createBathroomIntoDB(BathroomData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bathroom is created successfully',
    data: result,
  });
});

const getSingleBathroom = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BathroomServices.getSingleBathroomFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bathroom is retrieved successfully',
    data: result,
  });
});

const getAllBathrooms = catchAsync(async (req, res) => {
  const result = await BathroomServices.getAllBathroomsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bathrooms are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateBathroom = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { bathroom: BathroomData } = req.body;
  const result = await BathroomServices.updateBathroomIntoDB(id, BathroomData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bathroom is updated successfully',
    data: result,
  });
});

const deleteBathroom = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BathroomServices.deleteBathroomFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bathroom is deleted successfully',
    data: result,
  });
});

export const BathroomControllers = {
  createBathroom,
  getSingleBathroom,
  getAllBathrooms,
  updateBathroom,
  deleteBathroom,
};
