import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createRefurbishmentSizeValidationSchema } from './RefurbishmentSize.validation';
import { RefurbishmentSizeControllers } from './RefurbishmentSize.controller';
// import validateRequest from '../../middlewares/validateRequest';
// import { createRefurbishmentTypeValidationSchema, updateRefurbishmentTypeValidationSchema } from './RefurbishmentType.validation';

const router = express.Router();

router.post(
  '/create-refurbishment-size',
  validateRequest(createRefurbishmentSizeValidationSchema),
  RefurbishmentSizeControllers.createRefurbishmentSize,
);

router.get(
  '/:id',
  RefurbishmentSizeControllers.getSingleRefurbishmentSize,
);

router.patch(
  '/:id',
  // validateRequest(updateRefurbishmentTypeValidationSchema),
  RefurbishmentSizeControllers.updateRefurbishmentSize,
);

router.delete(
  '/:id',
  RefurbishmentSizeControllers.deleteRefurbishmentSize,
);

router.get(
  '/',
  RefurbishmentSizeControllers.getAllRefurbishmentSizes,
);

export const RefurbishmentSizeRoutes = router;
