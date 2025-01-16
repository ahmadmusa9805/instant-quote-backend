import { Schema, model } from 'mongoose';
      import { TNotification, NotificationModel } from './Notification.interface';
      
      const NotificationSchema = new Schema<TNotification, NotificationModel>({
        type: { type: String,
          enum: ['quote', 'callBooking'],
          required: true },
        message: { type: String, required: true },
        isRead: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
        isDeleted: { type: Boolean, default: false },
      });
      
      NotificationSchema.statics.isNotificationExists = async function (id: string) {
        return await this.findOne({ _id: id, isDeleted: false });
      };
      
      export const Notification = model<TNotification, NotificationModel>('Notification', NotificationSchema);
      