/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { QUOTEPRICING_SEARCHABLE_FIELDS } from './QuotePricing.constant';
import mongoose from 'mongoose';
import { TQuotePricing } from './QuotePricing.interface';
import { QuotePricing } from './QuotePricing.model';

const createQuotePricingIntoDB = async (
  payload: TQuotePricing,
) => {
  const result = await QuotePricing.create(payload);
  
  if (!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create QuotePricing');
  }

  return result;
};

const getAllQuotePricingsFromDB = async (query: Record<string, unknown>) => {
  const QuotePricingQuery = new QueryBuilder(
    QuotePricing.find(),
    query,
  )
    .search(QUOTEPRICING_SEARCHABLE_FIELDS)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await QuotePricingQuery.modelQuery;
  const meta = await QuotePricingQuery.countTotal();
  return {
    result,
    meta,
  };
};

const getSingleQuotePricingFromDB = async (id: string) => {
  const result = await QuotePricing.findById(id);

  return result;
};

const updateQuotePricingIntoDB = async (id: string, payload: any) => {
  const isDeletedService = await mongoose.connection
    .collection('quotepricings')
    .findOne(
      { _id: new mongoose.Types.ObjectId(id) },
      { projection: { isDeleted: 1, name: 1 } },
    );

  if (!isDeletedService?.name) {
    throw new Error('QuotePricing not found');
  }

  if (isDeletedService.isDeleted) {
    throw new Error('Cannot update a deleted QuotePricing');
  }

  const updatedData = await QuotePricing.findByIdAndUpdate(
    { _id: id },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedData) {
    throw new Error('QuotePricing not found after update');
  }

  return updatedData;
};

const deleteQuotePricingFromDB = async (id: string) => {
  const deletedService = await QuotePricing.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedService) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete QuotePricing');
  }

  return deletedService;
};

export const QuotePricingServices = {
  createQuotePricingIntoDB,
  getAllQuotePricingsFromDB,
  getSingleQuotePricingFromDB,
  updateQuotePricingIntoDB,
  deleteQuotePricingFromDB,
};
