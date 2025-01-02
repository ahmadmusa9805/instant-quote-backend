import express from 'express';
import { ProjectControllers } from './Project.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createProjectValidationSchema, updateProjectValidationSchema } from './Project.validation';

const router = express.Router();

router.post(
  '/create-Project',
  validateRequest(createProjectValidationSchema),
  ProjectControllers.createProject,
);

router.get(
  '/:id',
  ProjectControllers.getSingleProject,
);

router.patch(
  '/:id',
  validateRequest(updateProjectValidationSchema),
  ProjectControllers.updateProject,
);

router.delete(
  '/:id',
  ProjectControllers.deleteProject,
);

router.get(
  '/',
  ProjectControllers.getAllProjects,
);

export const ProjectRoutes = router;
