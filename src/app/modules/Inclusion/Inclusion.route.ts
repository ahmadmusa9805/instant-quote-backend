import express from 'express';
import { InclusionControllers } from './Inclusion.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createInclusionValidationSchema, updateInclusionValidationSchema } from './Inclusion.validation';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-Inclusion',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  validateRequest(createInclusionValidationSchema),
  InclusionControllers.createInclusion,
);

router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  InclusionControllers.getSingleInclusion,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  validateRequest(updateInclusionValidationSchema),
  InclusionControllers.updateInclusion,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  InclusionControllers.deleteInclusion,
);

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  InclusionControllers.getAllInclusions,
);

export const InclusionRoutes = router;
