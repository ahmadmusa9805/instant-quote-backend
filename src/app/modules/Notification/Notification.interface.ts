import { Model } from 'mongoose';

export type TNotification = {
  name: string;
  description?: string;
  atcCodes: string;
  isDeleted: boolean;
};

export interface NotificationModel extends Model<TNotification> {
  isNotificationExists(id: string): Promise<TNotification | null>;
}
