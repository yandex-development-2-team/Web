import { useState } from 'react';
import Modal from './Modal';
import { deleteItemById } from '@/services/deleteItem.service';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemId: string | number;
  itemName?: string;
  deletePath: string;
}

const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemId,
  deletePath,
}: DeleteConfirmationModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteItemById(itemId, deletePath);
      onConfirm();
      onClose();
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Удалить заявку?"
      variant="delete"
    >
      <div className="space-y-6">
        <p className="text-gray-700">
          Вы действительно хотите удалить эту заявку?
          <br />
          Действие нельзя отменить.
        </p>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-6 py-2.5 rounded-lg border border-primary text-foreground hover:bg-gray-50 disabled:opacity-50"
          >
            Отмена
          </button>

          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="px-6 py-2.5 rounded-lg bg-destructive text-white hover:bg-red-600 disabled:opacity-50"
          >
            {isDeleting ? 'Удаление...' : 'Удалить'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;