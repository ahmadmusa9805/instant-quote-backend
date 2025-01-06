import express from 'express';
import { BathroomControllers } from './Bathroom.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createBathroomValidationSchema, updateBathroomValidationSchema } from './Bathroom.validation';

const router = express.Router();

router.post(
  '/create-bathroom',
  validateRequest(createBathroomValidationSchema),
  BathroomControllers.createBathroom,
);

router.get(
  '/:id',
  BathroomControllers.getSingleBathroom,
);

router.patch(
  '/:id',
  validateRequest(updateBathroomValidationSchema),
  BathroomControllers.updateBathroom,
);

router.delete(
  '/:id',
  BathroomControllers.deleteBathroom,
);

router.get(
  '/',
  BathroomControllers.getAllBathrooms,
);

export const BathroomRoutes = router;
