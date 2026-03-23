import type { ChartItemType } from '@/mock/boxSolutionsPopularityPage.mock';
import { cn } from '@/utils';

interface PyramidChartProps {
  chartItems: ChartItemType[];
  sortVariant: 'asc' | 'desc';
}

export function PyramidChart({
  chartItems,
  sortVariant = 'desc',
}: PyramidChartProps) {
  return (
    <div
      className={cn(
        'flex h-110.75 w-full max-w-172 flex-col gap-5 transition-all duration-300',
        {
          ['[clip-path:polygon(50%_0%,100%_100%,0%_100%)]']:
            sortVariant === 'asc',
          ['[clip-path:polygon(0%_0%,100%_0%,50%_100%)]']:
            sortVariant === 'desc',
        },
      )}
    >
      {chartItems.map((item) => (
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
  );
}

interface ChartColorDescriptionItemProps {
  chartItems: ChartItemType[];
}

export function ChartColorDescriptionItem({
  chartItems,
}: ChartColorDescriptionItemProps) {
  return (
    <div className="grid w-full grid-cols-[auto_auto] grid-rows-2 justify-start gap-x-20 gap-y-5">
      {chartItems.map((item) => (
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
  );
}
