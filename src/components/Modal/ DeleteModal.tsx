import { useState } from 'react';
import Modal from './Modal';
import { deleteItemById } from '@/services/deleteItem.service';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemId: string | number;
  itemName?: string;
}

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  itemId,
}: DeleteConfirmationModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteItemById(itemId);
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
      buttons={[
        {
          text: 'Отмена',
          onClick: onClose,
          variant: 'cancel',
          disabled: isDeleting,
        },
        {
          text: 'Удалить',
          onClick: handleDelete,
          variant: 'delete',
          disabled: isDeleting,
        },
      ]}
    >
      <p className="text-gray-700">
        Вы действительно хотите удалить эту заявку?
        <br />
        Действие нельзя отменить.
      </p>
    </Modal>
  );
};

export default DeleteConfirmationModal;
