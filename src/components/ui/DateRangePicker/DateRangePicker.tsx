import { isAfter, isBefore } from 'date-fns';
import { DatePickerInput } from '@/components/ui/DatePickerInput/DatePickerInput';
import { cn } from '@/utils';

interface DateRangePickerProps {
  onChange?: (range: { start?: string; end?: string }) => void;
  errors?: { start: string | null; end: string | null };
  values: { start?: string; end?: string };
}

export function DateRangePicker({
  onChange,
  errors,
  values,
}: DateRangePickerProps) {
  const handleDateSelect = (
    str: string | undefined,
    field: 'start' | 'end',
  ) => {
    let nextDate = { ...values };

    if (field === 'start') {
      if (str && values.end && isAfter(str, values.end)) {
        nextDate = { start: values.end, end: str };
      } else {
        nextDate = { ...values, start: str };
      }
    } else if (field === 'end') {
      if (str && values.start && isBefore(str, values.start)) {
        nextDate = { start: str, end: values.start };
      } else {
        nextDate = { ...values, end: str };
      }
    }

    onChange?.(nextDate);
  };

  return (
    <div className={cn('flex w-full items-center gap-3')}>
      <DatePickerInput
        label="Период с"
        value={values.start}
        onChange={(str) => handleDateSelect(str, 'start')}
        error={errors?.start || undefined}
      />
      <DatePickerInput
        label="Период до"
        value={values.end}
        onChange={(str) => handleDateSelect(str, 'end')}
        error={errors?.end || undefined}
      />
    </div>
  );
}
