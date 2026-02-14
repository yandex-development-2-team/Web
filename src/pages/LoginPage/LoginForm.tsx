import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Eye, EyeOff } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils'
import { toast } from 'sonner'

// Схема валидации
const loginSchema = z.object({
  login: z.string().min(1, 'Логин обязателен'),
  password: z
    .string()
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .regex(/[A-Za-z]/, 'Пароль должен содержать хотя бы одну букву')
    .regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру'),
})

type LoginFormValues = z.infer<typeof loginSchema>

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
      toast.success('Вход выполнен', { description: `Добро пожаловать, ${data.login}!` })
      // Здесь будет редирект: navigate('/dashboard')
    } catch (err) {
      toast.error('Ошибка входа', { description: 'Неверный логин или пароль' })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className={cn(
      'w-full border-0 rounded-none shadow-none'
    )}>
      <CardHeader className="space-y-2 text-left">
        <CardTitle className="text-[32px] font-bold tracking-normal text-foreground leading-none mb-4">
          Вход
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Input
              id="login"
              placeholder="Логин"
              {...register('login')}
              className={cn(
                'h-11 bg-foreground border-border rounded-lg text-foreground placeholder:text-border  placeholder:italic focus:border-ring focus:ring-0 focus-visible:ring-0 transition-all',
                'aria-invalid:border-[#F43331] aria-invalid:focus:border-[#F43331]',
              )}
            />
            {errors.login && <p className="text-sm text-red-400 mt-1">{errors.login.message}</p>}
          </div>

          <div className="space-y-1">
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Введите пароль"
                {...register('password')}
                className={cn(
                  'h-11 bg-foreground border-border rounded-xl text-foreground placeholder:text-border  placeholder:italic focus:border-ring focus:ring-0 focus-visible:ring-0 transition-all pr-10',
                  'aria-invalid:border-[#F43331] aria-invalid:ring-[#F43331]/30 aria-invalid:ring-8 aria-invalid:focus:border-[#F43331]',
                )}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {errors.password && <p className="text-sm text-red-400 mt-1">{errors.password.message}</p>}

            <div className="text-left mt-1">
              <a
                href="#"
                className="
                   block h-4
                   font-open-sans font-normal text-xs leading-4
                   text-muted-foreground
                   hover:underline
                   "
              >
                Забыли пароль?
              </a>
            </div>
          </div>

          <Button
            type="submit"
            className={cn(
              'w-full h-12 mt-5 font-open-sans font-semibold text-base leading-4 items-center justify-center transition-all duration-200',
              'bg-primary text-foreground hover:bg-accent active:bg-accent-strong active:translate-y-[1px] shadow-md shadow-accent active:shadow-sm',
              'disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed disabled:shadow-none disabled:opacity-100'
            )}
            disabled={!isValid || isLoading}
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