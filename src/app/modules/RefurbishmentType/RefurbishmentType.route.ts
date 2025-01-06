import express from 'express';
import { RefurbishmentTypeControllers } from './RefurbishmentType.controller';
// import validateRequest from '../../middlewares/validateRequest';
// import { createRefurbishmentTypeValidationSchema, updateRefurbishmentTypeValidationSchema } from './RefurbishmentType.validation';

const router = express.Router();

router.post(
  '/create-refurbishment-type',
  // validateRequest(createRefurbishmentTypeValidationSchema),
  RefurbishmentTypeControllers.createRefurbishmentType,
);

router.get(
  '/:id',
  RefurbishmentTypeControllers.getSingleRefurbishmentType,
);

router.patch(
  '/:id',
  // validateRequest(updateRefurbishmentTypeValidationSchema),
  RefurbishmentTypeControllers.updateRefurbishmentType,
);

router.delete(
  '/:id',
  RefurbishmentTypeControllers.deleteRefurbishmentType,
);

router.get(
  '/',
  RefurbishmentTypeControllers.getAllRefurbishmentTypes,
);

export const RefurbishmentTypeRoutes = router;
