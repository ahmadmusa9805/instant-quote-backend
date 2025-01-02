import express from 'express';
import { CallBookingControllers } from './CallBooking.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createCallBookingValidationSchema, updateCallBookingValidationSchema } from './CallBooking.validation';

const router = express.Router();

router.post(
  '/create-call-booking',
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
  CallBookingControllers.getAllCallBookings,
);

export const CallBookingRoutes = router;
