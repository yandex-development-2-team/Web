import { z } from 'zod'

/* ================= LOGIN ================= */

export const loginSchema = z.object({
  login: z.string().min(1, 'Логин обязателен'),
  password: z
    .string()
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .regex(/[A-Za-z]/, 'Пароль должен содержать хотя бы одну букву')
    .regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру'),
})

export type LoginFormValues = z.infer<typeof loginSchema>

/* ============== EMPLOYEE ADD ============== */

const MAX_FILE_SIZE = 2 * 1024 * 1024
const ACCEPTED_TYPES = ['image/png', 'image/jpeg']

export const employeeAddSchema = z.object({
  lastName: z.string().min(1, 'Обязательное поле'),
  firstName: z.string().min(1, 'Обязательное поле'),
  middleName: z.string().optional(),

  citizenship: z.string().min(1, 'Обязательное поле'),

  birthDate: z
    .string()
    .min(1, 'Обязательное поле')
    .refine((date) => new Date(date) <= new Date(), {
      message: 'Дата рождения не может быть в будущем',
    }),

  gender: z.string().min(1, 'Обязательное поле'),

  passportSeries: z
    .string()
    .regex(/^\d{4}$/, 'Серия должна содержать 4 цифры'),

  passportNumber: z
    .string()
    .regex(/^\d{6}$/, 'Номер должен содержать 6 цифр'),

  phone: z
    .string()
    .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Некорректный формат'),

  email: z.string().email('Некорректный email'),

  address: z.string().optional(),

  department: z.string().min(1, 'Обязательное поле'),
  position: z.string().min(1, 'Обязательное поле'),

  admin: z.boolean().optional(),
  manager1: z.boolean().optional(),
  manager2: z.boolean().optional(),
  manager3: z.boolean().optional(),

  photo: z
    .any()
    .refine(
      (file) => !file || ACCEPTED_TYPES.includes(file?.type),
      'Поддерживаются только PNG или JPG'
    )
    .refine(
      (file) => !file || file?.size <= MAX_FILE_SIZE,
      'Размер файла не более 2MB'
    )
    .optional(),
})

export type EmployeeAddFormValues = z.infer<typeof employeeAddSchema>
