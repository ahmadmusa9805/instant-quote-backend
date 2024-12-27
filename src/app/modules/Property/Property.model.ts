import { Schema, model } from 'mongoose';
import { TProperty, PropertyModel } from './Property.interface';

const PropertySchema = new Schema<TProperty, PropertyModel>({
  name: { type: String, required: true },
  image: { type: String },
  price: { type: Number, required: true },
  isDeleted: { type: Boolean, default: false },
});

PropertySchema.statics.isPropertyExists = async function (id: string) {
  return await this.findOne({ _id: id, isDeleted: false });
};

export const Property = model<TProperty, PropertyModel>('Property', PropertySchema);
