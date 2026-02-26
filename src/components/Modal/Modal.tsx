import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { ModalFooter } from './Modal.types';
import { Button } from '@/components/ui/Button';

interface IModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  footer?: ModalFooter;
}

const Modal = ({
  title,
  isOpen,
  onClose,
  children,
  footer
}: IModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      modalRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const renderFooter = () => {
    if (!footer) return null;

    if (footer.variant === 'cancel-save') {
      return (
        <div className="flex justify-end gap-3 border-t p-4">
          <Button
            type="button"
            variant="default-secondary"
            className="mr-auto"
            onClick={onClose}
            disabled={footer.isSaveLoading}
          >
            Отмена
          </Button>
          <Button
            type="button"
            variant="default-primary"
            onClick={footer.onSave}
            disabled={footer.isSaveLoading}
          >
            {footer.isSaveLoading ? 'Сохранение...' : 'Сохранить'}
          </Button>
        </div>
      );
    }
    if (footer.variant === 'delete-cancel-save') {
      return (
        <div className="flex justify-between gap-3 border-t p-4">
          <Button
            type="button"
            variant="danger-secondary"
            onClick={footer.onDelete}
            disabled={footer.isDeleteLoading}
          >
            {footer.isDeleteLoading ? 'Удаление...' : 'Удалить'}
          </Button>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="default-secondary"
              onClick={onClose}
              disabled={footer.isSaveLoading || footer.isDeleteLoading}
            >
              Отмена
            </Button>
            <Button
              type="button"
              variant="default-primary"
              onClick={footer.onSave}
              disabled={footer.isSaveLoading}
            >
              {footer.isSaveLoading ? 'Сохранение...' : 'Сохранить'}
            </Button>
          </div>
        </div>
      );
    }

    return null;
  }


  return createPortal(
    <div
      className="bg-opacity-40 bg-modal-backdrop fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="mx-4 max-w-[651px] min-w-[628px] rounded-lg bg-white shadow-xl"
        tabIndex={-1}
      >
        <div
          className={`flex items-center justify-between p-4 ${footer ? 'border-b' : ''}`}
        >
          <h2 className="font-open-sans text-foreground text-2xl font-bold">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-foreground mr-2.5 cursor-pointer text-xl"
          >
            ✕
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
          <div className="space-y-6">{children}</div>
        </div>

        {renderFooter()}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
