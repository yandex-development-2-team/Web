export type ROLE = 'ADMIN' | 'MANAGER';

export type User = {
    role: ROLE;
    name: string;
    roleName: string;
}

export const userInfo: User = {
    role: 'MANAGER',
    name: 'Анастасия',
    roleName: 'Администратор'
}