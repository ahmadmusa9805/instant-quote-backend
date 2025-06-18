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

const getSingleQuote = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await QuoteServices.getSingleQuoteFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Quote is retrieved successfully',
    data: result,
  });
});
const quoteReadStateUpdate = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { quote: quoteData } = req.body;
  const result = await QuoteServices.quoteReadStateUpdateFromDB(id, quoteData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Quote Read State update successfully',
    data: result,
  });
});

const getAllQuotes = catchAsync(async (req, res) => {
  const result = await QuoteServices.getAllQuotesFromDB(req.query, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Quotes are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});
const getAllQuotesByUser = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await QuoteServices.getAllQuotesByUserFromDB(req.query, id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Quotes are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});
const getAllQuotesElements = catchAsync(async (req, res) => {

  const result = await QuoteServices.getAllQuotesElementsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Quotes are retrieved successfully',
    data: result,
  });
});

const updateQuote = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { quote: quoteData } = req.body;

  const result = await QuoteServices.updateQuoteIntoDB(id, quoteData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Quote is updated successfully',
    data: result,
  });
});

const deleteQuote = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await QuoteServices.deleteQuoteFromDB(id, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Quote is deleted successfully',
    data: result,
  });
});
export const QuoteControllers = {
  createQuote,
  deleteQuote,
  getSingleQuote,
  getAllQuotes,
  updateQuote,
  getAllQuotesByUser,
  getAllQuotesElements,
  quoteReadStateUpdate
};
