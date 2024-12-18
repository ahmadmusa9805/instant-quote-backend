import { Model, Types } from 'mongoose';

export type TGender = 'male' | 'female' | 'other';

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TAdmin = {
  password: string | undefined;
  userId: Types.ObjectId;
  name: TUserName;
  email: string;
  profileImg?: string;
  status: string;
  isDeleted: boolean;
};

export interface AdminModel extends Model<TAdmin> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TAdmin | null>;
}
