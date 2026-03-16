import type { EmployeeCardData } from '../types';

export const employeeMock: EmployeeCardData = {
  fullName: 'Петрова Анастасия Юрьевна',
  role: 'Администратор',
  contact: {
    phone: '8(981)777-56-12',
    email: 'Petrova@mail.ru',
    city: 'Находка',
  },
  position: {
    department: 'Маркетинг',
    position: 'Администратор',
    manager: 'Гаврилов Сергей Михайлович',
  },
};
