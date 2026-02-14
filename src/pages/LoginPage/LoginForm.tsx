import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { loginSchema, type LoginFormValues } from '@/utils/validators'

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="text-sm text-destructive mt-1">{message}</p>
}

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors, isValid } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { login: '', password: '' },
    mode: 'onChange',
  })

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success('Вход выполнен', { description: `Добро пожаловать, ${data.login}!` })
    } catch {
      toast.error('Ошибка входа', { description: 'Неверный логин или пароль' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card variant="flat" className="w-full border-0 rounded-none shadow-none">
      <CardHeader className="">
        <CardTitle className="mb-13">
          Вход
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Login */}
          <div className="">
            <Input
              id="login"
              placeholder="Логин"
              aria-invalid={!!errors.login}
              {...register('login')}
              className="rounded-lg h-11"
            />
            <FieldError message={errors.login?.message} />
          </div>

          {/* Password */}
          <div className="">
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Введите пароль"
                aria-invalid={!!errors.password}
                {...register('password')}
                className="rounded-xl h-11 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            <FieldError message={errors.password?.message} />
            <div className="text-left mt-1">
              <a
                href="#"
                className="block text-xs text-muted-foreground hover:underline"
              >
                Забыли пароль?
              </a>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            size="lg"
            disabled={!isValid || isLoading}
            className="w-full h-12 mt-5  font-semibold text-base leading-4 items-center justify-center transition-all duration-200 active:translate-y-[1px]"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <div className="h-5 w-5 border-5 border-t-transparent border-foreground rounded-full animate-spin" />
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
