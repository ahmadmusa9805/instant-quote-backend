import { model, Schema } from 'mongoose';
import { ActorStatus } from './actor.constant';
import { ActorModel, TActor, TUserName } from './actor.interface';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
});

const actorSchema = new Schema<TActor, ActorModel>( 
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not a valid gender',
      },
    },
    dateOfBirth: { type: Date },
    email: {
      type: String,
      required: [true, 'Email is required'],

      unique: true,
    },
    contactNo: { type: String },
    address: {
       type: String, default: '' ,
    },
    profileImg: { type: String, default: '' },
    profileVideo: { type: String, default: '' },
    shortBio: { type: String, default: '' },
    bio: { type: String, default: '' },
    stripeAccountId: { type: String, default: '' },
    LinkedIn: { type: String, default: '' },
    instagram: { type: String, default: '' },
    Spotlight: { type: String, default: '' },
    Facebook: { type: String, default: '' },
    TikTok: { type: String, default: '' },
    X: { type: String, default: '' },
    skills: [{ type: String, default: '' }],
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ActorStatus,
      default: 'active',
    },

  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },

);

//virtual
actorSchema.virtual('fullName').get(function () {
  return this?.name?.firstName + this?.name?.middleName + this?.name?.lastName;
});

// Query Middleware
actorSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

actorSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

actorSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom static method
actorSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Actor.findOne({ id });
  return existingUser;
};

export const Actor = model<TActor, ActorModel>('Actor', actorSchema);
