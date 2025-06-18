import express from 'express';
import { WindowControllers } from './Window.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createWindowValidationSchema, updateWindowValidationSchema } from './Window.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/create-window',
   auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  validateRequest(createWindowValidationSchema),
  WindowControllers.createWindow,
);

router.get(
  '/:id',
   auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  WindowControllers.getSingleWindow,
);

router.patch(
  '/:id',
   auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  validateRequest(updateWindowValidationSchema),
  WindowControllers.updateWindow,
);

router.delete(
  '/:id',
   auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  WindowControllers.deleteWindow,
);

router.get(
  '/',
   auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  WindowControllers.getAllWindows,
);

export const WindowRoutes = router;
