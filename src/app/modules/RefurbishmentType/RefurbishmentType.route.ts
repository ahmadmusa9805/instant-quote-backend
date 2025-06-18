import express from 'express';
import { RefurbishmentTypeControllers } from './RefurbishmentType.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../middlewares/validateRequest';
import { createRefurbishmentTypeValidationSchema, updateRefurbishmentTypeValidationSchema } from './RefurbishmentType.validation';

const router = express.Router();

router.post(
  '/create-refurbishment-type',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  validateRequest(createRefurbishmentTypeValidationSchema),
  RefurbishmentTypeControllers.createRefurbishmentType,
);

router.get(
  '/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  RefurbishmentTypeControllers.getSingleRefurbishmentType,
);

router.patch(
  '/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  validateRequest(updateRefurbishmentTypeValidationSchema),
  RefurbishmentTypeControllers.updateRefurbishmentType,
);

router.delete(
  '/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  RefurbishmentTypeControllers.deleteRefurbishmentType,
);

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  RefurbishmentTypeControllers.getAllRefurbishmentTypes,
);

export const RefurbishmentTypeRoutes = router;
