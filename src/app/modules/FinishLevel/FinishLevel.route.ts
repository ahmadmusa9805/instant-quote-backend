import express from 'express';
import { FinishLevelControllers } from './FinishLevel.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createFinishLevelValidationSchema, updateFinishLevelValidationSchema } from './FinishLevel.validation';

const router = express.Router();

router.post(
  '/create-finish-level',
  validateRequest(createFinishLevelValidationSchema),
  FinishLevelControllers.createFinishLevel,
);

router.get(
  '/:id',
  FinishLevelControllers.getSingleFinishLevel,
);

router.patch(
  '/:id',
  validateRequest(updateFinishLevelValidationSchema),
  FinishLevelControllers.updateFinishLevel,
);

router.delete(
  '/:id',
  FinishLevelControllers.deleteFinishLevel,
);

router.get(
  '/',
  FinishLevelControllers.getAllFinishLevels,
);

export const FinishLevelRoutes = router;
