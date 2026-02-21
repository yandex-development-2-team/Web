import type { Column } from '../Table.types';

export function TableRowState<T>({
  text,
  columns,
}: {
  text: string;
  columns: Column<T>[];
}) {
  return (
    <tr className="h-13 align-middle">
      <td colSpan={columns.length} className="pr-3 pl-3 text-center">
        {text}
      </td>
    </tr>
  );
}
