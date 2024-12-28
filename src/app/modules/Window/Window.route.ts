import express from 'express';
import { WindowControllers } from './Window.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createWindowValidationSchema, updateWindowValidationSchema } from './Window.validation';

const router = express.Router();

router.post(
  '/create-Window',
  validateRequest(createWindowValidationSchema),
  WindowControllers.createWindow,
);

router.get(
  '/:id',
  WindowControllers.getSingleWindow,
);

router.patch(
  '/:id',
  validateRequest(updateWindowValidationSchema),
  WindowControllers.updateWindow,
);

router.delete(
  '/:id',
  WindowControllers.deleteWindow,
);

router.get(
  '/',
  WindowControllers.getAllWindows,
);

export const WindowRoutes = router;
