import type { Column } from '@/components/ui/DataTable/Table.types';
import type { ReactNode } from 'react';

function Cell<T>({ row, column }: { row: T; column: Column<T> }) {
  const value =
    typeof column.getValue === 'function'
      ? column.getValue(row)
      : (row[column.key] as ReactNode);

  return <td className="pl-3 font-sans font-normal">{value}</td>;
}

export { Cell };
