import express from 'express';
import { ExtendSizeControllers } from './ExtendSize.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createExtendSizeValidationSchema, updateExtendSizeValidationSchema } from './ExtendSize.validation';

const router = express.Router();

router.post(
  '/create-extend-size',
  validateRequest(createExtendSizeValidationSchema),
  ExtendSizeControllers.createExtendSize,
);

router.get(
  '/:id',
  ExtendSizeControllers.getSingleExtendSize,
);

router.patch(
  '/:id',
  validateRequest(updateExtendSizeValidationSchema),
  ExtendSizeControllers.updateExtendSize,
);

router.delete(
  '/:id',
  ExtendSizeControllers.deleteExtendSize,
);

router.get(
  '/',
  ExtendSizeControllers.getAllExtendSizes,
);

export const ExtendSizeRoutes = router;
