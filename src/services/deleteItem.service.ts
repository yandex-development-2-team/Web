import { showNotification } from '@/services/notification.service';
import {api} from '@/services/api.service'

export async function deleteItemById(id: string | number, path: string) {
  return api
    .delete(`${path}/${id}`)
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
