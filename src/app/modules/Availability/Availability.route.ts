import express from 'express';
import { AvailabilityControllers } from './Availability.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createAvailabilityValidationSchema, updateAvailabilityValidationSchema } from './Availability.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/create-availability',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  validateRequest(createAvailabilityValidationSchema),
  AvailabilityControllers.createAvailability,
);

router.get(
  '/get-availability',
  AvailabilityControllers.getAvailability,
);
router.get(
  '/calender-availability',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber, USER_ROLE.client),
  AvailabilityControllers.getCalenderAvailability,
);
router.get(
  '/:id',
  AvailabilityControllers.getSingleAvailability,
);

router.patch(
  '/:id',
  validateRequest(updateAvailabilityValidationSchema),
  AvailabilityControllers.updateAvailability,
);

router.delete(
  '/:id',
  AvailabilityControllers.deleteAvailability,
);

router.get(
  '/',
  AvailabilityControllers.getAllAvailabilitys,
);

export const AvailabilityRoutes = router;
