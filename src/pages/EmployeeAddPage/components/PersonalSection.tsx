import { Controller } from 'react-hook-form';
import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { Section } from './Section';
import { UploadPhoto } from './UploadPhoto';
import type { FormProps } from './formTypes';

export function PersonalSection({ register, control, errors }: FormProps) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
      <Section
        className="flex items-center justify-center lg:col-span-3"
        title=""
        withIcon={false}
      >
        <Controller
          name="photo"
          control={control}
          render={({ field }) => (
            <UploadPhoto value={field.value} onChange={field.onChange} />
          )}
        />
        {errors.photo?.message && typeof errors.photo.message === 'string' && (
          <p className="mt-2 text-sm text-red-500">{errors.photo.message}</p>
        )}
      </Section>

      <Section
        className="p-5 pt-3 pl-4 lg:col-span-9"
        title="Персональная информация"
      >
        <div className="flex flex-col gap-3">
          <Label>
            Фамилия
            <Input
              className="mt-1"
              placeholder="Фамилия"
              error={errors.lastName?.message}
              {...register('lastName')}
            />
          </Label>

          <Label>
            Имя
            <Input
              className="mt-1"
              placeholder="Имя"
              error={errors.firstName?.message}
              {...register('firstName')}
            />
          </Label>

          <Label>
            Отчество
            <Input
              className="mt-1"
              placeholder="Отчество"
              {...register('middleName')}
            />
          </Label>
        </div>
      </Section>
    </div>
  );
}
