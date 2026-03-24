import { useMutation } from '@tanstack/react-query';
import { navigate } from '@/services/navigation.service';
import { employeeCardPath } from '@/app/router/routes';
import { showNotification } from '@/services/notification.service';
import type { EmployeeAddFormValues } from '@/utils/employeeAddValidator';

type UseEditEmployeeOptions = { onSuccess?: () => void; employeeId: string };

export const useEditEmployee = (options?: UseEditEmployeeOptions) => {
  return useMutation({
    mutationFn: async (data: EmployeeAddFormValues) => {
      // В этой задаче только сбор данных формы, без отправки на бэк.
      return Promise.resolve(data);
    },
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: 'Изменения успешно сохранены',
      });
      navigate(employeeCardPath(options?.employeeId ?? '1'));
      options?.onSuccess?.();
    },
    onError: () => {
      showNotification({ type: 'error', message: 'Ошибка сохранения' });
    },
  });
};
