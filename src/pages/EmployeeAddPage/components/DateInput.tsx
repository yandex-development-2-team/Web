// src/components/ui/DateInput.tsx

import { forwardRef, useState } from 'react';
import { cn } from '@/utils';
import { Input } from '@/components/ui/Input';

import CalendarIcon from '@/assets/icons/calendar.svg?react';
import ChevronDownIcon from '@/assets/icons/arrow-down.svg?react';

interface DateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  onOpen?: () => void; // позже сюда подключишь календарь
}

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ className, error, onOpen, onFocus, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
      setIsOpen(true);
      onOpen?.();
    };

    return (
      <div className="relative w-full">
        <Input
          ref={ref}
          type="text"
          readOnly
          onClick={handleOpen}
          onFocus={(e) => {
            handleOpen();
            onFocus?.(e);
          }}
          className={cn(
            'h-11 cursor-pointer pr-10 pl-10',
            error && 'border-destructive',
            className,
          )}
          {...props}
        />

        {/* Иконка календаря */}
        <div className="pointer-events-none absolute top-7 left-3 -translate-y-1/2">
          <CalendarIcon className="text-border h-6 w-6" />
        </div>

        {/* Стрелка */}
        <div className="pointer-events-none absolute top-7 right-2 -translate-y-1/2">
          <ChevronDownIcon
            className={cn(
              'text-border opacity-40 transition-transform duration-200',
              isOpen && 'rotate-180',
            )}
          />
        </div>

        {error && <div className="text-destructive mt-1 text-xs">{error}</div>}
      </div>
    );
  },
);

DateInput.displayName = 'DateInput';
