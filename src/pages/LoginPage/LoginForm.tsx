import { useState } from 'react'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'


// ----------------------
// Validation Schema
// ----------------------

const loginSchema = z.object({
  login: z.string().min(1, 'Логин обязателен'),
  password: z
    .string()
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .regex(/[A-Za-z]/, 'Пароль должен содержать хотя бы одну букву')
    .regex(/[0-9]/, 'Пароль должен содержать хотя бы одну цифру'),
})

type LoginFormValues = z.infer<typeof loginSchema>

// ----------------------
// Reusable constants
// ----------------------

const baseInputClass =
  'h-11 bg-foreground border-border text-foreground placeholder:text-border placeholder:italic focus:border-ring focus:ring-0 focus-visible:ring-0 transition-all'

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="text-sm text-destructive mt-1">{message}</p>
}

// ----------------------
// Component
// ----------------------

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

      // TODO: navigate('/dashboard')
    } catch {
      toast.error('Ошибка входа', {
        description: 'Неверный логин или пароль',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full border-0 rounded-none shadow-none">
      <CardHeader className="space-y-2 text-left">
        <CardTitle className="text-[32px] font-bold tracking-normal text-foreground leading-none mb-4">
          Вход
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Login */}
          <div className="space-y-2">
            <Input
              id="login"
              placeholder="Логин"
              aria-invalid={!!errors.login}
              {...register('login')}
              className={`${baseInputClass} rounded-lg aria-invalid:border-destructive aria-invalid:focus:border-destructive`}
            />
            <FieldError message={errors.login?.message} />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Введите пароль"
                aria-invalid={!!errors.password}
                {...register('password')}
                className={`${baseInputClass} rounded-xl pr-10 aria-invalid:border-destructive aria-invalid:focus:border-destructive`}
              />

              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground
 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <FieldError message={errors.password?.message} />

            <div className="text-left mt-1">
              <a
                href="#"
                className="
                  block h-4
                  font-sans font-normal text-xs leading-4
                  text-muted-foreground
                  hover:underline
                "
              >
                Забыли пароль?
              </a>
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            disabled={!isValid || isLoading}
            className="
              w-full h-12 mt-5 font-sans font-semibold text-base leading-4 
              items-center justify-center transition-all duration-200
              bg-primary text-foreground hover:bg-accent active:bg-accent-strong 
              active:translate-y-[1px]
              disabled:bg-muted disabled:text-muted-foreground 
              disabled:cursor-not-allowed disabled:shadow-none disabled:opacity-100
            "
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
