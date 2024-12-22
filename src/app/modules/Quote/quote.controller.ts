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

const createJudge = catchAsync(async (req, res) => {
  // const { judge: judgeData } = req.body;
  // const result = await QuoteServices.createJudgeIntoDB(judgeData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Judge is created succesfully',
    data: "",
  });
});

const createAdmin = catchAsync(async (req, res) => {
  // const { admin: adminData } = req.body;
  // const result = await QuoteServices.createAdminIntoDB(adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: '',
  });
});

const getMe = catchAsync(async (req, res) => {
  const { userEmail, role } = req.user;

  const result = await QuoteServices.getMe(userEmail, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved succesfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await QuoteServices.getAllUsersFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users are retrieved succesfully',
    meta: result.meta,
    data: result.result,
  });
});

const changeStatus = catchAsync(async (req, res) => {
  const id = req.params.id;

  const result = await QuoteServices.changeStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status is updated succesfully',
    data: result,
  });
});
export const QuoteControllers = {
  createQuote,
  createJudge,
  createAdmin,
  getMe,
  changeStatus,
  getAllUsers
};
