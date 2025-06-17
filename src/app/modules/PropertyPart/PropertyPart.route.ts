import express, { NextFunction, Request, Response } from 'express';
import { PropertyPartControllers } from './PropertyPart.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createPropertyPartValidationSchema, updatePropertyPartValidationSchema } from './PropertyPart.validation';
import { uploadFileS3 } from '../../utils/UploaderS3';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/create-propertyPart',
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
  validateRequest(createPropertyPartValidationSchema),
  PropertyPartControllers.createPropertyPart,
);

router.get(
  '/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  PropertyPartControllers.getSinglePropertyPart,
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
  validateRequest(updatePropertyPartValidationSchema),
  PropertyPartControllers.updatePropertyPart,
);

router.delete(
  '/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  PropertyPartControllers.deletePropertyPart,
);

router.get(
  '/',
   auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  PropertyPartControllers.getAllPropertyParts,
);

export const PropertyPartRoutes = router;
