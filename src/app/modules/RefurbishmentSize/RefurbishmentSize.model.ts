import { Schema, model } from 'mongoose';
import { TRefurbishmentSize, RefurbishmentSizeModel } from './RefurbishmentSize.interface';

const RefurbishmentSizeSchema = new Schema<TRefurbishmentSize, RefurbishmentSizeModel>({
  name: { type: String, required: true },
  squareMeterSize: { type: String },
  price: { type: Number, required: true },
  isDeleted: { type: Boolean, default: false },
});

RefurbishmentSizeSchema.statics.isRefurbishmentSizeExists = async function (id: string) {
  return await this.findOne({ _id: id, isDeleted: false });
};

export const RefurbishmentSize = model<TRefurbishmentSize, RefurbishmentSizeModel>('RefurbishmentSize', RefurbishmentSizeSchema);
