/* eslint-disable @typescript-eslint/no-explicit-any */

// import express from 'express';
import express, { NextFunction, Request, Response } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { QuoteControllers } from './quote.controller';
import {  QuoteValidation } from './quote.validation';
<<<<<<< HEAD
// import { upload } from '../../utils/sendImageToCloudinary';
import { uploadFileS3 } from '../../utils/UploaderS3';
=======
import { uploadFileS3 } from '../../utils/UploaderS3';
// import { upload } from '../../utils/sendImageToCloudinary';
// import { s3Upload } from '../../utils/UploaderS3';
>>>>>>> fc691dc7938c55e28cc2629e66fd3372a2fe217d

const router = express.Router();

router.post(
  '/create-quote',
  // upload.single('file'),
  uploadFileS3(true).single('file'),
<<<<<<< HEAD
  (req: Request, res: Response, next: NextFunction) => {
=======
    (req: Request, res: Response, next: NextFunction) => {
>>>>>>> fc691dc7938c55e28cc2629e66fd3372a2fe217d
    if (req.body.data) {
      try {
        req.body = JSON.parse(req.body.data);
      } catch (error) {
        next(error);
      }
    }
    next();
  },
  validateRequest(QuoteValidation.createQuoteValidationSchema),
  QuoteControllers.createQuote,
);

router.get(
  '/get-all-quote-elements',
  QuoteControllers.getAllQuotesElements);

router.get(
  '/:id',
  QuoteControllers.getSingleQuote,
);

router.patch(
  '/:id',
  // validateRequest(QuoteValidation.updateQuoteValidationSchema),
  QuoteControllers.updateQuote,
);

router.delete(
  '/:id',
  QuoteControllers.deleteQuote,);

router.get(
  '/',
  QuoteControllers.getAllQuotes,);

router.get(
  '/user/:id',
  QuoteControllers.getAllQuotesByUser,);





export const QuoteRoutes = router;
