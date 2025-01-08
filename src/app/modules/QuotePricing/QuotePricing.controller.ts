import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { QuotePricingServices } from './QuotePricing.service';

const createQuotePricing = catchAsync(async (req, res) => {
  const { quotePricing: QuotePricingData } = req.body;
  const result = await QuotePricingServices.createQuotePricingIntoDB(QuotePricingData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'QuotePricing is created successfully',
    data: result,
  });
});

const getSingleQuotePricing = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await QuotePricingServices.getSingleQuotePricingFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'QuotePricing is retrieved successfully',
    data: result,
  });
});

const getAllQuotePricings = catchAsync(async (req, res) => {
  const result = await QuotePricingServices.getAllQuotePricingsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'QuotePricings are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateQuotePricing = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { QuotePricing } = req.body;
  const result = await QuotePricingServices.updateQuotePricingIntoDB(id, QuotePricing);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'QuotePricing is updated successfully',
    data: result,
  });
});

const deleteQuotePricing = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await QuotePricingServices.deleteQuotePricingFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'QuotePricing is deleted successfully',
    data: result,
  });
});

export const QuotePricingControllers = {
  createQuotePricing,
  getSingleQuotePricing,
  getAllQuotePricings,
  updateQuotePricing,
  deleteQuotePricing,
};
