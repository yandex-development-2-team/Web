// src/utils/validators.ts
import { z } from 'zod';

export const employeeAddSchema = z.object({
  photo: z
    .any()
    .optional(), // по желанию можно сделать required
  lastName: z.string().nonempty({ message: 'Фамилия обязательна' }),
  firstName: z.string().nonempty({ message: 'Имя обязательно' }),
  middleName: z.string().optional(),
  citizenship: z.string().nonempty(),
  birthDate: z
    .string()
    .nonempty({ message: 'Дата рождения обязательна' })
    .refine((val) => new Date(val) <= new Date(), {
      message: 'Дата рождения не может быть в будущем',
    }),
  gender: z.string().nonempty({ message: 'Пол обязателен' }),
  passportSeries: z
    .string()
    .nonempty({ message: 'Серия паспорта обязательна' })
    .regex(/^\d{4}$/, { message: 'Серия паспорта: 4 цифры' }),
  passportNumber: z
    .string()
    .nonempty({ message: 'Номер паспорта обязателен' })
    .regex(/^\d{6}$/, { message: 'Номер паспорта: 6 цифр' }),
  phone: z
    .string()
    .nonempty({ message: 'Телефон обязателен' })
    .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, { message: 'Неверный формат телефона' }),
  email: z.string().nonempty({ message: 'Email обязателен' }).email({ message: 'Неверный email' }),
  department: z.string().nonempty({ message: 'Отдел обязателен' }),
  position: z.string().nonempty({ message: 'Должность обязательна' }),
  admin: z.boolean().default(false),
  manager1: z.boolean().default(false),
  manager2: z.boolean().default(false),
  manager3: z.boolean().default(false),
});

export type EmployeeAddFormValues = z.infer<typeof employeeAddSchema>;