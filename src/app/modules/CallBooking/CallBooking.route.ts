import express from 'express';
import { CallBookingControllers } from './CallBooking.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createCallBookingValidationSchema, updateCallBookingValidationSchema } from './CallBooking.validation';
import { USER_ROLE } from '../User/user.constant';
import auth from '../../middlewares/auth';

const router = express.Router();

router.post(
  '/create-call-booking',
    auth(USER_ROLE.superAdmin, USER_ROLE.client),
  validateRequest(createCallBookingValidationSchema),
  CallBookingControllers.createCallBooking,
);

router.get(
  '/:id',
  CallBookingControllers.getSingleCallBooking,
);

router.patch(
  '/:id',
  validateRequest(updateCallBookingValidationSchema),
  CallBookingControllers.updateCallBooking,
);

router.delete(
  '/:id',
  CallBookingControllers.deleteCallBooking,
);

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.subscriber, USER_ROLE.admin, USER_ROLE.client),
  CallBookingControllers.getAllCallBookings,
);
router.get(
  '/user/:id',
  CallBookingControllers.getAllCallBookingsByUser,
);

export const CallBookingRoutes = router;
