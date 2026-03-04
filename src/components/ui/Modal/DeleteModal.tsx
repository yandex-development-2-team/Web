import { useApiDelete } from '@/hooks';
import { Modal } from './Modal';
import { Button } from '@/components/ui/Button';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemId: string | number;
  deletePath: string;
  titleModal?: string;
  descriptionModal?: string;
}

export const DeleteModal = ({
  isOpen,
  titleModal = 'Удалить заявку?',
  descriptionModal = 'Вы действительно хотите удалить эту заявку?',
  onClose,
  onConfirm,
  itemId,
  deletePath,
}: DeleteConfirmationModalProps) => {
  const { mutate: handleDelete, isPending } = useApiDelete({
    deletePath,
    onSuccess: () => {
      onConfirm();
      onClose();
    },
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={titleModal}>
      <>
        <p className="text-gray-700">
          {descriptionModal}
          <br />
          Действие нельзя отменить.
        </p>

        <div className="flex justify-end gap-3 pt-2">
          <Button
            type="button"
            variant="default-secondary"
            className="px-6 py-2.5"
            onClick={onClose}
            disabled={isPending}
          >
            Отмена
          </Button>
          <Button
            type="button"
            variant="danger-primary"
            className="px-6 py-2.5"
            onClick={() => handleDelete({ id: itemId })}
            disabled={isPending}
          >
            {isPending ? 'Удаление...' : 'Удалить'}
          </Button>
        </div>
      </>
    </Modal>
  );
};
