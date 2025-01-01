/* eslint-disable no-undef */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { QuoteServices } from './quote.service';

const createQuote = catchAsync(async (req, res) => {
  const { quote: quoteData } = req.body;
  const result = await QuoteServices.createQuoteIntoDB(quoteData, req.file);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Quote is created successfully',
    data: result,
  });
});

const getSingleStartTime = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await QuoteServices.getSingleQuoteFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Quote is retrieved successfully',
    data: result,
  });
});

const getAllStartTimes = catchAsync(async (req, res) => {
  const result = await QuoteServices.getAllQuotesFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Quote are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});
export const QuoteControllers = {
  createQuote,
  getSingleStartTime,
  getAllStartTimes,
};
