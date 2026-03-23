import { differenceInDays, isAfter, isBefore, startOfDay } from 'date-fns';
import { DatePickerInput } from '@/components/ui/DatePickerInput/DatePickerInput';
import { cn } from '@/utils';
import { showNotification } from '@/services/notification.service';

interface DateRangePickerProps {
  onChange?: (range: { start?: string; end?: string }) => void;
  errors?: { start: string | null; end: string | null };
  values: { start?: string; end?: string };
  maxDays?: number;
  latestDate?: Date;
}

export function DateRangePicker({
  onChange,
  errors,
  values,
  maxDays,
  latestDate,
}: DateRangePickerProps) {
  const handleDateSelect = (
    str: string | undefined,
    field: 'start' | 'end',
  ) => {
    if (!str) {
      onChange?.({ ...values, [field]: undefined });
      return;
    }

    let nextDate = { ...values };

    const selectedDate = str;
    const today = startOfDay(new Date());

    if (isAfter(selectedDate, today)) {
      showNotification({
        message: `Даты только за прошлый период`,
        type: 'error',
      });
      return;
    }

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

    if (maxDays && nextDate.start && nextDate.end) {
      const daysBetween = Math.abs(
        differenceInDays(nextDate.end, nextDate.start),
      );

      if (daysBetween > maxDays) {
        showNotification({
          message: `Максимальное количество дней в периоде ${maxDays}`,
          type: 'error',
        });
        return;
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
        latestDate={latestDate}
      />
      <DatePickerInput
        label="Период до"
        value={values.end}
        onChange={(str) => handleDateSelect(str, 'end')}
        error={errors?.end || undefined}
        latestDate={latestDate}
      />
    </div>
  );
}
