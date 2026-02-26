import { deleteItemById } from "@/services/deleteItem.service";
import { useMutation } from "@tanstack/react-query";

interface UseDeleteItemParams {
  deletePath: string;
  onSuccess?: () => void;
  onError?: () => void;
}

export function useApiDelete({ deletePath, onSuccess, onError }: UseDeleteItemParams) {
  return useMutation({
    mutationFn: ({ id }: { id: string | number }) => deleteItemById(id, deletePath),
    onSuccess,
    onError,
  });
}