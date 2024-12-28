import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { WindowServices } from './Window.service';

const createWindow = catchAsync(async (req, res) => {
  const { window: WindowData } = req.body;
  const result = await WindowServices.createWindowIntoDB(WindowData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Window is created successfully',
    data: result,
  });
});

const getSingleWindow = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await WindowServices.getSingleWindowFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Window is retrieved successfully',
    data: result,
  });
});

const getAllWindows = catchAsync(async (req, res) => {
  const result = await WindowServices.getAllWindowsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Windows are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateWindow = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { window: WindowData } = req.body;
  const result = await WindowServices.updateWindowIntoDB(id, WindowData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Window is updated successfully',
    data: result,
  });
});

const deleteWindow = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await WindowServices.deleteWindowFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Window is deleted successfully',
    data: result,
  });
});

export const WindowControllers = {
  createWindow,
  getSingleWindow,
  getAllWindows,
  updateWindow,
  deleteWindow,
};
