import express from 'express';
import { NotificationControllers } from './Notification.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';

const router = express.Router();

router.post(
  '/create-Notification',
  NotificationControllers.createNotification,
);

router.get(
  '/unread',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber ),
  NotificationControllers.getAllUnreadNotifications,
);
router.patch(
  '/:id/read',
  auth(USER_ROLE.superAdmin, USER_ROLE.admin, USER_ROLE.subscriber ),
  NotificationControllers.markNotificationAsRead,
);
router.put(
  '/mark-all-as-read',
  NotificationControllers.markNotificationsAsRead,
);


export const NotificationRoutes = router;
