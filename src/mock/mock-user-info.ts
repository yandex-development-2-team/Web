export type ROLE = 'ADMIN' | 'MANAGER';

type UserBase = {
  name: string;
  roleName: string;
};

type Admin = UserBase & {
  role: 'ADMIN';
};

type Manager = UserBase & {
  grade: number;
  role: 'MANAGER';
}

export type User = Admin | Manager;

export const adminInfo: User = {
  name: 'Анастасия',
  role: 'ADMIN',
  roleName: 'Администратор',
};

export const managerInfo: User = {
  name: 'Анастасия',
  role: "MANAGER",
  roleName: 'Менеджер',
  grade: 2
}

export const userInfo: User = adminInfo;