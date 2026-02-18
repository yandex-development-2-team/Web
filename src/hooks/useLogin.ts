import { useMutation } from '@tanstack/react-query'
import { login } from '@/services/auth.service'
import { navigate } from '@/services/navigation.service'
import { ROUTES } from '@/app/router/routes.ts'

export const useLogin = () => {
    return useMutation({
        mutationFn: login,
        onSuccess: () => {
            navigate(ROUTES.HOME)
        },
    })
}