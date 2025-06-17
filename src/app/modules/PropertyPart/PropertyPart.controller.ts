import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { PropertyPartServices } from './PropertyPart.service';

const createPropertyPart = catchAsync(async (req, res) => {
  const { propertyPart: PropertyPartData } = req.body;
  const result = await PropertyPartServices.createPropertyPartIntoDB(PropertyPartData, req.file);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'PropertyPart is created successfully',
    data: result,
  });
});

const getSinglePropertyPart = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PropertyPartServices.getSinglePropertyPartFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'PropertyPart is retrieved successfully',
    data: result,
  });
});

const getAllPropertyParts = catchAsync(async (req, res) => {
  const result = await PropertyPartServices.getAllPropertyPartsFromDB(req.query, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'PropertyParts are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const updatePropertyPart = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { propertyPart: PropertyPartData } = req.body;
  const result = await PropertyPartServices.updatePropertyPartIntoDB(id, PropertyPartData, req.file);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'PropertyPart is updated successfully',
    data: result,
  });
});

const deletePropertyPart = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await PropertyPartServices.deletePropertyPartFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'PropertyPart is deleted successfully',
    data: result,
  });
});

export const PropertyPartControllers = {
  createPropertyPart,
  getSinglePropertyPart,
  getAllPropertyParts,
  updatePropertyPart,
  deletePropertyPart,
};
