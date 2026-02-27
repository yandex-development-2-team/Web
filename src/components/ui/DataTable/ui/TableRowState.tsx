import { cn } from '@/utils';
import type { Column } from '../Table.types';

export function TableRowState<T>({
  text,
  columns,
}: {
  text: string;
  columns: Column<T>[];
}) {
  return (
    <tr className={cn("h-13 align-middle")}>
      <td colSpan={columns.length} className={cn("pr-3 pl-3 text-center")}>
        {text}
      </td>
    </tr>
  );
}
