import { Input } from '@/components/ui/Input';
import { Modal } from './Modal';
import { cn } from '@/utils';

interface AddBlockModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export function AddBlockModal({ isOpen, onClose, title }: AddBlockModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={{
        variant: 'cancel-save',
        onSave: () => console.log('add modal save'),
      }}
    >
      <div className={cn('flex flex-col gap-4')}>
        <Input placeholder="Текст" label="Название" />
        <Input placeholder="Текст" label="Описание" />
      </div>
    </Modal>
  );
}
