import express from 'express';
import { QuotePricingControllers } from './QuotePricing.controller';
import validateRequest from '../../middlewares/validateRequest';
import {  updateQuotePricingValidationSchema } from './QuotePricing.validation';

const router = express.Router();

router.post(
  '/create-quote-pricing',
  // validateRequest(createQuotePricingValidationSchema),
  QuotePricingControllers.createQuotePricing,
);

router.get(
  '/:id',
  QuotePricingControllers.getSingleQuotePricing,
);

router.patch(
  '/:id',
  validateRequest(updateQuotePricingValidationSchema),
  QuotePricingControllers.updateQuotePricing,
);

router.delete(
  '/:id',
  QuotePricingControllers.deleteQuotePricing,
);

router.get(
  '/',
  QuotePricingControllers.getAllQuotePricings,
);

export const QuotePricingRoutes = router;
