/* eslint-disable @typescript-eslint/no-explicit-any */

// import express from 'express';
import express, { NextFunction, Request, Response } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { QuoteControllers } from './quote.controller';
import {  QuoteValidation } from './quote.validation';
import { upload } from '../../utils/sendImageToCloudinary';

const router = express.Router();

router.post(
  '/create-quote',
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
  validateRequest(QuoteValidation.createQuoteValidationSchema),
  QuoteControllers.createQuote,
);

router.get(
  '/:id',
  QuoteControllers.getSingleStartTime,
);

router.get(
  '/',
  QuoteControllers.getAllStartTimes,
);



export const QuoteRoutes = router;
