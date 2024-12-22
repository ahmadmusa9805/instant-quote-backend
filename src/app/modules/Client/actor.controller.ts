/* eslint-disable no-undef */
import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ActorServices } from './actor.service';

const getSingleActor = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ActorServices.getSingleActorFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Actor is retrieved succesfully',
    data: result,
  });
});

const getAllActors: RequestHandler = catchAsync(async (req, res) => {
  const result = await ActorServices.getAllActorsFromDB(req.query); 

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Actors are retrieved succesfully',
    meta: result.meta,
    data: result.result,
  });
});

const updateActor = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { actor: actorData } = req.body;
  
  const result = await ActorServices.updateActorIntoDB(id, req.files, actorData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Actor is updated succesfully',
    data: result,
  });
});

const deleteActor = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ActorServices.deleteActorFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Actor is deleted succesfully',
    data: result,
  });
});

const getCompetitionAverageRatings = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ActorServices.getCompetitionAverageRatingsFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'CompetitionAverageRatings is retrieved succesfully',
    data: result,
  });
});
const getAllComments = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ActorServices.getAllCommentsFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Comments is retrieved succesfully',
    data: result,
  });
});

export const ActorControllers = {
  getAllActors,
  getSingleActor,
  deleteActor,
  updateActor,
  getCompetitionAverageRatings,
  getAllComments
};
