export const USER_ROLE = {
  superAdmin: 'superAdmin',
  actor: 'client',
  admin: 'admin',
} as const;


export const usersSearchableFields = [
  'email',
  'name.firstName',
  'name.lastName',
  'address',
];

export const UserStatus = ['active', 'blocked'];
