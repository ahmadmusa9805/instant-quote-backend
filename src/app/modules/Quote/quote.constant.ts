export const USER_ROLE = {
  superAdmin: 'superAdmin',
  actor: 'actor',
  judge: 'judge',
  admin: 'admin',
} as const;


export const QUOTE_SEARCHABLE_FIELDS = [
  'email',
  'address',
];

export const QUOTE_STATUS = ['active', 'blocked'];
