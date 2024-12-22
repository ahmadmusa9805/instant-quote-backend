export const USER_ROLE = {
  superAdmin: 'superAdmin',
  actor: 'actor',
  judge: 'judge',
  admin: 'admin',
} as const;


export const usersSearchableFields = [
  'email',
  'name.firstName',
  'name.lastName',
  'address',
];

export const UserStatus = ['active', 'blocked'];
