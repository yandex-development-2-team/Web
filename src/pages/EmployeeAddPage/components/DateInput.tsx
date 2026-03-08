import { forwardRef, useState, useEffect, useRef } from 'react';
import { cn } from '@/utils';
import { Input } from '@/components/ui/Input';
import { Calendar } from '@/components/ui/Calendar';

import CalendarIcon from '@/assets/icons/calendar.svg?react';
import ChevronDownIcon from '@/assets/icons/arrow-down.svg?react';

import { format, parse } from 'date-fns';

interface DateInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  onOpen?: () => void;
}

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ className, error, onOpen, value, onChange, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState<Date | undefined>();
    const containerRef = useRef<HTMLDivElement>(null);

    // Sync selected from form value (e.g. after reset or defaultValues)
    useEffect(() => {
      if (value == null || value === '') {
        setSelected(undefined);
        return;
      }
      const str = String(value).trim();
      if (!str) {
        setSelected(undefined);
        return;
      }
      try {
        const d = parse(str, 'dd.MM.yyyy', new Date());
        if (!Number.isNaN(d.getTime())) setSelected(d);
      } catch {
        setSelected(undefined);
      }
    }, [value]);

    const handleOpen = () => {
      setIsOpen((prev) => !prev);
      onOpen?.();
    };

    const handleSelect = (date: Date | undefined) => {
      setSelected(date);

      if (date) {
        const formatted = format(date, 'dd.MM.yyyy');

        onChange?.({
          target: { value: formatted },
        } as React.ChangeEvent<HTMLInputElement>);
      }

      setIsOpen(false);
    };

    useEffect(() => {
      const handler = (e: MouseEvent) => {
        if (!containerRef.current?.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handler);
      return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
      <div ref={containerRef} className="relative w-full">
        <Input
          ref={ref}
          type="text"
          readOnly
          value={selected ? format(selected, 'dd.MM.yyyy') : value}
          onClick={handleOpen}
          className={cn(
            'h-11 cursor-pointer pr-10 pl-10',
            error && 'border-destructive',
            className,
          )}
          {...props}
        />

        {/* calendar icon */}
        <div className="">
          <CalendarIcon className="pointer-events-none absolute top-4 left-3 text-border h-6 w-6" />
        </div>

        {/* arrow */}
        <div className="pointer-events-none absolute top-7 right-1 -translate-y-1/2">
          <ChevronDownIcon
            className={cn(
              'text-border opacity-40 transition-transform duration-200',
              isOpen && 'rotate-180',
            )}
          />
        </div>

        {/* calendar popup */}
        {isOpen && (
          <div className="absolute z-50 mt-2"
          onMouseDown={(e) => e.stopPropagation()}>
            <Calendar
              mode="single"
              selected={selected}
              onSelect={handleSelect}
            />
          </div>
        )}

        {error && (
          <div className="text-destructive mt-1 text-xs">{error}</div>
        )}
      </div>
    );
  },
);

DateInput.displayName = 'DateInput';