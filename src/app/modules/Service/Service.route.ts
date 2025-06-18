import express from 'express';
import { ServiceControllers } from './Service.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createServiceValidationSchema, updateServiceValidationSchema } from './Service.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/create-Service',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  validateRequest(createServiceValidationSchema),
  ServiceControllers.createService,
);

router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  ServiceControllers.getSingleService,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  validateRequest(updateServiceValidationSchema),
  ServiceControllers.updateService,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  ServiceControllers.deleteService,
);

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  ServiceControllers.getAllServices,
);

export const ServiceRoutes = router;
