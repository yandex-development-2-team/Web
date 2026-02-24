import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Button } from '@/components/ui/Button'
import { showNotification } from '@/services/notification.service'
import { ROUTES } from '@/app/router'
import { navigate } from '@/services/navigation.service'

import {
  employeeAddSchema as employeeSchema,
  type EmployeeAddFormValues as EmployeeFormValues,
} from '@/utils/validators'
import { FormCard } from './components/FormCard'
import { UploadPhoto } from './components/UploadPhoto'
import { Section } from './components/Section'

export function EmployeeAddForm() {
  const [isSaving, setIsSaving] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeSchema),
    mode: 'onChange',
  })

  const onSubmit = async (_data: EmployeeFormValues) => {
    setIsSaving(true)

    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      showNotification({
        type: 'success',
        message: 'Сотрудник успешно добавлен',
      })

      navigate(ROUTES.HOME)
    } catch {
      showNotification({
        type: 'error',
        message: 'Ошибка сохранения',
      })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <FormCard className="max-w-3xl mx-auto space-y-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Section title="Фото">
          <UploadPhoto
            value={watch('photo')}
            onChange={file => setValue('photo', file)}
          />
        </Section>

        <Section title="Личные данные">
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
            <Input
              placeholder="Отчество"
              {...register('middleName')}
            />
            <Input
              type="date"
              error={errors.birthDate?.message}
              {...register('birthDate')}
            />
          </div>
        </Section>

        <Section title="Паспорт">
          <div className="grid grid-cols-2 gap-4">
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

        <Section title="Контакты">
          <div className="grid grid-cols-2 gap-4">
            <Input
              placeholder="+7 (___) ___-__-__"
              error={errors.phone?.message}
              {...register('phone')}
            />
            <Input
              placeholder="E-mail"
              error={errors.email?.message}
              {...register('email')}
            />
          </div>
          <Textarea
            placeholder="Адрес проживания"
            error={errors.address?.message}
            {...register('address')}
          />
        </Section>

        <div className="flex justify-end gap-4">
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
      </form>
    </FormCard>
  )
}
