import { Model, Types } from 'mongoose';

export type TUserName = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export type TVideo = {
  videoUrl: string;
  uploadedAt: Date;
};


export type TActor = {
  password: string | undefined;
  userId: Types.ObjectId;
  name: TUserName;
  gender?: 'male' | 'female' | 'other';
  dateOfBirth?: Date;
  email: string;
  contactNo?: string;
  address?: string;
  profileImg?: string;
  profileVideo?: string;
  status?: string;
  shortBio?: string;
  bio?: string;
  stripeAccountId?: string;
  isDeleted?: boolean;
  LinkedIn?: string;
  instagram?: string;
  Spotlight?: string;
  Facebook?: string;
  TikTok?: string;
  X?: string;
  skills?: string[];
};


//for creating static
export interface ActorModel extends Model<TActor> {
  // eslint-disable-next-line no-unused-vars
  isUserExists(id: string): Promise<TActor | null>;
}
