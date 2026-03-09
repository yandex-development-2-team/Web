import { useMutation } from '@tanstack/react-query';
import { navigate } from '@/services/navigation.service';
import { ROUTES } from '@/app/router/routes';
import { showNotification } from '@/services/notification.service';
import type { EmployeeAddFormValues } from '@/utils/employeeAddValidator';

type UseAddEmployeeOptions = { onSuccess?: () => void };

export const useAddEmployee = (options?: UseAddEmployeeOptions) => {
  return useMutation({
    mutationFn: async (data: EmployeeAddFormValues) => {
      // В этой задаче только сбор данных формы, без отправки на бэк.
      return Promise.resolve(data);
    },
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: 'Сотрудник успешно добавлен',
      });
      navigate(ROUTES.EMPLOYEE_CARD);
      options?.onSuccess?.();
    },
    onError: () => {
      showNotification({ type: 'error', message: 'Ошибка сохранения' });
    },
  });
};
