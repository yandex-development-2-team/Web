import type { Control, FieldErrors, UseFormRegister } from 'react-hook-form';
import type { EmployeeAddFormValues } from '@/utils/employeeAddValidator';

export type FormProps = {
  register: UseFormRegister<EmployeeAddFormValues>;
  control: Control<EmployeeAddFormValues>;
  errors: FieldErrors<EmployeeAddFormValues>;
};
