import { useMemo, useState } from 'react';
import { isAfter, isBefore } from 'date-fns';
import { SortIcon, UploadIcon } from '@/assets/icons';
import { Button } from '@/components/ui/Button';
import { DatePickerInput } from '@/components/ui/DatePickerInput/DatePickerInput';
import { MOCK_DATA } from '@/mock/boxSolutionsPopularityPage.mock';
import { cn } from '@/utils';
import {
  ChartColorDescriptionItem,
  PyramidChart,
} from '@/components/ui/PyramidChart';

const BoxSolutionsPopularityPage = () => {
  const [date, setDate] = useState({ start: undefined, end: undefined });
  const [sortOption, setSortOption] = useState<'asc' | 'desc'>('desc');
  const [error, setError] = useState<{
    start: string | null;
    end: string | null;
  }>({
    start: null,
    end: null,
  });

  const sortedData = useMemo(() => {
    if (sortOption === 'asc') {
      return [...MOCK_DATA].sort((a, b) => a.value - b.value);
    } else {
      return [...MOCK_DATA].sort((a, b) => b.value - a.value);
    }
  }, [sortOption]);

  const handleDateSelect = (
    str: string | undefined,
    field: 'start' | 'end',
  ) => {
    setError({ start: null, end: null });
    setDate((prev) => {
      const { start, end } = prev;

      if (field === 'start') {
        // Если новая дата "ОТ" больше текущей даты "ДО" — свапаем
        if (end && isAfter(str, end)) {
          return { start: end, end: str };
        }
        return { ...prev, start: str };
      }

      if (field === 'end') {
        // Если новая дата "ДО" меньше текущей даты "ОТ" — свапаем
        if (start && isBefore(str, start)) {
          return { start: str, end: start };
        }
        return { ...prev, end: str };
      }

      return prev;
    });
  };

  const handleRange = () => {
    console.log(date);
    if (!date.start) {
      setError((prev) => ({ ...prev, start: 'No start' }));
    }
    if (!date.end) {
      setError((prev) => ({ ...prev, end: 'No end' }));
    }
  };

  return (
    <div className={cn('flex h-full w-full flex-col gap-5')}>
      <div className={cn('bg-card flex flex-col gap-2 rounded-lg p-5 pb-8')}>
        <h2>Популярность коробочных решений</h2>
        <div className={cn('flex flex-col gap-8')}>
          <h3>Сравнение посещений за период</h3>
          <div className={cn('flex gap-5')}>
            <div className={cn('flex w-full items-center gap-3')}>
              <DatePickerInput
                label="Период с"
                placeholder="Выберите дату"
                value={date.start}
                onChange={(str) => handleDateSelect(str, 'start')}
                error={error.start ? error.start : ''}
              />
              <DatePickerInput
                label="Период до"
                placeholder="Выберите дату"
                value={date.end}
                onChange={(str) => handleDateSelect(str, 'end')}
                error={error.end ? error.end : ''}
              />
            </div>
            <div className={cn('flex w-55.5 gap-3 self-end')}>
              <Button onClick={handleRange}>Показать</Button>
              <Button size={'icon-lg'} variant={'default-secondary'}>
                <UploadIcon className="size-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-card flex h-full flex-col gap-8 rounded-lg p-5">
        <Button
          variant={'default-secondary'}
          className="p-3"
          onClick={() =>
            setSortOption((prev) => (prev === 'asc' ? 'desc' : 'asc'))
          }
        >
          Рейтинг
          <SortIcon />
        </Button>
        <div className="flex flex-col items-center gap-13">
          <PyramidChart chartItems={sortedData} sortVariant={sortOption} />
          <ChartColorDescriptionItem chartItems={MOCK_DATA} />
        </div>
      </div>
    </div>
  );
};

export const Component = BoxSolutionsPopularityPage;
