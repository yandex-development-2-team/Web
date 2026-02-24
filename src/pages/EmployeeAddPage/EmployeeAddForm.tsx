import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/Input'
import { Select } from '@/components/ui/Select'
import { Switch } from '@/components/ui/Switch/Switch'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'

import { FormCard } from './components/FormCard'
import { Section } from './components/Section'
import { UploadPhoto } from './components/UploadPhoto'

import {
  employeeAddSchema as employeeSchema,
  type EmployeeAddFormValues as EmployeeFormValues,
} from '@/utils/validators'

import { useAddEmployee } from '@/hooks/useAddEmployee'

export function EmployeeAddForm() {
  const { mutate: addEmployee, isPending: isSaving } = useAddEmployee()

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    mode: 'onChange',
  })

  const onSubmit = (data: EmployeeFormValues) => {
    addEmployee(data)
  }

  return (
    <FormCard className="w-full min-w-[445px] border-0 shadow-none mx-auto space-y-6">
      <h1 className="text-2xl font-bold px-6 pt-6">Добавить сотрудника</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-6 pb-6">
        {/* Первый ряд: Фото + Личные данные */}
        <div className="grid grid-cols-12 gap-6">
          <Section className="col-span-4 flex justify-center items-start" title="">
            <Controller
              name="photo"
              control={control}
              render={({ field }) => <UploadPhoto value={field.value} onChange={field.onChange} />}
            />
          </Section>

          <Section className="col-span-8" title="Персональная информация">
            <div className="grid grid-cols-2 gap-4">
              <Input
                placeholder="Фамилия"
                error={errors.lastName?.message}
                {...register('lastName')}
              />
              <Input
                placeholder="Имя"
                error={errors.firstName?.message}
                {...register('firstName')}
              />
              <Input placeholder="Отчество" {...register('middleName')} />
              <Input
                type="date"
                error={errors.birthDate?.message}
                {...register('birthDate')}
              />
            </div>
          </Section>
        </div>

        {/* Второй ряд: Паспортные данные + Контакты */}
        <div className="grid grid-cols-12 gap-6">
          <Section className="col-span-6" title="Паспортные данные">
            <Select placeholder="Гражданство" {...register('citizenship')} />
            <div className="grid grid-cols-2 gap-4 mt-2">
              <Input
                placeholder="Дата рождения"
                type="date"
                error={errors.birthDate?.message}
                {...register('birthDate')}
              />
              <Select placeholder="Пол" {...register('gender')} />
            </div>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <Input
                placeholder="Серия"
                error={errors.passportSeries?.message}
                {...register('passportSeries')}
              />
              <Input
                placeholder="Номер"
                error={errors.passportNumber?.message}
                {...register('passportNumber')}
              />
            </div>
          </Section>

          <Section className="col-span-6" title="Контактная информация">
            <Input
              placeholder="Номер телефона"
              error={errors.phone?.message}
              {...register('phone')}
            />
            <Input
              placeholder="E-mail"
              error={errors.email?.message}
              {...register('email')}
            />
            <Textarea
              placeholder="Адрес проживания"
              error={errors.address?.message}
              {...register('address')}
              className="mt-2"
            />
          </Section>
        </div>

        {/* Третий ряд: Должность + Уровень доступа */}
        <div className="grid grid-cols-12 gap-6">
          <Section className="col-span-6" title="Должностная информация">
            <Select placeholder="Отдел" {...register('department')} />
            <Select placeholder="Должность" {...register('position')} className="mt-2" />
          </Section>

          <Section className="col-span-6" title="Уровень доступа">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Администратор</p>
                  <p className="text-sm text-muted-foreground">Полный доступ</p>
                </div>
                <Controller
                  name="admin"
                  control={control}
                  render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Менеджер 1 звена</p>
                  <p className="text-sm text-muted-foreground">Ограниченный доступ</p>
                </div>
                <Controller
                  name="manager1"
                  control={control}
                  render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Менеджер 2 звена</p>
                  <p className="text-sm text-muted-foreground">Ограниченный доступ</p>
                </div>
                <Controller
                  name="manager2"
                  control={control}
                  render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Менеджер 3 звена</p>
                  <p className="text-sm text-muted-foreground">Ограниченный доступ</p>
                </div>
                <Controller
                  name="manager3"
                  control={control}
                  render={({ field }) => <Switch checked={field.value} onCheckedChange={field.onChange} />}
                />
              </div>
            </div>
          </Section>
        </div>

        {/* Кнопки */}
        <div className="flex justify-end gap-4 mt-4">
          <Button type="button" variant="default-secondary" onClick={() => reset()}>
            Отменить
          </Button>

          <Button type="submit" disabled={isSaving}>
            {isSaving ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </div>
      </form>
    </FormCard>
  )
}