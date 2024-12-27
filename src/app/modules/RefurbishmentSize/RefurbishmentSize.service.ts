/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import QueryBuilder from '../../builder/QueryBuilder';
import AppError from '../../errors/AppError';
import { RefurbishmentSizeSearchableFields } from './RefurbishmentSize.constant';
import mongoose from 'mongoose';
import { TRefurbishmentSize } from './RefurbishmentSize.interface';
import { RefurbishmentSize } from './RefurbishmentSize.model';

// Service methods...
