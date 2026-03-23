import { SortIcon, UploadIcon } from '@/assets/icons';
import { Button } from '@/components/ui/Button';
import { DatePickerInput } from '@/components/ui/DatePickerInput/DatePickerInput';
import { cn } from '@/utils';
import { isAfter, isBefore } from 'date-fns';
import { useMemo, useState } from 'react';

const MOCK_DATA = [
  { id: '1', label: 'Третьяковка', value: 80, color: 'bg-chart-1' },
  { id: '2', label: 'Экспериментариум', value: 65, color: 'bg-chart-2' },
  { id: '3', label: 'Пушкинский музей', value: 32, color: 'bg-chart-3' },
  { id: '4', label: 'ГЭЗ', value: 14, color: 'bg-chart-4' },
];

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
          <div
            className={cn(
              'flex h-110.75 w-full max-w-172 flex-col gap-5 transition-all duration-300',
              {
                ['[clip-path:polygon(50%_0%,100%_100%,0%_100%)]']:
                  sortOption === 'asc',
                ['[clip-path:polygon(0%_0%,100%_0%,50%_100%)]']:
                  sortOption === 'desc',
              },
            )}
          >
            {sortedData.map((item) => (
              <div
                key={item.id}
                className={cn(
                  `${item.color}`,
                  'flex flex-1 items-center justify-center text-center',
                )}
              >
                <span className="text-white">{item.value}%</span>
              </div>
            ))}
          </div>
          <div className="grid w-full grid-cols-[auto_auto] grid-rows-2 justify-start gap-x-20 gap-y-5">
            {MOCK_DATA.map((item) => (
              <div className={cn('flex items-center gap-5')} key={item.id}>
                <div
                  className={cn(
                    `${item.color}`,
                    'flex size-10 items-center gap-3 rounded-lg',
                  )}
                ></div>
                <span className="font-semibold">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Component = BoxSolutionsPopularityPage;
