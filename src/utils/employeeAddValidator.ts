import { z } from 'zod';

export const employeeAddSchema = z.object({
  photo: z.any().optional(),
  lastName: z.string().nonempty({ message: 'Фамилия обязательна' }),
  firstName: z.string().nonempty({ message: 'Имя обязательно' }),
  middleName: z.string().optional(),
  phone: z
    .string()
    .nonempty({ message: 'Телефон обязателен' })
    .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, {
      message: 'Неверный формат телефона',
    }),
  email: z
    .string()
    .nonempty({ message: 'Email обязателен' })
    .email({ message: 'Неверный email' }),
  city: z.string().nonempty({ message: 'Город обязателен' }),
  department: z.string().nonempty({ message: 'Отдел обязателен' }),
  position: z.string().nonempty({ message: 'Должность обязательна' }),
  admin: z.boolean().default(false),
  manager1: z.boolean().default(false),
  manager2: z.boolean().default(false),
  manager3: z.boolean().default(false),
});

export type EmployeeAddFormValues = z.infer<typeof employeeAddSchema>;
