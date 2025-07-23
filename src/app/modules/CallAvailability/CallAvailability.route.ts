import express from 'express';
import { CallAvailabilityControllers } from './CallAvailability.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createCallAvailabilityValidationSchema, updateCallAvailabilityValidationSchema } from './CallAvailability.validation';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-call-availability',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  validateRequest(createCallAvailabilityValidationSchema),
  CallAvailabilityControllers.createCallAvailability,
);

router.get(
  '/get-availability',
    auth(USER_ROLE.superAdmin, USER_ROLE.subscriber, USER_ROLE.admin, USER_ROLE.client),
  CallAvailabilityControllers.getAvailability,
);

router.get(
  '/calender-availability',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber, USER_ROLE.client),
  CallAvailabilityControllers.getCalenderAvailability,
);

router.get(
  '/:id',
  CallAvailabilityControllers.getSingleCallAvailability,
);

router.patch(
  '/:id',
  validateRequest(updateCallAvailabilityValidationSchema),
  CallAvailabilityControllers.updateCallAvailability,
);

router.delete(
  '/:id',
  CallAvailabilityControllers.deleteCallAvailability,
);

router.get(
  '/',
  CallAvailabilityControllers.getAllCallAvailabilitys,
);

export const CallAvailabilityRoutes = router;
