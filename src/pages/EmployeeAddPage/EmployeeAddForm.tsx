import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Switch } from '@/components/ui/Switch/Switch';
import { Button } from '@/components/ui/Button';

import { FormCard } from './components/FormCard';
import { Section } from './components/Section';
import { DateInput } from './components/DateInput';
import { UploadPhoto } from './components/UploadPhoto';

import {
  employeeAddSchema as employeeSchema,
  type EmployeeAddFormValues as EmployeeFormValues,
} from '@/utils/validators';

import { useAddEmployee } from '@/hooks/useAddEmployee';
import { Label } from '@/components/ui/Label';

export function EmployeeAddForm() {
  const { mutate: addEmployee, isPending: isSaving } = useAddEmployee();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    mode: 'onChange',
    defaultValues: {
      gender: '',
    },
  });

  const onSubmit = (data: EmployeeFormValues) => {
    addEmployee(data);
  };

  return (
    <FormCard className="mx-auto w-full min-w-[445px] space-y-3 border-0 shadow-none">
      <Section className="pb-4" title="" withIcon={false}>
        <h1 className="ml-4 text-3xl tracking-[0.04em]">Добавить сотрудника</h1>
      </Section>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Первый ряд: Фото + Личные данные */}
        <div className="grid grid-cols-12 gap-5">
          <Section
            className="col-span-3 flex items-start justify-center"
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
          </Section>

          <Section
            className="col-span-9 p-5 pt-3 pl-4"
            title="Персональная информация"
          >
            <div className="grid grid-rows-3 gap-3">
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

        {/* Второй ряд: Паспортные данные + Контакты */}
        <Section className="p-4 pt-0" title="" withIcon={false}>
          <div className="grid grid-cols-8 gap-10 pb-2">
            <Section
              className="col-span-4 space-y-2 border-0 pt-0 pr-0 pb-0 shadow-none"
              title="Паспортные данные"
            >
              <div className="">
                <Label>
                  Гражданство
                  <Select className="mt-1" {...register('citizenship')}>
                    <option value="ru">РФ</option>
                    <option value="kz">Другое</option>
                  </Select>
                </Label>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Label className="">
                  Датa рождения
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
                    defaultValue=""
                    {...register('gender')}
                  >
                    <option value="" disabled>
                      Пол
                    </option>
                    <option value="male">Мужской</option>
                    <option value="female">Женский</option>
                  </Select>
                </Label>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Label>
                  Серия паспорта
                  <Input
                    className="mt-1"
                    placeholder="Серия"
                    error={errors.passportSeries?.message}
                    {...register('passportSeries')}
                  />
                </Label>
                <Label>
                  Номер паспорта
                  <Input
                    className="mt-1"
                    placeholder="Номер"
                    error={errors.passportNumber?.message}
                    {...register('passportNumber')}
                  />
                </Label>
              </div>
            </Section>

            <Section
              className="col-span-3 space-y-2 border-0 pt-0 pr-2 shadow-none"
              title="Контактная информация"
            >
              <Label>
                Номер телефона
                <Input
                  className="mt-1 mb-2"
                  placeholder="+7 (999) 999-66-77"
                  error={errors.phone?.message}
                  {...register('phone')}
                />
              </Label>
              <Label>
                E-mail
                <Input
                  className=""
                  placeholder="E-mail"
                  error={errors.email?.message}
                  {...register('email')}
                />
              </Label>
            </Section>
          </div>
        </Section>

        {/* Третий ряд: Должность + Уровень доступа */}
        <div className="grid grid-cols-12 gap-4">
          <Section
            className="col-span-5 space-y-2 p-5 pt-3 pb-3"
            title="Должностная информация"
          >
            <Label>
              Отдел
              <Select
                size="sm"
                className="mt-1 mb-2"
                defaultValue=""
                {...register('department')}
              >
                <option value="" disabled>
                  Отдел
                </option>
                <option value="department-1">Отдел 1</option>
                <option value="department-2">Отдел 2</option>
              </Select>
            </Label>
            <Label>
              Должность
              <Select
                size="sm"
                className="mt-1 mb-2"
                defaultValue="Должность"
                {...register('position')}
              >
                <option value="Должность" disabled>
                  Должность
                </option>
                <option value="position-1">Должность 1</option>
                <option value="position-2">Должность 2</option>
              </Select>
            </Label>
          </Section>

          <Section
            className="col-span-7 space-y-4 p-5 pt-3 pb-3"
            title="Уровень доступа"
          >
            <div className="grid grid-cols-2 gap-10">
              <div className="border-border mr-9 flex items-center justify-between border-b pb-2">
                <div className="">
                  <p className="text-sm">Администратор</p>
                  <p className="text-xs">Полный доступ</p>
                </div>
                <Controller
                  name="admin"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      className="data-[state=unchecked]:bg-muted [&_[data-slot=switch-thumb]]:data-[state=unchecked]:bg-muted-foreground data-[state=unchecked]:ring-muted-foreground"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
              <div className="border-border mr-3 ml-6 flex items-center justify-between border-b pb-2">
                <div>
                  <p className="text-sm">Менеджер 2 звена</p>
                  <p className="text-xs">Ограниченный доступ</p>
                </div>
                <Controller
                  name="manager1"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      className="data-[state=unchecked]:bg-muted [&_[data-slot=switch-thumb]]:data-[state=unchecked]:bg-muted-foreground data-[state=unchecked]:ring-muted-foreground"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
              <div className="border-border mr-9 flex items-center justify-between border-b pb-2">
                <div>
                  <p className="pb-1 text-sm">Менеджер 1 звена</p>
                  <p className="text-xs">Ограниченный доступ</p>
                </div>
                <Controller
                  name="manager2"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      className="data-[state=unchecked]:bg-muted [&_[data-slot=switch-thumb]]:data-[state=unchecked]:bg-muted-foreground data-[state=unchecked]:ring-muted-foreground"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
              <div className="border-border mr-3 ml-6 flex items-center justify-between border-b pb-2">
                <div>
                  <p className="pb-1 text-sm">Менеджер 3 звена</p>
                  <p className="text-xs">Ограниченный доступ</p>
                </div>
                <Controller
                  name="manager3"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      className="data-[state=unchecked]:bg-muted [&_[data-slot=switch-thumb]]:data-[state=unchecked]:bg-muted-foreground data-[state=unchecked]:ring-muted-foreground"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>
          </Section>
        </div>
      </form>
      {/* Кнопки */}
      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="default-secondary"
          onClick={() => reset()}
        >
          Отменить
        </Button>

        <Button type="submit" disabled={isSaving}>
          {isSaving ? 'Сохранение...' : 'Сохранить'}
        </Button>
      </div>
    </FormCard>
  );
}
