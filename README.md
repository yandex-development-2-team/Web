
# Глобальный обработчик ошибок Axios (Error Handling Provider)

## Описание задачи

Цель: создать **единую точку обработки всех ошибок HTTP-запросов** в приложении, чтобы:

- не писать `try/catch` + `toast` в каждом компоненте
- автоматически показывать красивые уведомления (Sonner) при ошибках
- выполнять logout при 401 (сессия истекла)
- пытаться обновить токен (refresh) перед logout
- централизованно обрабатывать 400, 403, 500+ и сетевые ошибки

**Преимущества реализации:**
- Код компонентов чище и короче
- Все ошибки выглядят одинаково (единый стиль уведомлений)
- Логика выхода из системы и обновления токена в одном месте
- Легко добавлять новые типы ошибок / уведомления

## Технологии

- **Axios** — HTTP-клиент (`axios@^1.13.4`)
- **Sonner** — библиотека для тостов (замена устаревшему shadcn toast)
- **Redux Toolkit** — управление состоянием (для dispatch(logout()))
- **react-router-dom** — для редиректа на /login
- **TypeScript** — строгая типизация

## Структура файлов

```
src/
├── api/
│   └── axiosInstance.ts      ← главный файл (instance + interceptors)
├── features/
│   └── auth/
│       └── authSlice.ts      ← должен содержать reducer logout
├── store.ts                  ← корневой Redux store
└── main.tsx                  ← подключение <Toaster /> от Sonner
```

## Установка зависимостей

Если Sonner ещё не установлен:

```bash
npm install sonner
```

## Подключение Toaster (уведомления)

В `src/main.tsx` обязательно должен быть глобальный `<Toaster />`:

```tsx
import { Toaster } from 'sonner'

// ...

ReactDOM.createRoot(document.getElementById('root')!).render(
 createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster richColors position="top-right" />
    </Provider>
  </StrictMode>,
);
```

Параметры Toaster можно настроить:
- `richColors` — цветные иконки и стили
- `position="top-right"` — место отображения
- `duration={5000}` — время показа (по умолчанию 4000 мс)

## Основной файл: src/api/axiosInstance.ts

```ts
// src/api/axiosInstance.ts

import axios, { AxiosError, type AxiosInstance, type InternalAxiosRequestConfig } from 'axios'
import { toast } from 'sonner'
import { store } from '@/store'
import { logout } from '@/features/auth/authSlice'

// Расширяем тип конфига, чтобы можно было добавить флаг _retry
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

/**
 * Глобальный экземпляр Axios для всех запросов в приложении.
 * Настроен с базовыми параметрами и перехватчиками ошибок.
 */
export const api: AxiosInstance = axios.create({
  /**
   * Базовый URL API.
   * Берётся из переменной окружения VITE_API_URL.
   * Если переменная не задана — fallback на '/api' (удобно для прокси в Vite).
   */
  baseURL: import.meta.env.VITE_API_URL || '/api',

  // Отправляем cookies автоматически (для сессии и refresh-токена)
  withCredentials: true,

  // Таймаут запроса — чтобы не висеть вечно при проблемах с сетью
  timeout: 15000,

  // Дефолтный Content-Type для JSON API
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Перехватчик ответов — единая обработка ВСЕХ ошибок от сервера
 *
 * Логика:
 * - 401 → пытаемся обновить токен → если не получилось → logout + редирект
 * - 403 → уведомление "Нет доступа"
 * - 400 → показываем сообщение валидации от сервера
 * - 500+ → общее сообщение об ошибке сервера
 * - Сетевые ошибки → "Ошибка сети"
 */
api.interceptors.response.use(
  // Успешный ответ — просто возвращаем
  (response) => response,

  // Обработчик ошибок (без async, используем .catch())
  (error: AxiosError) => {
    const status = error.response?.status
    const originalRequest = error.config as CustomAxiosRequestConfig

    // ─── 401 Unauthorized ───────────────────────────────────────
    if (status === 401) {
      // Если уже пытались обновить токен — значит refresh тоже провалился
      if (originalRequest._retry) {
        // Выполняем выход из системы через Redux
        store.dispatch(logout())

        // Показываем уведомление пользователю
        toast.error("Сессия истекла", {
          description: "Пожалуйста, войдите заново.",
        })

        // Редирект на страницу логина
        window.location.replace('/login')

        return Promise.reject(error)
      }

      // Помечаем, что уже пытались обновить
      originalRequest._retry = true

      // Пытаемся обновить токен (refresh endpoint) через .catch()
      return axios
        .post('/auth/refresh', {}, { withCredentials: true })
        .then(() => api(originalRequest)) // Если успешно — повторяем исходный запрос
        .catch(() => {
          // Refresh не удался → logout + уведомление
          store.dispatch(logout())

          toast.error("Не удалось обновить сессию", {
            description: "Пожалуйста, войдите заново.",
          })

          window.location.replace('/login')

          return Promise.reject(error)
        })
    }

    // ─── 403 Forbidden ──────────────────────────────────────────
    if (status === 403) {
      toast.error("Нет доступа", {
        description: "Недостаточно прав для выполнения действия",
      })
    }

    // ─── 400 Bad Request ────────────────────────────────────────
    if (status === 400) {
      const message =
        (error.response?.data as any)?.message ||
        (error.response?.data as any)?.error ||
        'Некорректные данные'

      toast.error("Ошибка валидации", { description: message })
    }

    // ─── 500+ Server Error ──────────────────────────────────────
    if (status && status >= 500) {
      toast.error("Ошибка сервера", {
        description: "Что-то пошло не так. Попробуйте позже.",
      })
    }

    // ─── Сетевые ошибки (нет ответа) ───────────────────────────
    if (!error.response) {
      toast.error("Ошибка сети", {
        description: "Проверьте подключение к интернету",
      })
    }

    // Пробрасываем ошибку дальше (для локального catch, если нужно)
    return Promise.reject(error)
  }
)

export default api
```
## Файл состояния авторизации: src/features/auth/authSlice.ts

Этот файл содержит Redux-слайс для управления состоянием авторизации.  
В нём должно быть действие `logout`, которое очищает данные пользователя.

```ts
// src/features/auth/authSlice.ts

import { createSlice } from '@reduxjs/toolkit'

/**
 * Интерфейс состояния авторизации
 */
interface AuthState {
  isAuthenticated: boolean          // авторизован ли пользователь
  user: { role: 'admin' | 'manager' | null } | null  // данные пользователя (роль)
  token: string | null              // JWT-токен (если храним в Redux)
  // Можно добавить: loading, error и т.д.
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    // ... здесь могут быть loginSuccess, setUser и другие действия

    /**
     * Действие выхода из системы
     * Очищает все данные авторизации в Redux
     * Вызывается автоматически при 401 (если refresh не удался)
     */
    logout: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.token = null
      // Если токен хранится в localStorage — очищаем
      localStorage.removeItem('token')
      // Если используется cookies — они очищаются сервером при /auth/logout
    },
  },

  // extraReducers: для async thunks (login, refresh) — если используешь
})

export const { logout } = authSlice.actions
export default authSlice.reducer
```

## Файл Redux store: src/store.ts

Корневой файл конфигурации Redux store.

```ts
// src/store.ts

import { configureStore } from '@reduxjs/toolkit'
import authReducer from '@/features/auth/authSlice'

/**
 * Глобальный Redux store приложения
 */
export const store = configureStore({
  reducer: {
    // Регистрируем слайс авторизации
    auth: authReducer,
    // Здесь будут другие редьюсеры (users, settings и т.д.)
  },

  // В production можно отключить devTools
  devTools: process.env.NODE_ENV !== 'production',
})

/**
 * Тип состояния всего приложения (для useSelector)
 */
export type RootState = ReturnType<typeof store.getState>

/**
 * Тип dispatch-функции (для useDispatch)
 */
export type AppDispatch = typeof store.dispatch
```

## Как использовать

```tsx
import { api } from '@/api/axiosInstance'

// В компоненте или в thunk
const fetchUsers = async () => {
  try {
    const { data } = await api.get('/users')
    // успех
  } catch (err) {
    // toast уже показан в interceptor — здесь можно просто залогировать
    console.error('Не удалось загрузить пользователей:', err)
  }
}
```

## Тестирование

1. **401** — временно изменить статус в mock-сервере или добавь тестовый запрос
2. **403** — запрос на защищённый маршрут без прав
3. **400** — отправить некорректные данные
4. **Сеть** — отключить интернет
