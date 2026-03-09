import type { ReactNode } from 'react';
import type { Column } from '@/components/ui/DataTable/Table.types';
import { cn } from '@/utils';

export function TableShell<T>({
  columns,
  children,
}: {
  columns: Column<T>[];
  children: ReactNode;
}) {
  return (
    <table
      className={cn(
        'border-border-variant m-5 mb-4 table-fixed border-separate border-spacing-0 overflow-hidden rounded-lg border',
      )}
    >
      <thead className={cn('bg-border')}>
        <tr>
          {columns.map((column) => (
            <th
              key={column.id}
              style={{ width: column.width }}
              className={cn(
                'h-13.5 pr-3 pl-3 text-left font-sans text-sm font-normal',
              )}
            >
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody
        className={cn(
          '[&>:not(:last-child)>td]:border-border [&>:not(:last-child)>td]:border-b',
        )}
      >
        {children}
      </tbody>
    </table>
  );
}
