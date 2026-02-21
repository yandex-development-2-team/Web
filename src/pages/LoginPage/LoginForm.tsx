import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLogin } from '@/hooks/useLogin'
import { Card, CardContent, CardHeader, CardTitle } from '@/pages/LoginPage/ui/Card'
import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'
import { loginSchema, type LoginFormValues } from '@/utils/validators'
import EyeIcon from '@/assets/icons/eye.svg'
import EyeOffIcon from '@/assets/icons/eye-off.svg'

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  const { mutate, isPending } = useLogin()

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { login: '', password: '' },
    mode: 'onChange',
  })

  const onSubmit = (data: LoginFormValues) => {
    mutate(data)
  }

  return (
    <Card variant="flat" className="w-full border-0 rounded-none shadow-none">
      <CardHeader>
        <CardTitle className="mb-12 leading-none">
          Вход
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex flex-col gap-1">
            <Input
              placeholder="Логин"
              aria-invalid={!!errors.login}
              {...register('login')}
              className="h-11 rounded-lg bg-input border-border placeholder:text-border placeholder:italic focus:border-ring focus:ring-0"
            />
            {errors.login && (
              <p className="text-xs text-destructive">
                {errors.login.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <div className="relative mb-1">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Введите пароль"
                aria-invalid={!!errors.password}
                {...register('password')}
                className="h-11 border-border rounded-xl pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                className="absolute right-2 top-1/2 -translate-y-1/2 transition-colors"
              >
                <img
                  src={showPassword ? EyeOffIcon : EyeIcon}
                  alt=""
                  className="w-8 h-8"
                />
              </button>
            </div>

            {errors.password && (
              <p className="text-xs text-destructive">
                {errors.password.message}
              </p>
            )}

            <a
              href="#"
              className="block text-left text-muted-foreground text-xs hover:underline"
            >
              Забыли пароль?
            </a>
          </div>
          <Button
            type="submit"
            disabled={!isValid || isPending}
            className="w-full h-12 mt-5 leading-4 items-center justify-center transition-all duration-200 active:translate-y-[1px]"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <div className="h-5 w-5 border-4 border-t-transparent border-foreground rounded-full animate-spin" />
                Вход...
              </span>
            ) : (
              'Войти'
            )}
          </Button>

        </form>
      </CardContent>
    </Card>
  )
}