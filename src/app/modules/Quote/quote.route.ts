/* eslint-disable @typescript-eslint/no-explicit-any */

// import express from 'express';
import express, { NextFunction, Request, Response } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { QuoteControllers } from './quote.controller';
import {  QuoteValidation } from './quote.validation';

import { uploadFileS3 } from '../../utils/UploaderS3';

const router = express.Router();
router.post(
  '/create-quote',
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
