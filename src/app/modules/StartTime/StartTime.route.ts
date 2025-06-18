import express from 'express';
import { StartTimeControllers } from './StartTime.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createStartTimeValidationSchema, updateStartTimeValidationSchema } from './StartTime.validation';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-start-time',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  validateRequest(createStartTimeValidationSchema),
  StartTimeControllers.createStartTime,
);

router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  StartTimeControllers.getSingleStartTime,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  validateRequest(updateStartTimeValidationSchema),
  StartTimeControllers.updateStartTime,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  StartTimeControllers.deleteStartTime,
);

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  StartTimeControllers.getAllStartTimes,
);

export const StartTimeRoutes = router;
