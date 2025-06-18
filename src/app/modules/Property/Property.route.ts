import express, { NextFunction, Request, Response } from 'express';
import { PropertyControllers } from './Property.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createPropertyValidationSchema, updatePropertyValidationSchema } from './Property.validation';
import { uploadFileS3 } from '../../utils/UploaderS3';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/create-Property',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  uploadFileS3(true).single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      try {
        req.body = JSON.parse(req.body.data);
      } catch (error) {
        next(error);
      }
    }
    next();
  },
  validateRequest(createPropertyValidationSchema),
  PropertyControllers.createProperty,
);

router.get(
  '/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  PropertyControllers.getSingleProperty,
);

router.patch(
  '/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
     uploadFileS3(true).single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    if (req.body.data) {
      try {
        req.body = JSON.parse(req.body.data);
      } catch (error) {
        next(error);
      }
    }
    next();
  },
  validateRequest(updatePropertyValidationSchema),
  PropertyControllers.updateProperty,
);

router.delete(
  '/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  PropertyControllers.deleteProperty,
);

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  PropertyControllers.getAllPropertys,
);

export const PropertyRoutes = router;
