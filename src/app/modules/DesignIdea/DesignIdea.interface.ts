/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TDesignIdea = {
  clarity: string;
  isDeleted: boolean;
};

export interface DesignIdeaModel extends Model<TDesignIdea> {
  isDesignIdeaExists(id: string): Promise<TDesignIdea | null>;
}
