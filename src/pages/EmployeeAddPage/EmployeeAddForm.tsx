import {
  useForm,
  Controller,
  type Control,
  type UseFormRegister,
  type FieldErrors,
  type Resolver,
} from 'react-hook-form';
import { IMaskInput } from 'react-imask';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Switch } from '@/components/ui/Switch/Switch';
import { Button } from '@/components/ui/Button';
import { Label } from '@/components/ui/Label';
import { FormCard } from './components/FormCard';
import { Section } from './components/Section';
import { DateInput } from './components/DateInput';
import { UploadPhoto } from './components/UploadPhoto';

import { useAddEmployee } from '@/hooks/useAddEmployee';

import {
  employeeAddSchema,
  type EmployeeAddFormValues,
} from '@/utils/employeeAddValidator';

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

type FormProps = {
  register: UseFormRegister<EmployeeAddFormValues>;
  control: Control<EmployeeAddFormValues>;
  errors: FieldErrors<EmployeeAddFormValues>;
};

const AccessSwitch = ({
  name,
  control,
}: {
  name: keyof EmployeeAddFormValues;
  control: Control<EmployeeAddFormValues>;
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field }) => (
      <Switch
        className="data-[state=unchecked]:bg-muted [&_[data-slot=switch-thumb]]:data-[state=unchecked]:bg-muted-foreground data-[state=unchecked]:ring-muted-foreground"
        checked={field.value}
        onCheckedChange={field.onChange}
      />
    )}
  />
);

const TwoColGrid: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className="grid grid-cols-2 gap-2 pt-1">{children}</div>
);

/* -------------------------------------------------------------------------- */
/*                                 Subsections                                */
/* -------------------------------------------------------------------------- */

const PersonalSection = ({ register, control, errors }: FormProps) => (
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
      {errors.photo?.message && typeof errors.photo.message === 'string' && (
        <p className="text-sm text-red-500 mt-2">{errors.photo.message}</p>
      )}
    </Section>

    <Section
      className="col-span-9 p-5 pt-3 pl-4"
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
          <Input className="mt-1" placeholder="Отчество" {...register('middleName')} />
        </Label>
      </div>
    </Section>
  </div>
);

const PassportContactSection = ({ register, control, errors }: FormProps) => (
  <Section className="p-4 pt-0" title="" withIcon={false}>
    <div
      className="
      grid 
      grid-cols-1
      gap-y-6
      lg:grid-cols-8
      lg:gap-x-10
      pb-2
    "
    >
      <Section
        className="
        lg:col-span-4
        space-y-2
        border-0
        pt-0
        pr-0
        pb-0
        shadow-none
      "
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
            <Select className="mt-1" {...register('gender')}>
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
            <span className="text-xs text-red-500 min-h-[16px]">
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
            <span className="text-xs text-red-500 min-h-[16px]">
              {errors.passportNumber?.message}
            </span>
          </Label>
        </TwoColGrid>
      </Section>

      <Section
        className="
        lg:col-span-3
        space-y-2
        border-0
        pt-0
        shadow-none
      "
        title="Контактная информация"
      >
        <Label>
          Номер телефона
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <IMaskInput
                {...field}
                mask="+{7} (000) 000-00-00"
                placeholder="+7 (999) 999-66-77"
                className="mt-1 h-11 mb-2 w-full border rounded-lg placeholder:text-sm italic px-2 py-1" // адаптируйте стили под Input
              />
            )}
          />
        </Label>

        <Label>
          E-mail
          <Input error={errors.email?.message} placeholder="E-mail" {...register('email')} />
        </Label>
      </Section>
    </div>
  </Section>
);

const PositionSection = ({ register }: FormProps) => (
  <Section
    className="col-span-12 lg:col-span-5 p-5 pt-3 pb-4"
    title="Должностная информация"
  >
    <div className="flex flex-col gap-4">
      <Label className="flex flex-col">
        Отдел
        <Select size="sm" {...register('department')}>
          <option value="department-1">Отдел</option>
          <option value="department-1">Отдел 1</option>
          <option value="department-2">Отдел 2</option>
        </Select>
      </Label>

      <Label className="flex flex-col gap-1">
        Должность
        <Select size="sm" {...register('position')}>
          <option value="position-1">Должность</option>
          <option value="position-1">Должность 1</option>
          <option value="position-2">Должность 2</option>
        </Select>
      </Label>
    </div>
  </Section>
);

const AccessSection = ({ control }: FormProps) => (
  <Section
    className="col-span-12  lg:col-span-7 p-5 pt-3"
    title="Уровень доступа"
  >
    <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-[clamp(10px,1vw,3vw)] xl:gap-x-22 md:gap-x-5 gap-y-9">
      {[
        { name: 'admin', title: 'Администратор', desc: 'Полный доступ' },
        { name: 'manager1', title: 'Менеджер 2 звена', desc: 'Ограниченный доступ' },
        { name: 'manager2', title: 'Менеджер 1 звена', desc: 'Ограниченный доступ' },
        { name: 'manager3', title: 'Менеджер 3 звена', desc: 'Ограниченный доступ' },
      ].map(({ name, title, desc }) => (
        <div
          key={name}
          className="border-border flex items-center justify-between border-b pb-2 mr-3"
        >
          <div className="min-w-0 space-y-1">
            <p className="text-sm truncate">{title}</p>
            <p className="text-xs text-muted-foreground">{desc}</p>
          </div>

          <AccessSwitch
            name={name as keyof EmployeeAddFormValues}
            control={control}
          />
        </div>
      ))}
    </div>
  </Section>
);

/* -------------------------------------------------------------------------- */
/*                                  Main Form                                 */
/* -------------------------------------------------------------------------- */

export function EmployeeAddForm() {
  const { mutate: addEmployee, isPending: isSaving } = useAddEmployee();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<EmployeeAddFormValues>({
    resolver: zodResolver(employeeAddSchema) as Resolver<EmployeeAddFormValues>,
    mode: 'onChange',
    defaultValues: {
      gender: '',
      admin: false,
      manager1: false,
      manager2: false,
      manager3: false,
    },
  });

  const onSubmit = (data: EmployeeAddFormValues) => {
    addEmployee(data);
  };

  return (
    <FormCard className="mx-auto w-full min-w-[445px] space-y-3 border-0 shadow-none">
      <Section className="pb-4" title="" withIcon={false}>
        <h1 className="ml-4 text-3xl tracking-[0.04em]">Добавить сотрудника</h1>
      </Section>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <PersonalSection register={register} control={control} errors={errors} />
        <PassportContactSection register={register} control={control} errors={errors} />

        <div className="grid grid-cols-12 gap-y-5 lg:gap-x-3 mb-3">
          <PositionSection register={register} control={control} errors={errors} />
          <AccessSection register={register} control={control} errors={errors} />
        </div>

        <div className="flex justify-end gap-3">
          <Button type="button" variant="default-secondary" onClick={() => reset()}>
            Отменить
          </Button>

          <Button type="submit" disabled={isSaving}>
            {isSaving ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </div>
      </form>
    </FormCard>
  );
}