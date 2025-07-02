/* eslint-disable @typescript-eslint/no-explicit-any */

// import express from 'express';
import express, { NextFunction, Request, Response } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { QuoteControllers } from './quote.controller';
import {  QuoteValidation } from './quote.validation';
import { uploadFileS3 } from '../../utils/UploaderS3';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
// import { USER_ROLE } from './quote.constant';

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

router.patch(
  '/is-read/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber ),
  QuoteControllers.quoteReadStateUpdate,
);

router.get(
  '/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber, USER_ROLE.client),
  QuoteControllers.getSingleQuote,
);
router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber, USER_ROLE.client),
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
  validateRequest(QuoteValidation.updateQuoteValidationSchema),
  QuoteControllers.updateQuote,
);


router.delete(
  '/:id',
    auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber, USER_ROLE.client),
  QuoteControllers.deleteQuote,
);

router.get(
  '/',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  QuoteControllers.getAllQuotes,
);

router.get(
  '/user/:id',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber, USER_ROLE.client),
  QuoteControllers.getAllQuotesByUser,);

export const QuoteRoutes = router;
