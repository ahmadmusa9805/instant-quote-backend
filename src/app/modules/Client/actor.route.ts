// import express, { NextFunction, Request, Response } from 'express';
// import validateRequest from '../../middlewares/validateRequest';
// // import { uploads } from '../../utils/sendImageAndVideoToCloudinary';
// // import { uploads } from '../../utils/sendImageAndVideoToCloudinary';
// import { ActorControllers } from './actor.controller';
// import { updateActorValidationSchema } from './actor.validation';
// import { USER_ROLE } from '../User/user.constant';
// import auth from '../../middlewares/auth';
// import s3Upload from '../../utils/UploaderS3';

// const router = express.Router();

// router.get(
//   '/',
//   auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.judge, USER_ROLE.actor),
//   ActorControllers.getAllActors,
// );

// router.get(
//   '/:id',
//   auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.judge, USER_ROLE.actor),
//   ActorControllers.getSingleActor,
// );
// router.patch(
//   '/:id',
//   auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.actor),
//   // uploads, // Multer middleware to handle file uploads
//   s3Upload('file', true),
//   (req: Request, res: Response, next: NextFunction) => {
//     req.body = JSON.parse(req.body.data); // If data is JSON string in Postman, this is correct
//     next();
//   },
//   validateRequest(updateActorValidationSchema),
//   ActorControllers.updateActor,
// );

// router.delete(
//   '/:id',
//   auth(USER_ROLE.superAdmin, USER_ROLE.admin),
//   ActorControllers.deleteActor,
// );

// router.get('/:id/competition-ratings',
//   auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.actor),
//   ActorControllers.getCompetitionAverageRatings,
// );
// router.get('/:id/comments',
//   auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.actor),
//   ActorControllers.getAllComments,
// );

// export const ClientRoutes = router;
