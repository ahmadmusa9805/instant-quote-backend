import express from 'express';
import { CallAvailabilityControllers } from './CallAvailability.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createCallAvailabilityValidationSchema, updateCallAvailabilityValidationSchema } from './CallAvailability.validation';

const router = express.Router();

router.post(
  '/create-call-availability',
  validateRequest(createCallAvailabilityValidationSchema),
  CallAvailabilityControllers.createCallAvailability,
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
