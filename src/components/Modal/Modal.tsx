import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface IButtonConfig {
  text: string;
  onClick: () => void;
  variant?: 'save' | 'cancel' | 'delete';
}

interface IModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  buttons?: IButtonConfig[];
}

const Modal = ({
  title,
  isOpen,
  onClose,
  children,
  buttons = [],
}: IModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
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
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getButtonClass = (variant?: string) => {
    switch (variant) {
      case 'save':
        return 'bg-[#F4DB54] text-base text-black text-weight-[600] px-8 py-3 rounded-lg ml-[5px] cursor-pointer';
      case 'cancel':
        return 'bg-white text-base text-black text-weight-[600] border-1 border-[#F4DB54] px-8 py-3 rounded-lg cursor-pointer';
      case 'delete':
        return 'bg-white text-base text-[#F05252] text-weight-[600] border-1 border-[#F05252] px-8 py-3 rounded-lg cursor-pointer';
    }
  };
  return createPortal(
    <div
      className="bg-opacity-40 fixed inset-0 z-50 flex items-center justify-center bg-[#35343466]"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className="mx-4 max-w-[651px] min-w-[628px] rounded-lg bg-white shadow-xl"
        tabIndex={-1}
      >
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="font-open-sans text-weight-[700] text-[24px] text-[#353434]">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="mr-[10px] cursor-pointer text-[#353434]"
          >
            ✕
          </button>
        </div>

        <div className="max-h-[677vh] overflow-y-auto px-6 py-5">
          {children}
        </div>

        {buttons.length > 0 && (
          <div className="flex items-center justify-between gap-4 border-t p-4">
            {buttons.length >= 1 && (
              <button
                onClick={buttons[0].onClick}
                className={getButtonClass(buttons[0].variant)}
              >
                {buttons[0].text}
              </button>
            )}

            <div className="flex items-center gap-2">
              {buttons.slice(1).map((btn, i) => (
                <button
                  key={i + 1}
                  onClick={btn.onClick}
                  className={getButtonClass(btn.variant)}
                >
                  {btn.text}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
