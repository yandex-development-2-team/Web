import type { Column } from '../Table.types';

function normalize(norm: string | null | undefined): string {
  return (norm ?? '').toLocaleLowerCase().trim();
}

export function filterRows<T>(
  rows: T[],
  columns: Column<T>[],
  filter: string,
): T[] {
  const fil = normalize(filter);
  if (!fil) return rows;

  return rows.filter((row) => {
    return columns.some((col) => {
      if (col.filterValue) {
        const value = col.filterValue(row);

        return normalize(value).includes(fil);
      }

      const raw = row[col.key];
      return String(raw ?? '').includes(fil);
    });
  });
}
