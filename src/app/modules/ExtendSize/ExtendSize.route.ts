import express from 'express';
import { ExtendSizeControllers } from './ExtendSize.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createExtendSizeValidationSchema, updateExtendSizeValidationSchema } from './ExtendSize.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/create-extend-size',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  validateRequest(createExtendSizeValidationSchema),
  ExtendSizeControllers.createExtendSize,
);

router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  ExtendSizeControllers.getSingleExtendSize,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  validateRequest(updateExtendSizeValidationSchema),
  ExtendSizeControllers.updateExtendSize,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  ExtendSizeControllers.deleteExtendSize,
);

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  ExtendSizeControllers.getAllExtendSizes,
);

export const ExtendSizeRoutes = router;
