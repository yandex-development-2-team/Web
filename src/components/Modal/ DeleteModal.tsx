import Modal from './Modal';

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
  const handleDelete = () => {
    console.log(`Fake DELETE request for item ${itemId}: success`);
    onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Удалить заявку?"
      buttons={[
        { text: 'Отмена', onClick: onClose, variant: 'cancel' },
        { text: 'Удалить', onClick: handleDelete, variant: 'delete' },
      ]}
    >
      <p>
        Вы действительно хотите удалить эту заявку? 
        <br />Действие нельзя отменить.
      </p>
    </Modal>
  );
};

export default DeleteConfirmationModal;
