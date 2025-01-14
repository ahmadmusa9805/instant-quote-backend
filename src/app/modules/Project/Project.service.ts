/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { PROJECT_SEARCHABLE_FIELDS } from './Project.constant';
import mongoose from 'mongoose';
import { Project } from './Project.model';

const createProjectIntoDB = async (
  payload: any, file: any
) => {

  if (file) {

    payload.img = file.location as string;
  }


  const result = await Project.create(payload);
  
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create Project');
  }

  return result;
};

const getAllProjectsFromDB = async (query: Record<string, unknown>) => {
  const ProjectQuery = new QueryBuilder(
    Project.find({isDeleted: false}),
    query,
  )
    .search(PROJECT_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await ProjectQuery.modelQuery;
  const meta = await ProjectQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleProjectFromDB = async (id: string) => {
  const result = await Project.findOne({id, isDeleted: false});

  return result;
};

const updateProjectIntoDB = async (id: string, payload: any) => {
  const isDeletedService = await mongoose.connection
    .collection('projects')
    .findOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { projection: { isDeleted: 1, title: 1 } },
    );

  if (!isDeletedService?.title) {
    throw new Error('Project not found');
  }

  if (isDeletedService.isDeleted) {
    throw new Error('Cannot update a deleted Project');
  }

  const updatedData = await Project.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedData) {
    throw new Error('Project not found after update');
  }

  return updatedData;
};

const deleteProjectFromDB = async (id: string) => {
  const deletedService = await Project.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Project');
  }

  return deletedService;
};

export const ProjectServices = {
  createProjectIntoDB,
  getAllProjectsFromDB,
  getSingleProjectFromDB,
  updateProjectIntoDB,
  deleteProjectFromDB,
};
