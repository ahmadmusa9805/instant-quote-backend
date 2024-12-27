import express, { NextFunction, Request, Response } from 'express';
import { PropertyControllers } from './Property.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createPropertyValidationSchema, updatePropertyValidationSchema } from './Property.validation';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();

router.post(
  '/create-Property',
  upload.single('file'),
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
  PropertyControllers.getSingleProperty,
);

router.patch(
  '/:id',
  validateRequest(updatePropertyValidationSchema),
  PropertyControllers.updateProperty,
);

router.delete(
  '/:id',
  PropertyControllers.deleteProperty,
);

router.get(
  '/',
  PropertyControllers.getAllPropertys,
);

export const PropertyRoutes = router;
