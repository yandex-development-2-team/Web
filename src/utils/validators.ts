import { z } from 'zod'

export const loginSchema = z.object({
  login: z.string().min(1, 'Логин обязателен'),
  password: z.string()
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .regex(/[A-Za-z]/, 'Пароль должен содержать хотя бы одну букву')
    .regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру'),
})

export type LoginFormValues = z.infer<typeof loginSchema>
