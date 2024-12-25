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

// router.post(
//   '/create-admin',
//   auth(USER_ROLE.superAdmin),
//   validateRequest(createAdminValidationSchema),
//   UserControllers.createAdmin,
// );

// router.get(
//   '/me',
//   auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.actor, USER_ROLE.judge),
//   UserControllers.getMe,
// );

// router.post(
//   '/change-status/:id',
//   auth(USER_ROLE.superAdmin, USER_ROLE.admin),
//   validateRequest(UserValidation.changeStatusValidationSchema),
//   UserControllers.changeStatus,
// );

// router.get(
//   '/',
//   auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.actor, USER_ROLE.judge),
//   UserControllers.getAllUsers,
// );

export const QuoteRoutes = router;
