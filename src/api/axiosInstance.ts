import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'
import { z } from 'zod'
import { emitAuthEvent } from './auth.service'

const ApiErrorSchema = z.object({
  message: z.string().optional(),
  error: z.string().optional(),
  errors: z.record(
    z.string(),
    z.union([z.string(), z.array(z.string())])
  ).optional(),
})

function getApiErrorMessage(data: unknown): string | null {
  const parsed = ApiErrorSchema.safeParse(data)
  if (!parsed.success) return null

  const { message, error, errors } = parsed.data
  if (message) return message
  if (error) return error
  if (errors) {
    const first = Object.values(errors)[0]
    return Array.isArray(first) ? first[0] : first
  }

  return null
}

export const handleAxiosError = (error: AxiosError) => {
  const status = error.response?.status

  if (status === 401) {
    emitAuthEvent('UNAUTHORIZED')
  }

  if (status === 403) {
    emitAuthEvent('FORBIDDEN')
    toast.error('Нет доступа', {
      description: 'Недостаточно прав для выполнения действия',
    })
  }

  if (status === 400) {
    const message = getApiErrorMessage(error.response?.data) ?? 'Некорректные данные'
    toast.error('Ошибка валидации', { description: message })
  }

  if (status && status >= 500) {
    toast.error('Ошибка сервера', {
      description: 'Что-то пошло не так. Попробуйте позже.',
    })
  }

  if (!error.response) {
    toast.error('Ошибка сети', {
      description: 'Проверьте подключение к интернету',
    })
  }
}

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
  timeout: 15_000,
})

api.interceptors.response.use(
  response => response,
  error => {
    handleAxiosError(error)
    return Promise.reject(error)
  }
)

export default api
