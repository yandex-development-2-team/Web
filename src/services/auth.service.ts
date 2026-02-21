import { api } from '@/services/api.service'
import type { LoginFormValues } from '@/utils/validators'

export const login = async (data: LoginFormValues) => {
  const response = await api.post('/auth/login', data)
  return response.data
}