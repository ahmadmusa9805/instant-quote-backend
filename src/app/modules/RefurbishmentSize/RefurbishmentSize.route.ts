import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { createRefurbishmentSizeValidationSchema } from './RefurbishmentSize.validation';
import { RefurbishmentSizeControllers } from './RefurbishmentSize.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
// import validateRequest from '../../middlewares/validateRequest';
// import { createRefurbishmentTypeValidationSchema, updateRefurbishmentTypeValidationSchema } from './RefurbishmentType.validation';

const router = express.Router();

router.post(
  '/create-refurbishment-size',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  validateRequest(createRefurbishmentSizeValidationSchema),
  RefurbishmentSizeControllers.createRefurbishmentSize,
);

router.get(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  RefurbishmentSizeControllers.getSingleRefurbishmentSize,
);

router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  // validateRequest(updateRefurbishmentTypeValidationSchema),
  RefurbishmentSizeControllers.updateRefurbishmentSize,
);

router.delete(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  RefurbishmentSizeControllers.deleteRefurbishmentSize,
);

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  RefurbishmentSizeControllers.getAllRefurbishmentSizes,
);

export const RefurbishmentSizeRoutes = router;
