import { EmployeeAddForm } from '@/pages/EmployeeAddPage';
import { useEditEmployee } from '@/hooks/useEditEmployee';
import type { EmployeeAddFormValues } from '@/utils/employeeAddValidator';
import { useParams } from 'react-router';

export function EmployeeEditForm() {
  const { id = '1' } = useParams();
  const { mutate: editEmployee, isPending } = useEditEmployee({
    employeeId: id,
  });

  return (
    <EmployeeAddForm
      title="Редактировать сотрудника"
      isSaving={isPending}
      onSubmit={(data: EmployeeAddFormValues) => editEmployee(data)}
    />
  );
}
