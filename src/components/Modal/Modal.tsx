import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

interface IButtonConfig {
  text: string;
  onClick: () => void;
  variant?: 'save' | 'cancel' | 'delete';
  disabled?: boolean;
}

interface IModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  buttons?: IButtonConfig[];
  variant?: 'default' | 'delete';
}

const Modal = ({
  title,
  isOpen,
  onClose,
  children,
  buttons = [],
  variant = 'default',
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

  const getButtonClassWithContext = (
    buttonVariant?: string,
    disabled?: boolean,
  ) => {
    const baseClass =
      'text-base text-weight-[600] px-8 py-3 rounded-lg cursor-pointer transition-colors';
    const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';

    if (variant === 'delete' && buttonVariant === 'delete') {
      return `${baseClass} ${disabledClass} bg-[#F05252] text-white hover:bg-[#e04a4a] border-none`;
    }

    switch (buttonVariant) {
      case 'save':
        return `${baseClass} ${disabledClass} bg-[#F4DB54] text-black hover:bg-[#e5cc4a]`;
      case 'cancel':
        return `${baseClass} ${disabledClass} bg-white text-black border border-[#F4DB54] hover:bg-gray-50`;
      case 'delete':
        return `${baseClass} ${disabledClass} bg-white text-[#F05252] border border-[#F05252] hover:bg-red-50`;
      default:
        return `${baseClass} ${disabledClass} bg-gray-200 text-black hover:bg-gray-300`;
    }
  };

  const getButtonsContainerClass = () => {
    if (variant === 'delete') {
      return 'flex justify-end gap-2 p-4';
    }
    return 'flex items-center justify-between gap-4 border-t p-4';
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
        <div
          className={`flex items-center justify-between p-4 ${variant !== 'delete' ? 'border-b' : ''}`}
        >
          <h2 className="font-open-sans text-weight-[700] text-[24px] text-[#353434]">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="mr-[10px] cursor-pointer text-[#353434] hover:text-gray-700"
            disabled={buttons.some(
              (btn) => btn.variant === 'delete' && btn.disabled,
            )}
          >
            ✕
          </button>
        </div>

        <div className="max-h-[677vh] overflow-y-auto px-6 py-5">
          {children}
        </div>

        {buttons.length > 0 && (
          <div className={getButtonsContainerClass()}>
            {variant === 'delete' ? (
              <div className="flex gap-2">
                {buttons.map((btn, i) => (
                  <button
                    key={i}
                    onClick={btn.onClick}
                    className={getButtonClassWithContext(
                      btn.variant,
                      btn.disabled,
                    )}
                    disabled={btn.disabled}
                  >
                    {btn.text}
                  </button>
                ))}
              </div>
            ) : (
              <>
                {buttons.length >= 1 && (
                  <button
                    onClick={buttons[0].onClick}
                    className={getButtonClassWithContext(
                      buttons[0].variant,
                      buttons[0].disabled,
                    )}
                    disabled={buttons[0].disabled}
                  >
                    {buttons[0].text}
                  </button>
                )}

                <div className="flex items-center gap-2">
                  {buttons.slice(1).map((btn, i) => (
                    <button
                      key={i + 1}
                      onClick={btn.onClick}
                      className={getButtonClassWithContext(
                        btn.variant,
                        btn.disabled,
                      )}
                      disabled={btn.disabled}
                    >
                      {btn.text}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
