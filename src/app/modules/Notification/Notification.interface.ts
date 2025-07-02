/* eslint-disable no-unused-vars */
import { Model, Types } from 'mongoose';

export type TNotification = {
  type: 'quote' | 'callBooking';
  message: string;
<<<<<<< HEAD
  isRead: boolean;
=======
  readBy: [],
>>>>>>> 76b68698a34be75d59b4035e95777cea403c2702
  subscriberId: Types.ObjectId;
};

export interface NotificationModel extends Model<TNotification> {
  isNotificationExists(id: string): Promise<TNotification | null>;
}
