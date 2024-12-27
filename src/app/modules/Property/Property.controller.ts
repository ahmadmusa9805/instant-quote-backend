import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PropertyServices } from './Property.service';

const createProperty = catchAsync(async (req, res) => {
  const { property: PropertyData } = req.body;
  const result = await PropertyServices.createPropertyIntoDB(PropertyData, req.file);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Property is created successfully',
    data: result,
  });
});

const getSingleProperty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PropertyServices.getSinglePropertyFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Property is retrieved successfully',
    data: result,
  });
});

const getAllPropertys = catchAsync(async (req, res) => {
  const result = await PropertyServices.getAllPropertiesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Propertys are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateProperty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { property: Property } = req.body;

  const result = await PropertyServices.updatePropertyIntoDB(id, Property);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Property is updated successfully',
    data: result,
  });
});

const deleteProperty = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PropertyServices.deletePropertyFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Property is deleted successfully',
    data: result,
  });
});

export const PropertyControllers = {
  createProperty,
  getSingleProperty,
  getAllPropertys,
  updateProperty,
  deleteProperty,
};
