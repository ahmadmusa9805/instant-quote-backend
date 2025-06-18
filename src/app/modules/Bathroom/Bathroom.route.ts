import express from 'express';
import { BathroomControllers } from './Bathroom.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createBathroomValidationSchema, updateBathroomValidationSchema } from './Bathroom.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/create-bathroom',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  validateRequest(createBathroomValidationSchema),
  BathroomControllers.createBathroom,
);

router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  BathroomControllers.getSingleBathroom,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  validateRequest(updateBathroomValidationSchema),
  BathroomControllers.updateBathroom,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  BathroomControllers.deleteBathroom,
);

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  BathroomControllers.getAllBathrooms,
);

export const BathroomRoutes = router;
