export type ROLE = 'ADMIN' | 'MANAGER';

export type User = {
  role: ROLE;
  name: string;
  roleName: string;
};

export const userInfo: User = {
  role: 'ADMIN',
  name: 'Анастасия',
  roleName: 'Администратор',
};
