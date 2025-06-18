import express from 'express';
import { DesignIdeaControllers } from './DesignIdea.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createDesignIdeaValidationSchema, updateDesignIdeaValidationSchema } from './DesignIdea.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/create-design-idea',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  validateRequest(createDesignIdeaValidationSchema),
  DesignIdeaControllers.createDesignIdea,
);

router.get(
  '/:id',
      auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  DesignIdeaControllers.getSingleDesignIdea,
);

router.patch(
  '/:id',
      auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  validateRequest(updateDesignIdeaValidationSchema),
  DesignIdeaControllers.updateDesignIdea,
);

router.delete(
  '/:id',
      auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  DesignIdeaControllers.deleteDesignIdea,
);

router.get(
  '/',
      auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber),
  DesignIdeaControllers.getAllDesignIdeas,
);

export const DesignIdeaRoutes = router;
