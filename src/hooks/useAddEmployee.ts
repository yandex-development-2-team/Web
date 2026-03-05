import { useMutation } from '@tanstack/react-query';
import { api } from '@/services/api.service';
import { navigate } from '@/services/navigation.service';
import { ROUTES } from '@/app/router/routes';
import { showNotification } from '@/services/notification.service';
import type { EmployeeAddFormValues } from '@/utils/employeeAddValidator';

type UseAddEmployeeOptions = {
  onSuccess?: () => void;
};

export const useAddEmployee = (options?: UseAddEmployeeOptions) => {
  return useMutation({
    mutationFn: (data: EmployeeAddFormValues) => api.post('/employees', data),
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: 'Сотрудник успешно добавлен',
      });
      navigate(ROUTES.HOME);
      options?.onSuccess?.();
    },
    onError: () => {
      showNotification({ type: 'error', message: 'Ошибка сохранения' });
    },
  });
};
