import { showNotification } from '@/services/notification.service';
import axios from 'axios';

export async function deleteItemById(id: string | number) {
  return axios
    .delete(`PATH/${id}`)
    .then(() =>
      showNotification({
        type: 'success',
        message: 'Успешно удалено',
      }),
    )
    .catch(() =>
      showNotification({
        type: 'error',
        message: 'Не удалось удалить',
      }),
    );
}
