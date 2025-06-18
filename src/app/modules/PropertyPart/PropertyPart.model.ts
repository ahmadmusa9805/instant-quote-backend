import { Schema, model } from 'mongoose';
import { TPropertyPart, PropertyPartModel } from './PropertyPart.interface';

const PropertyPartSchema = new Schema<TPropertyPart, PropertyPartModel>({
  name: { type: String, required: true },
    subscriberId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  image: { type: String, required: true },
  info: { type: String},
  isDeleted: { type: Boolean, default: false },
});

export const PropertyPart = model<TPropertyPart, PropertyPartModel>('PropertyPart', PropertyPartSchema);
