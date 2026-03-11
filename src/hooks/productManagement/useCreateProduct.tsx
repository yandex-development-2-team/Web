import { showNotification } from '@/services/notification.service';
import {
  ProductService,
  type UnitProductType,
} from '@/services/product.service';
import { useMutation } from '@tanstack/react-query';

export function useCreateProduct() {
  return useMutation({
    mutationFn: ({ path, data }: { data: UnitProductType; path: string }) =>
      ProductService.creaetProduct(path, data),
    onSuccess: () => {
      showNotification({ type: 'success', message: 'Succes create' });
    },
    onError: () => {
      showNotification({ type: 'error', message: 'Error create' });
    },
  });
}
