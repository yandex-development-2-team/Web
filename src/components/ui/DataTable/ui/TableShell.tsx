import type { ReactNode } from 'react';
import type { Column } from '../Table.types';

export function TableShell<T>({
  columns,
  children,
}: {
  columns: Column<T>[];
  children: ReactNode;
}) {
  return (
    <table>
      <thead className="bg-(--color-border)">
        <tr>
          {columns.map((column) => (
            <th
              key={column.id}
              style={{ width: column.width }}
              className="h-13.5 pr-3 pl-3 text-left font-sans text-sm font-normal"
            >
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="[&>:not(:last-child)>td]:border-b [&>:not(:last-child)>td]:border-(--color-border)">
        {children}
      </tbody>
    </table>
  );
}
