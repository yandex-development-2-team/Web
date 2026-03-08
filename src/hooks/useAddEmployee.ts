import { useMutation } from '@tanstack/react-query';
import { api } from '@/services/api.service';
import { navigate } from '@/services/navigation.service';
import { ROUTES } from '@/app/router/routes';
import { showNotification } from '@/services/notification.service';
import type { EmployeeAddFormValues } from '@/utils/employeeAddValidator';

type UseAddEmployeeOptions = {
  onSuccess?: () => void;
};

function buildEmployeePayload(data: EmployeeAddFormValues): FormData | EmployeeAddFormValues {
  if (data.photo instanceof File) {
    const formData = new FormData();
    for (const [key, value] of Object.entries(data)) {
      if (key === 'photo') {
        formData.append(key, value);
      } else if (value !== undefined && value !== null) {
        formData.append(key, String(value));
      }
    }
    return formData;
  }
  return data;
}

export const useAddEmployee = (options?: UseAddEmployeeOptions) => {
  return useMutation({
    mutationFn: (data: EmployeeAddFormValues) => {
      const payload = buildEmployeePayload(data);
      return api.post('/employees', payload);
    },
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
