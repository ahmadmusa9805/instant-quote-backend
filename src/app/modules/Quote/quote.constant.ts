export const USER_ROLE = {
  superAdmin: 'superAdmin',
  actor: 'actor',
  judge: 'judge',
  admin: 'admin',
} as const;


export const usersSearchableFields = [
  'email',
  'address',
];

export const UserStatus = ['active', 'blocked'];
