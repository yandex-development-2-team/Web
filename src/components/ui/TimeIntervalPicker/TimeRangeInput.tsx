import { useEffect, useRef, useState } from 'react';
import { TimeIcon } from '@/assets/icons';
import { Input } from '@/components/ui/Input';
import { TimeIntervalPicker } from './TimeIntervalPicker';
import { formatCurrentRange, type TimeRangeType } from './constants';

interface TimePickerInputProps {
  label?: string;
  placeholder?: string;
  value?: TimeRangeType;
  onChange: (timeRange: TimeRangeType) => void;
  error?: string;
}

export function TimeRangeInput({
  label,
  placeholder,
  value,
  onChange,
  error,
}: TimePickerInputProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const handleTimeRange = (range: TimeRangeType) => {
    onChange?.(range);
  };

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
    <div className="relative w-full self-end" ref={ref}>
      <div className="relative">
        <Input
          label={label}
          onChange={(data) => console.log(data)}
          placeholder={placeholder}
          onClick={() => setOpen(!open)}
          value={!open ? formatCurrentRange(value || { from: 0, to: 0 }) : ''}
          className="cursor-pointer"
          error={error}
          readOnly
        />
        <TimeIcon className="[&_path]:stroke-border pointer-events-none absolute right-3 bottom-3 size-5" />
      </div>
      {open && (
        <div className="bg-card border-border-variant absolute top-2 right-2 z-50 mt-1 w-46 gap-5 rounded-lg border p-3 text-[14px]">
          <TimeIntervalPicker value={value} onChange={handleTimeRange} />
        </div>
      )}
    </div>
  );
}
