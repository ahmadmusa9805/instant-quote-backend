/* eslint-disable no-unused-vars */
import { Model, Types} from 'mongoose';

export type TPropertyPart = {
  name: string;
  subscriberId: Types.ObjectId;
  image: string;
  info: string;
  isDeleted: boolean;
};

export interface PropertyPartModel extends Model<TPropertyPart> {
  isPropertyPartExists(id: string): Promise<TPropertyPart | null>;
}
