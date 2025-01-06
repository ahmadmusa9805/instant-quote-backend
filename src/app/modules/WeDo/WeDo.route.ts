import express from 'express';
import { WeDoControllers } from './WeDo.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createWeDoValidationSchema, updateWeDoValidationSchema } from './WeDo.validation';

const router = express.Router();

router.post(
  '/create-we-do',
  validateRequest(createWeDoValidationSchema),
  WeDoControllers.createWeDo,
);

router.get(
  '/:id',
  WeDoControllers.getSingleWeDo,
);

router.patch(
  '/:id',
  validateRequest(updateWeDoValidationSchema),
  WeDoControllers.updateWeDo,
);

router.delete(
  '/:id',
  WeDoControllers.deleteWeDo,
);

router.get(
  '/',
  WeDoControllers.getAllWeDos,
);

export const WeDoRoutes = router;
