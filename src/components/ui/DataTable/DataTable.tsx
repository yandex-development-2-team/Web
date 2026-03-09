import { Cell } from '@/components/ui/DataTable/Cell';
import { useMemo, useState } from 'react';
import type { DataTableProps } from '@/components/ui/DataTable/Table.types';
import { ArrangeIcon } from '@/assets/icons';
import { cn } from '@/utils';
import {
  DataTableControls,
  DataTablePagination,
  DataTableRowActions,
  SkeletonRow,
  TableRowState,
  TableShell,
} from './ui';
import {
  filterRows,
  filterRowsByDate,
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
  onDeleteRow,
  onDownloadRow,
  onEditRow,
  dateRange,
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
    const byText = filterRows(data, columns, filter);
    return filterRowsByDate(byText, dateRange);
  }, [data, columns, filter, dateRange]);

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
      <table
        className={cn(
          'border-border-variant m-5 mb-4 table-fixed border-separate border-spacing-0 overflow-hidden rounded-lg border',
        )}
      >
        <thead className={cn('bg-border')}>
          <tr>
            {rowSelected?.enabled === true && (
              <th className={cn('w-10 pr-3 pl-3')}>
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
                className={cn(
                  'h-13.5 pr-3 pl-3 text-left font-sans text-sm font-normal' +
                    (column.isSort ? 'cursor-pointer select-none' : ''),
                )}
                onClick={() => {
                  if (!column.isSort) return;
                  setSortState((prev) => nextDirection(prev, column));
                }}
              >
                <span
                  className={cn('flex flex-row items-center gap-1 font-normal')}
                >
                  {column.title}
                  {column.isSort && (
                    <ArrangeIcon
                      className={cn(
                        'size-4',
                        sortState?.direction === 'asc' &&
                          sortState?.columnKey === column.key
                          ? '**:data-[arrow="up"]:stroke-primary'
                          : '',
                        sortState?.direction === 'desc' &&
                          sortState?.columnKey === column.key
                          ? '**:data-[arrow="down"]:stroke-primary'
                          : '',
                      )}
                    />
                  )}
                </span>
              </th>
            ))}
            {rowSelected?.enabled === true && <th></th>}
          </tr>
        </thead>
        <tbody
          className={cn(
            '[&>:not(:last-child)>td]:border-border [&>:not(:last-child)>td]:border-b',
          )}
        >
          {displayRows.map((row) => {
            return (
              <tr key={String(row[rowKey])} className={cn('h-13 align-middle')}>
                {rowSelected?.enabled && (
                  <td className={cn('w-10 pr-3 pl-3')}>
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

                {rowSelected?.enabled === true && (
                  <DataTableRowActions
                    id={String(row[rowKey])}
                    onDeleteRow={onDeleteRow}
                    onDownloadRow={onDownloadRow}
                    onEditRow={onEditRow}
                  />
                )}
              </tr>
            );
          })}
        </tbody>
        {showControls === 'pagination' && (
          <tfoot className={cn('text-muted-foreground font-normal')}>
            <tr>
              <td colSpan={columns.length} className={cn('border-t')}>
                <DataTablePagination
                  safePage={pagination.safePage}
                  totalPage={pagination.totalPage}
                  onPrev={() => setPage((page) => Math.max(1, page - 1))}
                  onNext={() =>
                    setPage((page) => Math.min(pagination.totalPage, page + 1))
                  }
                  onPage={setPage}
                />
              </td>
            </tr>
          </tfoot>
        )}
      </table>

      {showControls && (
        <DataTableControls
          showControls={showControls}
          rowCount={rowCount}
          onChangeRowCount={(count) => {
            setRowCount(count);
            setVisibleCountRow(count);
          }}
          canShowMore={canShowMore}
          onShowMore={() =>
            setVisibleCountRow((visible) =>
              Math.min(visible + showMoreCountRows, rows.length),
            )
          }
        />
      )}
    </>
  );
}
