import { Cell } from './Cell';
import { useMemo, useState } from 'react';
import type { DataTableProps } from './Table.types';
import { nextDirection, sortRows, type SortState } from './SortTable.helpers';
import { ArrangeIcon } from '@/assets/icons';

export function DataTable<T>({ data, columns }: DataTableProps<T>) {
  const [sortState, setSortState] = useState<SortState<T> | null>(null);

  const activeColumn = useMemo(() => {
    return columns.find((col) => col.key == sortState?.columnKey) ?? null;
  }, [columns, sortState]);

  const rows = useMemo(() => {
    if (!sortState || !activeColumn) return data;
    return sortRows(data, activeColumn, sortState.direction);
  }, [data, activeColumn, sortState]);

  return (
    <table className="m-5 table-fixed border-separate border-spacing-0 overflow-hidden rounded-lg border border-(--color-border-variant)">
      <thead className="bg-(--color-border)">
        <tr>
          {columns.map((column) => (
            <th
              key={column.id}
              style={{ width: column.width }}
              className={
                'h-13.5 pr-3 pl-3 text-left font-sans text-sm font-normal' +
                (column.isSort ? 'cursor-pointer select-none' : '')
              }
              onClick={() => {
                if (!column.isSort) return;
                setSortState((prev) => nextDirection(prev, column));
              }}
            >
              <span className="flex flex-row items-center gap-1">
                {column.title}
                {column.isSort && <ArrangeIcon className="size-4" />}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="[&>:not(:last-child)>td]:border-b [&>:not(:last-child)>td]:border-(--color-border)">
        {rows.map((row, rowIndex) => (
          <tr key={rowIndex} className="h-13 align-middle">
            {columns.map((column) => (
              <Cell key={column.id} row={row} column={column} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
