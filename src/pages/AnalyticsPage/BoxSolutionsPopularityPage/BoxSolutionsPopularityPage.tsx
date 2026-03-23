import { useMemo, useState } from 'react';
import { SortIcon, UploadIcon } from '@/assets/icons';
import { Button } from '@/components/ui/Button';
import { MOCK_DATA } from '@/mock/boxSolutionsPopularityPage.mock';
import { cn } from '@/utils';
import {
  ChartColorDescriptionItem,
  PyramidChart,
} from '@/components/ui/PyramidChart';
import { DateRangePicker } from '@/components/ui/DateRangePicker';

const BoxSolutionsPopularityPage = () => {
  const [date, setDate] = useState<{
    start?: string;
    end?: string;
  }>({ start: undefined, end: undefined });
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

  const handleRange = () => {
    console.log(date);
    if (!date.start) {
      setError((prev) => ({
        ...prev,
        start: 'Не выбрана дата начала периода',
      }));
    }
    if (!date.end) {
      setError((prev) => ({ ...prev, end: 'Не выбрана дата конца периода' }));
    }
  };

  return (
    <div className={cn('flex h-full w-full flex-col gap-5')}>
      <div className={cn('bg-card flex flex-col gap-2 rounded-lg p-5 pb-8')}>
        <h2>Популярность коробочных решений</h2>
        <div className={cn('flex flex-col gap-8')}>
          <h3>Сравнение посещений за период</h3>
          <div className={cn('flex gap-5')}>
            <DateRangePicker
              values={date}
              onChange={(newRange) => {
                setDate(newRange);
                setError({ start: null, end: null });
              }}
              errors={error}
            />
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
