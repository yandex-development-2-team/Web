import { Controller } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import type { FormProps } from './formTypes';

export function ContactSection({ register, control, errors }: FormProps) {
  return (
    <div className="space-y-3">
      <h3 className="pr-5 pb-1 text-2xl font-bold">Контактная информация</h3>
      <div className="space-y-3 xl:pr-30">
        <Label>
          Номер телефона
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <>
                <IMaskInput
                  mask="+{7} (000) 000-00-00"
                  placeholder="+7 (999) 999-66-77"
                  className="mt-1 h-11 w-full rounded-lg border px-3 italic placeholder:text-sm"
                  name={field.name}
                  value={field.value ?? ''}
                  onBlur={field.onBlur}
                  onAccept={(value) => field.onChange(String(value ?? ''))}
                />
                <span className="min-h-[16px] text-xs text-red-500">
                  {errors.phone?.message}
                </span>
              </>
            )}
          />
        </Label>

        <Label className="flex flex-col pt-3">
          E-mail
          <Input
            className="mt-1"
            error={errors.email?.message}
            placeholder="E-mail"
            {...register('email')}
          />
        </Label>

        <Label className="flex flex-col">
          Место проживания
          <Input
            className="mt-1"
            error={errors.city?.message}
            placeholder="Город"
            {...register('city')}
          />
        </Label>
      </div>
    </div>
  );
}
