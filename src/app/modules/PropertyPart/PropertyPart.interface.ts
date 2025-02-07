/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TPropertyPart = {
  name: string;
  image: string;
  info: string;
  isDeleted: boolean;
};

export interface PropertyPartModel extends Model<TPropertyPart> {
  isPropertyPartExists(id: string): Promise<TPropertyPart | null>;
}
