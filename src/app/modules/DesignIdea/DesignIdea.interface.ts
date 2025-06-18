/* eslint-disable no-unused-vars */
import { Model, Types} from 'mongoose';

export type TDesignIdea = {
  clarity: string;
  subscriberId: Types.ObjectId;
  info: string;
  isDeleted: boolean;
};

export interface DesignIdeaModel extends Model<TDesignIdea> {
  isDesignIdeaExists(id: string): Promise<TDesignIdea | null>;
}
