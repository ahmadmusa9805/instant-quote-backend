import express from 'express';
import { RefurbishmentSizeControllers } from './RefurbishmentSize.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createRefurbishmentSizeValidationSchema, updateRefurbishmentSizeValidationSchema } from './RefurbishmentSize.validation';

const router = express.Router();

router.post(
  '/create-RefurbishmentSize',
  validateRequest(createRefurbishmentSizeValidationSchema),
  RefurbishmentSizeControllers.createRefurbishmentSize,
);

// Other route methods...
