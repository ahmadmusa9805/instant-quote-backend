import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CommentServices } from './comment.service';

const createComment = catchAsync(async (req, res) => {
  const { comment: commentData } = req.body;
  const result = await CommentServices.createCommentIntoDB(commentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment is created successfully',
    data: result,
  });
});

const getSingleComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CommentServices.getSingleCommentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment is retrieved successfully',
    data: result,
  });
});

const getAllComments = catchAsync(async (req, res) => {
  const result = await CommentServices.getAllCommentsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comments are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  const result = await CommentServices.updateCommentIntoDB(id, comment);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment is updated successfully',
    data: result,
  });
});

const deleteComment = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CommentServices.deleteCommentFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment is deleted successfully',
    data: result,
  });
});

export const CommentControllers = {
  createComment,
  getSingleComment,
  getAllComments,
  updateComment,
  deleteComment,
};
