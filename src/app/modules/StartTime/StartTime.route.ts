import express from 'express';
import { StartTimeControllers } from './StartTime.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createStartTimeValidationSchema, updateStartTimeValidationSchema } from './StartTime.validation';

const router = express.Router();

router.post(
  '/create-start-time',
  validateRequest(createStartTimeValidationSchema),
  StartTimeControllers.createStartTime,
);

router.get(
  '/:id',
  StartTimeControllers.getSingleStartTime,
);

router.patch(
  '/:id',
  validateRequest(updateStartTimeValidationSchema),
  StartTimeControllers.updateStartTime,
);

router.delete(
  '/:id',
  StartTimeControllers.deleteStartTime,
);

router.get(
  '/',
  StartTimeControllers.getAllStartTimes,
);

export const StartTimeRoutes = router;
