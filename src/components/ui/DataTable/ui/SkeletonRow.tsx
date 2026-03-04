import { cn } from '@/utils';
import { Skeleton } from '@/components/ui/Skeleton';
import type { Column } from '../Table.types';

export function SkeletonRow<T>({ columns }: { columns: Column<T>[] }) {
  return (
    <tr>
      {columns.map((col) => (
        <td key={col.id} className={cn('pr-3 pl-3')}>
          <Skeleton className={cn('mt-4 mb-4 h-5 w-full')} />
        </td>
      ))}
    </tr>
  );
}
