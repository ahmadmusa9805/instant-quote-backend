import { Model } from 'mongoose';

export type TUserName = {
  firstName: string;
  lastName: string;
};

export type TClient = {
  name: TUserName;
  email: string;
  contactNo: string;
  dateOfBirth?: Date;
  address?: string;
  profileImg?: string;
  status?: string;
  stripeAccountId?: string;
  isDeleted?: boolean;
};


//for creating static
export interface ClientModel extends Model<TClient> {
  // eslint-disable-next-line no-unused-vars
  isClientExists(id: string): Promise<TClient | null>;
}
