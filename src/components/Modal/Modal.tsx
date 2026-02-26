import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface IModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  variant?: 'default' | 'delete';
}

const Modal = ({
  title,
  isOpen,
  onClose,
  children,
  variant = 'default',
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
          className={`flex items-center justify-between p-4 ${
            variant !== 'delete' ? 'border-b' : ''
          }`}
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

        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">{children}</div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
