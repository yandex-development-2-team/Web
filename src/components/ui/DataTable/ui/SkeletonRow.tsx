import { Skeleton } from '../../Skeleton';
import type { Column } from '../Table.types';

export function SkeletonRow<T>({ columns }: { columns: Column<T>[] }) {
  return (
    <tr>
      {columns.map((col) => (
        <td key={col.id} className="pr-3 pl-3">
          <Skeleton className="mt-4 mb-4 h-5 w-full" />
        </td>
      ))}
    </tr>
  );
}
