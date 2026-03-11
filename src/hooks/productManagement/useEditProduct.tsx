import { showNotification } from '@/services/notification.service';
import {
  ProductService,
  type UnitProductType,
} from '@/services/product.service';
import { useMutation } from '@tanstack/react-query';

export function useUpdateProduct() {
  return useMutation({
    mutationFn: ({
      id,
      data,
      path,
    }: {
      id: string;
      data: UnitProductType;
      path: string;
    }) => ProductService.editProduct(path, id, data),
    onSuccess: () => {
      showNotification({ type: 'success', message: 'Succes edit' });
    },
    onError: () => {
      showNotification({ type: 'error', message: 'Error edit' });
    },
  });
}
