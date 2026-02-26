import { Cell } from './Cell';
import { useMemo, useState } from 'react';
import type { DataTableProps } from './Table.types';
import { ArrangeIcon, ArrowRghtIcon } from '@/assets/icons';
import { Button } from '@/components/ui/Button/index';
import { Input } from '@/components/ui/Input/index';
import { cn } from '@/utils';
import { SkeletonRow, TableRowState, TableShell } from './ui';
import {
  filterRows,
  getPaginationRange,
  isAllSelected,
  nextDirection,
  paginateRows,
  selectAll,
  selectRow,
  sortRows,
  type SortState,
} from './helpers';
import { Checkbox } from '@/components/ui/Checkbox/index';

export function DataTable<T>({
  data,
  columns,
  defaultRowCount = 11,
  showMoreCountRows = 5,
  showControls,
  isLoading = false,
  isError = false,
  filter = '',
  rowKey,
  rowSelected,
}: DataTableProps<T>) {
  const [sortState, setSortState] = useState<SortState<T> | null>(null);
  const [rowCount, setRowCount] = useState<number>(defaultRowCount);
  const [visibleCountRow, setVisibleCountRow] =
    useState<number>(defaultRowCount);
  const [page, setPage] = useState(1);
  const [selected, setSelected] = useState<Set<string | number>>(
    new Set<string>(),
  );

  const activeColumn = useMemo(() => {
    return columns.find((col) => col.key == sortState?.columnKey) ?? null;
  }, [columns, sortState]);

  const filteredRows = useMemo(() => {
    return filterRows(data, columns, filter);
  }, [data, columns, filter]);

  const rows = useMemo(() => {
    if (!sortState || !activeColumn) return filteredRows;
    return sortRows(filteredRows, activeColumn, sortState.direction);
  }, [filteredRows, activeColumn, sortState]);

  const visibleRows = useMemo(
    () => rows.slice(0, visibleCountRow),
    [rows, visibleCountRow],
  );

  const canShowMore = visibleCountRow < rows.length;

  const pagination = useMemo(() => {
    if (showControls !== 'pagination') {
      return {
        paginatedRows: rows,
        totalPage: 1,
        safePage: 1,
      };
    }
    return paginateRows({
      rows,
      currentPage: page,
      pageSize: rowCount,
    });
  }, [rows, page, rowCount, showControls]);

  const displayRows = useMemo(() => {
    if (showControls === 'pagination') {
      return pagination.paginatedRows;
    }

    return visibleRows;
  }, [showControls, pagination.paginatedRows, visibleRows]);

  const displayIds = useMemo(
    () => displayRows.map((row) => String(row[rowKey])),
    [displayRows, rowKey],
  );
  const selectedAll = isAllSelected(displayIds, selected);

  const handleSelectAllRows = (checked: boolean) => {
    setSelected((prev) => selectAll(prev, displayIds, checked));
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    setSelected((prev) => selectRow(prev, id, checked));
  };

  if (isLoading) {
    return (
      <TableShell columns={columns}>
        {Array.from({ length: defaultRowCount }).map((_, id) => (
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
            {rowSelected?.enabled === true && (
              <th className="w-10 pr-3 pl-3">
                <Checkbox
                  icon="CheckMark"
                  checked={selectedAll}
                  onCheckedChange={(check) =>
                    handleSelectAllRows(check === true)
                  }
                />
              </th>
            )}
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
                        sortState?.direction === 'asc' &&
                          sortState?.columnKey === column.key
                          ? '**:data-[arrow="up"]:stroke-(--color-primary)'
                          : '',
                        sortState?.direction === 'desc' &&
                          sortState?.columnKey === column.key
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
          {displayRows.map((row) => {
            return (
              <tr key={String(row[rowKey])} className="h-13 align-middle">
                {rowSelected?.enabled && (
                  <td className="w-10 pr-3 pl-3">
                    <Checkbox
                      icon="CheckMark"
                      checked={selected.has(String(row[rowKey]))}
                      onCheckedChange={(check) =>
                        handleSelectRow(String(row[rowKey]), check === true)
                      }
                    />
                  </td>
                )}

                {columns.map((column) => (
                  <Cell key={column.id} row={row} column={column} />
                ))}
              </tr>
            );
          })}
        </tbody>
        {showControls === 'pagination' && (
          <tfoot className="font-normal text-(--color-muted-foreground)">
            <tr>
              <td colSpan={columns.length} className="border-t">
                <div className="m-3 mb-4 flex items-center justify-end gap-1">
                  <Button
                    variant="ghost"
                    disabled={pagination.safePage === 1}
                    className="p-2.5"
                    onClick={() => setPage((page) => page - 1)}
                  >
                    <ArrowRghtIcon className="size-3 stroke-(--color-muted-foreground)" />
                  </Button>

                  {getPaginationRange({
                    currentPage: pagination.safePage,
                    totalPages: pagination.totalPage,
                    nearCount: 2,
                  }).map((item, index) =>
                    item === 'dots' ? (
                      <span key={`dots-${index}`}>...</span>
                    ) : (
                      <Button
                        key={`page-${item}`}
                        variant={
                          item === pagination.safePage
                            ? 'default-secondary'
                            : 'ghost'
                        }
                        className={cn('h-8 w-8 p-0')}
                        onClick={() => setPage(item)}
                      >
                        {item}
                      </Button>
                    ),
                  )}

                  <Button
                    variant="ghost"
                    className="p-2.5"
                    disabled={pagination.safePage === pagination.totalPage}
                    onClick={() => setPage((page) => page + 1)}
                  >
                    <ArrowRghtIcon className="size-3 rotate-180 stroke-(--color-muted-foreground)" />
                  </Button>
                </div>
              </td>
            </tr>
          </tfoot>
        )}
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
