import { cn } from '@/utils';
import { type StatisticItemType } from '@/mock/boxManagementPage.mock';

interface StatisticItemProps {
  item: StatisticItemType;
}

export function StatisticItem({ item }: StatisticItemProps) {
  return (
    <div className="w-full">
      <span>{item.title}</span>
      <div
        className={cn(
          'flex h-38 items-center justify-center rounded-lg border',
          'text-[60px] font-bold',
          {
            ['text-destructive']: item.isHighlighted,
          },
        )}
      >
        {item.count}
      </div>
    </div>
  );
}

interface StatisticsListProps {
  items: StatisticItemType[];
}

export function StatisticsList({ items }: StatisticsListProps) {
  return (
    <div className={cn('flex items-center gap-5')}>
      {items.map((item) => (
        <StatisticItem key={item.id} item={item} />
      ))}
    </div>
  );
}
