import { Outlet } from 'react-router';
import { cn } from '@/utils';
import { useModal } from './hooks/useModal';
import Modal from './components/Modal/Modal';
import DeleteConfirmationModal from './components/Modal/ DeleteModal';

function App() {
  const modal = useModal(); // для основной модалки
  const deleteModal = useModal(); // для модалки удаления

  const handleDeleteConfirm = () => {
    console.log('Элемент успешно удален!');
    // Здесь можно добавить логику обновления списка и т.д.
  };

  return (
    <div>
      <button 
        onClick={modal.open}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Открыть модалку
      </button>

      {/* Основная модалка */}
      <Modal
        title="Моя модалка"
        isOpen={modal.isOpen}
        onClose={modal.close}
        buttons={[
          { 
            text: 'Удалить', 
            onClick: deleteModal.open, // Открываем модалку удаления
            variant: 'delete' 
          },
          { 
            text: 'Отмена', 
            onClick: modal.close, 
            variant: 'cancel' 
          },
          { 
            text: 'Сохранить', 
            onClick: () => {
              console.log('Сохраняем...');
              modal.close(); // Закрываем основную модалку после сохранения
            }, 
            variant: 'save' 
          }
        ]}
      >
        <p>Это контент модального окна</p>
        <p>Нажмите "Удалить", чтобы открыть подтверждение</p>
      </Modal>

      {/* Модалка подтверждения удаления */}
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.close}
        onConfirm={handleDeleteConfirm}
        itemId={123}
        itemName="заявку №123"
      />
    </div>
  );
}

export default App;