import express from 'express';
import { ExclusionControllers } from './Exclusion.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createExclusionValidationSchema, updateExclusionValidationSchema } from './Exclusion.validation';

const router = express.Router();

router.post(
  '/create-Exclusion',
  validateRequest(createExclusionValidationSchema),
  ExclusionControllers.createExclusion,
);

router.get(
  '/:id',
  ExclusionControllers.getSingleExclusion,
);

router.patch(
  '/:id',
  validateRequest(updateExclusionValidationSchema),
  ExclusionControllers.updateExclusion,
);

router.delete(
  '/:id',
  ExclusionControllers.deleteExclusion,
);

router.get(
  '/',
  ExclusionControllers.getAllExclusions,
);

export const ExclusionRoutes = router;
