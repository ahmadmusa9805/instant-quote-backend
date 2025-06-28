import { Schema, model } from 'mongoose';
import { TAvailability, AvailabilityModel } from './Availability.interface';

const AvailabilitySchema = new Schema<TAvailability, AvailabilityModel>(
  {
    daysOfWeek: { type: [Number], required: true },
    timeSlots: {
      type: [
        {
          start: { type: String, required: true },
          end: { type: String, required: true },
        },
      ],
      required: true,
    },
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    subscriberId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true },
);

AvailabilitySchema.statics.isAvailabilityExists = async function (id: string) {
  return await this.findOne({ _id: id, isDeleted: false });
};

export const Availability = model<TAvailability, AvailabilityModel>(
  'Availability',
  AvailabilitySchema,
);
