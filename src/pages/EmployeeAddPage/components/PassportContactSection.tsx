import type { PropsWithChildren } from 'react';
import { Controller } from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';
import { Section } from './Section';
import { DateInput } from './DateInput';
import type { FormProps } from './formTypes';

function TwoColGrid({ children }: PropsWithChildren) {
  return <div className="grid grid-cols-2 gap-2 pt-1">{children}</div>;
}

export function PassportContactSection({ register, control, errors }: FormProps) {
  return (
    <Section className="p-4 pt-0" title="" withIcon={false}>
      <div className="grid grid-cols-1 gap-y-6 pb-2 lg:grid-cols-8 lg:gap-x-10">
        <Section
          className="space-y-2 border-0 pt-0 pr-0 pb-0 shadow-none lg:col-span-4"
          title="Паспортные данные"
        >
          <Label>
            Гражданство
            <Select className="mt-1 mb-2" {...register('citizenship')}>
              <option value="ru">РФ</option>
              <option value="other">Другое</option>
            </Select>
          </Label>

          <TwoColGrid>
            <Label>
              Дата рождения
              <DateInput
                className="mt-1"
                error={errors.birthDate?.message}
                {...register('birthDate')}
              />
            </Label>

            <Label>
              Пол
              <Select
                className="mt-1"
                error={errors.gender?.message}
                {...register('gender')}
              >
                <option value="" disabled>
                  Пол
                </option>
                <option value="male">Мужской</option>
                <option value="female">Женский</option>
              </Select>
            </Label>
          </TwoColGrid>

          <TwoColGrid>
            <Label>
              Серия паспорта
              <Input
                className="mt-1"
                inputMode="numeric"
                maxLength={4}
                placeholder="Серия"
                {...register('passportSeries')}
              />
              <span className="min-h-[16px] text-xs text-red-500">
                {errors.passportSeries?.message}
              </span>
            </Label>

            <Label>
              Номер паспорта
              <Input
                className="mt-1"
                inputMode="numeric"
                maxLength={6}
                placeholder="Номер"
                {...register('passportNumber')}
              />
              <span className="min-h-[16px] text-xs text-red-500">
                {errors.passportNumber?.message}
              </span>
            </Label>
          </TwoColGrid>
        </Section>

        <Section
          className="space-y-2 border-0 pt-0 shadow-none lg:col-span-3"
          title="Контактная информация"
        >
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

          <Label className="mt-2 flex flex-col">
            E-mail
            <Input
              className="mt-1"
              error={errors.email?.message}
              placeholder="E-mail"
              {...register('email')}
            />
          </Label>
        </Section>
      </div>
    </Section>
  );
}
