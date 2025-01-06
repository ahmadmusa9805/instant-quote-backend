import express from 'express';
import { DesignIdeaControllers } from './DesignIdea.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createDesignIdeaValidationSchema, updateDesignIdeaValidationSchema } from './DesignIdea.validation';

const router = express.Router();

router.post(
  '/create-design-idea',
  validateRequest(createDesignIdeaValidationSchema),
  DesignIdeaControllers.createDesignIdea,
);

router.get(
  '/:id',
  DesignIdeaControllers.getSingleDesignIdea,
);

router.patch(
  '/:id',
  validateRequest(updateDesignIdeaValidationSchema),
  DesignIdeaControllers.updateDesignIdea,
);

router.delete(
  '/:id',
  DesignIdeaControllers.deleteDesignIdea,
);

router.get(
  '/',
  DesignIdeaControllers.getAllDesignIdeas,
);

export const DesignIdeaRoutes = router;
