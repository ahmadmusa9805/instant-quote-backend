import express, { NextFunction, Request, Response } from 'express';
import { PropertyPartControllers } from './PropertyPart.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createPropertyPartValidationSchema, updatePropertyPartValidationSchema } from './PropertyPart.validation';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();

router.post(
  '/create-PropertyPart',
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
  validateRequest(createPropertyPartValidationSchema),
  PropertyPartControllers.createPropertyPart,
);

router.get(
  '/:id',
  PropertyPartControllers.getSinglePropertyPart,
);

router.patch(
  '/:id',
  validateRequest(updatePropertyPartValidationSchema),
  PropertyPartControllers.updatePropertyPart,
);

router.delete(
  '/:id',
  PropertyPartControllers.deletePropertyPart,
);

router.get(
  '/',
  PropertyPartControllers.getAllPropertyParts,
);

export const PropertyPartRoutes = router;
