import type { Column, SortDirection } from './Table.types';

type SortState<T> = {
  columnKey: Column<T>['key'];
  direction: SortDirection;
};

function compareColumn(a: string, b: string): number {
  return a.localeCompare(b, 'ru', { numeric: true, sensitivity: 'base' });
}

function sortRows<T>(
  rows: readonly T[],
  column: Column<T>,
  direction: SortDirection,
): T[] {
  const dir = direction === 'asc' ? 1 : -1;

  return [...rows].sort((a, b) => {
    const sortA =
      typeof column.sortValue === 'function'
        ? column.sortValue(a)
        : a[column.key];
    const sortB =
      typeof column.sortValue === 'function'
        ? column.sortValue(b)
        : b[column.key];
    if (sortA == null && sortB == null) return 0;
    if (sortA == null) return 1;
    if (sortB == null) return -1;
    if (typeof sortA !== 'string' || typeof sortB !== 'string') {
      return 0;
    }

    return dir * compareColumn(sortA, sortB);
  });
}

function nextDirection<T>(
  prev: SortState<T> | null,
  column: Column<T>,
): SortState<T> | null {
  if (!column.isSort) return prev;

  if (!prev || prev.columnKey !== column.key) {
    return { columnKey: column.key, direction: 'asc' };
  }

  if (prev.direction === 'asc') {
    return { columnKey: column.key, direction: 'desc' };
  }

  return null;
}

export { compareColumn, sortRows, nextDirection, type SortState };
