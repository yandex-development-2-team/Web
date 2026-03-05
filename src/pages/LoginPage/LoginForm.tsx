import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '@/hooks/useLogin';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/pages/LoginPage/ui/Card';
import { Input } from '@/components/ui/Input/Input';
import { Button } from '@/components/ui/Button/Button';
import { loginSchema, type LoginFormValues } from '@/utils/loginValidators';
import EyeIcon from '@/assets/icons/eye.svg';
import EyeOffIcon from '@/assets/icons/eye-off.svg';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { login: '', password: '' },
    mode: 'onChange',
  });

  const onSubmit = (data: LoginFormValues) => {
    mutate(data);
  };

  return (
    <Card variant="flat" className="w-full rounded-none border-0 shadow-none">
      <CardHeader>
        <CardTitle className="mb-12 leading-none">Вход</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex flex-col gap-1">
            <Input
              placeholder="Логин"
              aria-invalid={!!errors.login}
              {...register('login')}
              className="bg-input border-border placeholder:text-border focus:border-ring h-11 rounded-lg placeholder:italic focus:ring-0"
            />
            {errors.login && (
              <p className="text-destructive text-xs">{errors.login.message}</p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <div className="relative mb-1">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Введите пароль"
                aria-invalid={!!errors.password}
                {...register('password')}
                className="border-border h-11 rounded-xl pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute top-1/2 right-2 -translate-y-1/2 transition-colors"
              >
                <img
                  src={showPassword ? EyeOffIcon : EyeIcon}
                  alt=""
                  className="h-8 w-8"
                />
              </button>
            </div>

            {errors.password && (
              <p className="text-destructive text-xs">
                {errors.password.message}
              </p>
            )}

            <a
              href="#"
              className="text-muted-foreground block text-left text-xs hover:underline"
            >
              Забыли пароль?
            </a>
          </div>
          <Button
            type="submit"
            disabled={!isValid || isPending}
            className="mt-5 h-12 w-full items-center justify-center leading-4 transition-all duration-200 active:translate-y-[1px]"
          >
            {isPending ? (
              <span className="flex items-center gap-2">
                <div className="border-foreground h-5 w-5 animate-spin rounded-full border-4 border-t-transparent" />
                Вход...
              </span>
            ) : (
              'Войти'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
