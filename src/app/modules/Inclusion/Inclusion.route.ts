import express from 'express';
import { InclusionControllers } from './Inclusion.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createInclusionValidationSchema, updateInclusionValidationSchema } from './Inclusion.validation';

const router = express.Router();

router.post(
  '/create-Inclusion',
  validateRequest(createInclusionValidationSchema),
  InclusionControllers.createInclusion,
);

router.get(
  '/:id',
  InclusionControllers.getSingleInclusion,
);

router.patch(
  '/:id',
  validateRequest(updateInclusionValidationSchema),
  InclusionControllers.updateInclusion,
);

router.delete(
  '/:id',
  InclusionControllers.deleteInclusion,
);

router.get(
  '/',
  InclusionControllers.getAllInclusions,
);

export const InclusionRoutes = router;
