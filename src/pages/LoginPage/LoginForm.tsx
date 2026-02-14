import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/Input/Input'
import { Button } from '@/components/ui/Button/Button'
import { loginSchema, type LoginFormValues } from '@/utils/validators'

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { login: '', password: '' },
    mode: 'onChange',
  })

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success('Вход выполнен', {
        description: `Добро пожаловать, ${data.login}!`,
      })
    } catch {
      toast.error('Ошибка входа', {
        description: 'Неверный логин или пароль',
      })
    } finally {
      setIsLoading(false)
    }
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
                className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
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
            disabled={!isValid || isLoading}
            className="w-full h-12 mt-5 leading-4 items-center justify-center transition-all duration-200 active:translate-y-[1px]"
          >
            {isLoading ? (
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