import { ProjectControllers } from './Project.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createProjectValidationSchema, updateProjectValidationSchema } from './Project.validation';
import { upload } from '../../utils/sendImageToCloudinary';
import express, { NextFunction, Request, Response } from 'express';

const router = express.Router();

router.post(
  '/create-project',
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
