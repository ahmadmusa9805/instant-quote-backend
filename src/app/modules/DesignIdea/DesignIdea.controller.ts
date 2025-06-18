import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { DesignIdeaServices } from './DesignIdea.service';

const createDesignIdea = catchAsync(async (req, res) => {
  const { designIdea: DesignIdeaData } = req.body;
  const result = await DesignIdeaServices.createDesignIdeaIntoDB(DesignIdeaData, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'DesignIdea is created successfully',
    data: result,
  });
});

const getSingleDesignIdea = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DesignIdeaServices.getSingleDesignIdeaFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'DesignIdea is retrieved successfully',
    data: result,
  });
});

const getAllDesignIdeas = catchAsync(async (req, res) => {
  const result = await DesignIdeaServices.getAllDesignIdeasFromDB(req.query, req.user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'DesignIdeas are retrieved successfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateDesignIdea = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { designIdea: DesignIdea } = req.body;
  const result = await DesignIdeaServices.updateDesignIdeaIntoDB(id, DesignIdea);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'DesignIdea is updated successfully',
    data: result,
  });
});

const deleteDesignIdea = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await DesignIdeaServices.deleteDesignIdeaFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'DesignIdea is deleted successfully',
    data: result,
  });
});

export const DesignIdeaControllers = {
  createDesignIdea,
  getSingleDesignIdea,
  getAllDesignIdeas,
  updateDesignIdea,
  deleteDesignIdea,
};
