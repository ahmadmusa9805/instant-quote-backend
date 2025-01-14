import express, { NextFunction, Request, Response } from 'express';
import { BlogControllers } from './Blog.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createBlogValidationSchema, updateBlogValidationSchema } from './Blog.validation';
import { uploadFileS3 } from '../../utils/UploaderS3';

const router = express.Router();

router.post(
  '/create-blog',
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
  validateRequest(createBlogValidationSchema),
  BlogControllers.createBlog,
);

router.get(
  '/:id',
  BlogControllers.getSingleBlog,
);

router.patch(
  '/:id',
  validateRequest(updateBlogValidationSchema),
  BlogControllers.updateBlog,
);

router.delete(
  '/:id',
  BlogControllers.deleteBlog,
);

router.get(
  '/',
  BlogControllers.getAllBlogs,
);

export const BlogRoutes = router;
