import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
  isAuthenticated: boolean
  user: { role: 'admin' | 'manager' | null } | null
  token: string | null
  // другие поля...
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  token: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // ... другие редьюсеры (loginSuccess и т.д.)
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
    },
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
