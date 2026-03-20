import { showNotification } from '@/services/notification.service';
import { useState } from 'react';

export function usePreview() {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        showNotification({
          message:
            'Пожалуйста, выберите изображение в формате JPEG, PNG или WebP',
          type: 'info',
        });
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        showNotification({
          message: 'Файл должен быть меньше 2MB',
          type: 'info',
        });
        return;
      }

      if (previewUrl) URL.revokeObjectURL(previewUrl);

      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);
    }
  };

  return { handleFileChange, previewUrl, setPreviewUrl };
}
