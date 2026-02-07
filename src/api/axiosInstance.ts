import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'
import { z } from 'zod'
import { toast } from 'sonner'
import { store } from '@/app/store'
import { logout } from '@/features/auth/authSlice'

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

export const ApiErrorSchema = z.object({
  message: z.string().optional(),
  error: z.string().optional(),
  errors: z.record(
    z.string(),
    z.union([z.string(), z.array(z.string())])
  ).optional(),
})

export type ApiErrorResponse = z.infer<typeof ApiErrorSchema>

export function getApiErrorMessage(data: unknown): string | null {
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

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

let isRefreshing = false
let failedQueue: Array<{
  resolve: (value?: unknown) => void
  reject: (error: any) => void
}> = []

const processQueue = (error: any = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error)
    else resolve()
  })
  failedQueue = []
}

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig
    const status = error.response?.status

    if (status === 401) {
      if (originalRequest._retry) {
        store.dispatch(logout())
        toast.error('Сессия истекла', {
          description: 'Пожалуйста, войдите заново.',
        })
        window.location.replace('/login')
        return Promise.reject(error)
      }

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then(() => api(originalRequest))
      }

      originalRequest._retry = true
      isRefreshing = true

      return new Promise((resolve, reject) => {
        api
          .post('/auth/refresh', {}, { withCredentials: true })
          .then(() => {
            processQueue()
            resolve(api(originalRequest))
          })
          .catch((err) => {
            processQueue(err)
            store.dispatch(logout())
            toast.error('Не удалось обновить сессию', {
              description: 'Пожалуйста, войдите заново.',
            })
            window.location.replace('/login')
            reject(err)
          })
          .finally(() => {
            isRefreshing = false
          })
      })
    }

    if (status === 403) {
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

    return Promise.reject(error)
  }
)

export default api
