import express from 'express';
import { ExclusionControllers } from './Exclusion.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createExclusionValidationSchema, updateExclusionValidationSchema } from './Exclusion.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/create-Exclusion',
   auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  validateRequest(createExclusionValidationSchema),
  ExclusionControllers.createExclusion,
);

router.get(
  '/:id',
   auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  ExclusionControllers.getSingleExclusion,
);

router.patch(
  '/:id',
   auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  validateRequest(updateExclusionValidationSchema),
  ExclusionControllers.updateExclusion,
);

router.delete(
  '/:id',
   auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  ExclusionControllers.deleteExclusion,
);

router.get(
  '/',
   auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  ExclusionControllers.getAllExclusions,
);

export const ExclusionRoutes = router;
