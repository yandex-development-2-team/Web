import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { FormCard } from './components/FormCard';
import { Section } from './components/Section';
import { PersonalSection } from './components/PersonalSection';
import { PassportContactSection } from './components/PassportContactSection';
import { PositionSection } from './components/PositionSection';
import { AccessSection } from './components/AccessSection';
import { useAddEmployee } from '@/hooks/useAddEmployee';
import { employeeAddSchema } from '@/utils/employeeAddValidator';
import type { EmployeeAddFormValues } from '@/utils/employeeAddValidator';

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
      phone: '',
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
        <PassportContactSection
          register={register}
          control={control}
          errors={errors}
        />

        <div className="grid grid-cols-12 gap-y-5 mb-3 lg:gap-x-3">
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
