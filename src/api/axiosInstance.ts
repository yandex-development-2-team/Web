import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'
import { toast } from 'sonner'
import { store } from '@/store'
import { logout } from '@/features/auth/authSlice'

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,

  (error: AxiosError) => {
    const status = error.response?.status
    const originalRequest = error.config as CustomAxiosRequestConfig

    if (status === 401) {
      if (originalRequest._retry) {
        store.dispatch(logout())
        toast.error("Сессия истекла", {
          description: "Пожалуйста, войдите заново.",
        })
        window.location.replace('/login')
        return Promise.reject(error)
      }

      originalRequest._retry = true

      return axios
        .post('/auth/refresh', {}, { withCredentials: true })
        .then(() => api(originalRequest))
        .catch(() => {
          store.dispatch(logout())
          toast.error("Не удалось обновить сессию", {
            description: "Пожалуйста, войдите заново.",
          })
          window.location.replace('/login')
          return Promise.reject(error)
        })
    }

    if (status === 403) {
      toast.error("Нет доступа", {
        description: "Недостаточно прав для выполнения действия",
      })
    }

    if (status === 400) {
      const message =
        (error.response?.data as any)?.message ||
        (error.response?.data as any)?.error ||
        'Некорректные данные'

      toast.error("Ошибка валидации", { description: message })
    }

    if (status && status >= 500) {
      toast.error("Ошибка сервера", {
        description: "Что-то пошло не так. Попробуйте позже.",
      })
    }

    if (!error.response) {
      toast.error("Ошибка сети", {
        description: "Проверьте подключение к интернету",
      })
    }

    return Promise.reject(error)
  }
)

export default api
