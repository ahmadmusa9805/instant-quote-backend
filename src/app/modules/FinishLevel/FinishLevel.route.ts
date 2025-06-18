import express from 'express';
import { FinishLevelControllers } from './FinishLevel.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createFinishLevelValidationSchema, updateFinishLevelValidationSchema } from './FinishLevel.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/create-finish-level',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  validateRequest(createFinishLevelValidationSchema),
  FinishLevelControllers.createFinishLevel,
);

router.get(
  '/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  FinishLevelControllers.getSingleFinishLevel,
);

router.patch(
  '/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  validateRequest(updateFinishLevelValidationSchema),
  FinishLevelControllers.updateFinishLevel,
);

router.delete(
  '/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  FinishLevelControllers.deleteFinishLevel,
);

router.get(
  '/',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  FinishLevelControllers.getAllFinishLevels,
);

export const FinishLevelRoutes = router;
