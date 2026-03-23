import type { EmployeeCardData } from '../types';
import { employeeAvatar } from '../components';

export const employeeMock: EmployeeCardData = {
  fullName: 'Петрова Анастасия Юрьевна',
  role: 'Администратор',
  photoUrl: employeeAvatar,
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
