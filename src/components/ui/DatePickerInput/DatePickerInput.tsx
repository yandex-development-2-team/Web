import { useState, useRef, useEffect } from 'react';
import { CalendarIcon } from '@/assets/icons';
import { Calendar } from '@/components/ui/Calendar/Calendar';
import { Input } from '@/components/ui/Input/Input';
import { toISODate, fromISODate, formatDateUI } from '@/utils/dateHelpers';

interface DatePickerInputProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange: (iso: string | undefined) => void;
  error?: string;
}

export function DatePickerInput({
  label = 'Дата',
  placeholder = 'Выберите дату',
  value,
  onChange,
  error,
}: DatePickerInputProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selected = value ? fromISODate(value) : undefined;

  const handleSelect = (date: Date | undefined) => {
    onChange?.(date ? toISODate(date) : undefined);
    setOpen(false);
  };

  // Закрытие по клику за пределами
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="relative w-fit" ref={ref}>
      <div className="relative">
        <Input
          label={label}
          readOnly
          placeholder={placeholder}
          value={selected ? formatDateUI(selected) : ''}
          onClick={() => setOpen((v) => !v)}
          error={error}
          className="cursor-pointer pr-10"
        />
        <CalendarIcon
          className="[&_path]:stroke-border pointer-events-none absolute right-3 bottom-3 size-5"
          onClick={() => setOpen((v) => !v)}
        />
      </div>
      {open && (
        <div className="absolute top-full left-0 z-50 mt-1">
          <Calendar mode="single" selected={selected} onSelect={handleSelect} />
        </div>
      )}
    </div>
  );
}
