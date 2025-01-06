import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { WeDoServices } from './WeDo.service';

const createWeDo = catchAsync(async (req, res) => {
  const { weDo: WeDoData } = req.body;
  const result = await WeDoServices.createWeDoIntoDB(WeDoData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'WeDo is created successfully',
    data: result,
  });
});

const getSingleWeDo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await WeDoServices.getSingleWeDoFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'WeDo is retrieved successfully',
    data: result,
  });
});

const getAllWeDos = catchAsync(async (req, res) => {
  const result = await WeDoServices.getAllWeDosFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'WeDos are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateWeDo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { weDo } = req.body;
  const result = await WeDoServices.updateWeDoIntoDB(id, weDo);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'WeDo is updated successfully',
    data: result,
  });
});

const deleteWeDo = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await WeDoServices.deleteWeDoFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'WeDo is deleted successfully',
    data: result,
  });
});

export const WeDoControllers = {
  createWeDo,
  getSingleWeDo,
  getAllWeDos,
  updateWeDo,
  deleteWeDo,
};
