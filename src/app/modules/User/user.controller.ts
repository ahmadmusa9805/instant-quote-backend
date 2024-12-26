/* eslint-disable no-undef */
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createActor = catchAsync(async (req, res) => {
  const { actor: actorData } = req.body;
  const result = await UserServices.createActorIntoDB(actorData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Actor is created successfully',
    data: result,
  });
});

// const createJudge = catchAsync(async (req, res) => {
//   const { judge: judgeData } = req.body;
//   const result = await UserServices.createJudgeIntoDB(judgeData);

//   sendResponse(res, {
//     statusCode: httpStatus.OK,
//     success: true,
//     message: 'Judge is created succesfully',
//     data: result,
//   });
// });

const createAdmin = catchAsync(async (req, res) => {
  const { admin: adminData } = req.body;
  const result = await UserServices.createAdminIntoDB(adminData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is created succesfully',
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const { userEmail, role } = req.user;

  const result = await UserServices.getMe(userEmail, role);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User is retrieved succesfully',
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUsersFromDB(req.query);

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

  const result = await UserServices.changeStatus(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Status is updated succesfully',
    data: result,
  });
});
export const UserControllers = {
  createActor,
  // createJudge,
  createAdmin,
  getMe,
  changeStatus,
  getAllUsers
};
