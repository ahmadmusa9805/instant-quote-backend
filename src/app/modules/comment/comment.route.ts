import express from 'express';
import { CommentControllers } from './comment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { createCommentValidationSchema, updateCommentValidationSchema } from './comment.validation';

const router = express.Router();

router.post(
  '/create-comment',
  validateRequest(createCommentValidationSchema),
  CommentControllers.createComment,
);

router.get(
  '/:id',
  CommentControllers.getSingleComment,
);

router.patch(
  '/:id',
  validateRequest(updateCommentValidationSchema),
  CommentControllers.updateComment,
);

router.delete(
  '/:id',
  CommentControllers.deleteComment,
);

router.get(
  '/',
  CommentControllers.getAllComments,
);

export const CommentRoutes = router;
