import { Cell } from './Cell';
import { useMemo, useState } from 'react';
import type { DataTableProps } from './Table.types';
import { nextDirection, sortRows, type SortState } from './SortTable.helpers';
import { ArrangeIcon } from '@/assets/icons';
import { Button } from '../Button';
import { Input } from '../Input';
import { cn } from '@/utils';
import { SkeletonRow, TableRowState, TableShell } from './ui';

export function DataTable<T>({
  data,
  columns,
  defaultRowCount = 11,
  showMoreCountRows = 5,
  showControls,
  isLoading = false,
  isError = false,
}: DataTableProps<T>) {
  const [sortState, setSortState] = useState<SortState<T> | null>(null);
  const [rowCount, setRowCount] = useState<number>(defaultRowCount);
  const [visibleCountRow, setVisibleCountRow] =
    useState<number>(defaultRowCount);

  const activeColumn = useMemo(() => {
    return columns.find((col) => col.key == sortState?.columnKey) ?? null;
  }, [columns, sortState]);

  const rows = useMemo(() => {
    if (!sortState || !activeColumn) return data;
    return sortRows(data, activeColumn, sortState.direction);
  }, [data, activeColumn, sortState]);

  const visibleRows = useMemo(
    () => rows.slice(0, visibleCountRow),
    [rows, visibleCountRow],
  );
  const canShowMore = visibleCountRow < rows.length;

  if (isLoading) {
    return (
      <TableShell columns={columns}>
        {Array.from({ length: 5 }).map((_, id) => (
          <SkeletonRow key={`skeleton-${id}`} columns={columns} />
        ))}
      </TableShell>
    );
  }

  if (isError) {
    return (
      <TableShell columns={columns}>
        <TableRowState columns={columns} text="Не удалось загрузить данные" />
      </TableShell>
    );
  }

  if (rows.length === 0) {
    return (
      <TableShell columns={columns}>
        <TableRowState columns={columns} text="Нет данных" />
      </TableShell>
    );
  }

  return (
    <>
      <table className="m-5 mb-4 table-fixed border-separate border-spacing-0 overflow-hidden rounded-lg border border-(--color-border-variant)">
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
                <span className="flex flex-row items-center gap-1 font-normal">
                  {column.title}
                  {column.isSort && (
                    <ArrangeIcon
                      className={cn(
                        'size-4',
                        sortState?.direction === 'asc' && sortState?.columnKey === column.key
                          ? '**:data-[arrow="up"]:stroke-(--color-primary)'
                          : '',
                        sortState?.direction === 'desc' && sortState?.columnKey === column.key
                          ? '**:data-[arrow="down"]:stroke-(--color-primary)'
                          : '',
                      )}
                    />
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&>:not(:last-child)>td]:border-b [&>:not(:last-child)>td]:border-(--color-border)">
          {visibleRows.map((row, rowIndex) => (
            <tr key={rowIndex} className="h-13 align-middle">
              {columns.map((column) => (
                <Cell key={column.id} row={row} column={column} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {showControls && (
        <div className="flex flex-row items-center justify-end">
          {showControls === 'showBy' && (
            <div className="flex flex-row items-center gap-3">
              <span className="text-(--color-muted-foreground)">
                Показывать по
              </span>
              <Input
                type="number"
                value={rowCount}
                min={1}
                className="h-12 w-12 border border-(--color-muted-foreground) text-center text-(--color-muted-foreground)"
                onChange={(e) => {
                  const count = Math.max(1, Number(e.target.value) || 1);
                  setRowCount(count);
                  setVisibleCountRow(count);
                }}
              />
            </div>
          )}
          {showControls === 'showMore' && (
            <Button
              disabled={!canShowMore}
              variant={'ghost'}
              className="mr-5 p-0 font-normal text-(--color-muted-foreground)"
              onClick={() =>
                setVisibleCountRow((v) =>
                  Math.min(v + showMoreCountRows, rows.length),
                )
              }
            >
              Показать больше
            </Button>
          )}
        </div>
      )}
    </>
  );
}
