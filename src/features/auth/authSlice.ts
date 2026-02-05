import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
  user: unknown
  isAuthenticated: boolean
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
    },
  },
})

export const { logout } = authSlice.actions
export default authSlice.reducer
