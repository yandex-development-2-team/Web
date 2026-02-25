import { Button } from '@/components/ui/Button';
import { cn } from '@/utils';
import { type SyntheticEvent } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps extends React.PropsWithChildren {
  element?: HTMLElement;
}

export function Portal({ children, element = document.body }: PortalProps) {
  return createPortal(children, element);
}

interface ModalProps extends React.PropsWithChildren {
  onOpen?: () => void;
  onClose?: () => void;
  isOpen?: boolean;
}

export function ModalBase({ children, isOpen, onClose }: ModalProps) {
  const handleClose = (e: SyntheticEvent) => {
    e.stopPropagation();

    onClose?.();
  };

  return (
    <Portal>
      <div
        className={cn(
          'overlay',
          'absolute inset-0 z-10 bg-gray-400/50',
          'flex items-center justify-center',
          {
            ['hidden']: !isOpen,
            ['visible']: isOpen,
          },
        )}
        onClick={handleClose}
      >
        {children}
      </div>
    </Portal>
  );
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirmRemoveItem,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirmRemoveItem: () => void;
}) {
  const handleRemoveItem = () => {
    onConfirmRemoveItem();
  };

  const handleCancelAction = () => {
    onClose();
  };
  return (
    <ModalBase isOpen={isOpen} onClose={onClose}>
      <div
        className={cn('bg-card min-w-100 rounded-lg p-6')}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h3>Удалить документ?</h3>
        <h5>Вы действительно хотите удалить этот документ?</h5>
        <div className={cn('actions')}>
          <Button variant={'default-secondary'} onClick={handleCancelAction}>
            Отмена
          </Button>
          <Button variant={'danger-primary'} onClick={handleRemoveItem}>
            Удалить
          </Button>
        </div>
      </div>
    </ModalBase>
  );
}
