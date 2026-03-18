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

type Props = {
  title?: string;
  onSubmit?: (data: EmployeeAddFormValues) => void;
  isSaving?: boolean;
};

function EmployeeForm({
  title,
  onSubmit,
  isSaving = false,
}: {
  title: string;
  onSubmit: (data: EmployeeAddFormValues) => void;
  isSaving?: boolean;
}) {
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

  return (
    <FormCard className="mx-auto w-full min-w-[445px] space-y-3 border-0 shadow-none">
      <Section className="pb-4" title="" withIcon={false}>
        <h1 className="ml-4 text-3xl tracking-[0.04em]">{title}</h1>
      </Section>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
        noValidate
      >
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

export function EmployeeAddForm({
  title = 'Добавить сотрудника',
  onSubmit,
  isSaving,
}: Props) {
  const { mutate: addEmployee, isPending } = useAddEmployee();

  const submit = onSubmit ?? ((data: EmployeeAddFormValues) => addEmployee(data));
  const saving = isSaving ?? isPending;

  return <EmployeeForm title={title} isSaving={saving} onSubmit={submit} />;
}
