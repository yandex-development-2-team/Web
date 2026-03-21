import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadFile } from '@/services/uploadFile.service';
import { showNotification } from '@/services/notification.service';

export const useFileUpload = () => {
  const queryClient = useQueryClient();

  const { mutate, isPending, error } = useMutation({
    mutationFn: uploadFile,
    onSuccess: () => {
      showNotification({ message: 'Файл успешно загружен!', type: 'success' });

      queryClient.invalidateQueries({ queryKey: ['files', 'list'] });
    },
    onError: () => {
      showNotification({
        message: 'Ошибка при загрузке файла!',
        type: 'error',
      });
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const allowedExtensions = ['pdf', 'doc', 'docx'];
    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (fileExtension && !allowedExtensions.includes(fileExtension)) {
      showNotification({
        message: 'Этот формат файла не поддерживается!',
        type: 'error',
      });
      event.target.value = '';
      return;
    }
    mutate(file);
    event.target.value = '';
  };

  return { handleFileChange, isPending, error };
};
