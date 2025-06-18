export const USER_ROLE = {
  superAdmin: 'superAdmin',
  client: 'client',
  admin: 'admin',
  subscriber: 'subscriber',
} as const;


export const usersSearchableFields = [
  'email',
  'address',
  'name.firstName',
  'name.lastName',
  'name'
];


export const UserStatus = ['active', 'blocked'];
export const userState = ['contacted', 'interested', 'agreed', 'notInterested'];
