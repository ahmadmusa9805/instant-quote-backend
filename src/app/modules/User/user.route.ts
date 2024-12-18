/* eslint-disable @typescript-eslint/no-explicit-any */

import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { createActorValidationSchema } from '../Client/actor.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import { USER_ROLE } from './user.constant';
import { UserControllers } from './user.controller';
import { UserValidation } from './user.validation';

const router = express.Router();
router.post(
  '/create-actor',
  validateRequest(createActorValidationSchema),
  UserControllers.createActor,
);


router.post(
  '/create-admin',
  auth(USER_ROLE.superAdmin),
  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
);

router.get(
  '/me',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.actor, USER_ROLE.judge),
  UserControllers.getMe,
);

router.post(
  '/change-status/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changeStatus,
);

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.actor, USER_ROLE.judge),
  UserControllers.getAllUsers,
);

export const UserRoutes = router;
