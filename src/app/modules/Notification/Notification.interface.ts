/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TNotification = {
  type: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
  isDeleted: boolean;
};

export interface NotificationModel extends Model<TNotification> {
  isNotificationExists(id: string): Promise<TNotification | null>;
}
