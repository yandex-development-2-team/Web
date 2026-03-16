import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { FormCard } from './components/FormCard';
import { Section } from './components/Section';
import { PersonalSection } from './components/PersonalSection';
import { ContactSection } from './components/ContactSection';
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
        <PersonalSection
          register={register}
          control={control}
          errors={errors}
        />
        <Section
          className="p-5 lg:p-10 lg:pt-1 lg:pb-5"
          title=""
          withIcon={false}
        >
          <div className="grid grid-cols-1 gap-y-6 lg:grid-cols-2 lg:gap-x-12">
            <ContactSection
              register={register}
              control={control}
              errors={errors}
            />
            <PositionSection
              register={register}
              control={control}
              errors={errors}
            />
          </div>
        </Section>

        <AccessSection register={register} control={control} errors={errors} />

        <div className="flex justify-end gap-3">
          <Button
            className="h-11"
            type="button"
            variant="default-secondary"
            onClick={() => reset()}
          >
            Отменить
          </Button>

          <Button className="h-11" type="submit" disabled={isSaving}>
            {isSaving ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </div>
      </form>
    </FormCard>
  );
}
