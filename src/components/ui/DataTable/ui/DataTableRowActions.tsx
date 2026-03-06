import { DeleteIcon, DownloadIcon, EditIcon } from '@/assets/icons';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils';

type DataTableRowActionsProps = {
  id: string;
  onEditRow?: (id: string) => void;
  onDeleteRow?: (id: string) => void;
  onDownloadRow?: (id: string) => void;
};

export function DataTableRowActions({
  id,
  onDeleteRow,
  onDownloadRow,
  onEditRow,
}: DataTableRowActionsProps) {
  if (!onDeleteRow && !onDownloadRow && !onEditRow) return null;

  return (
    <td>
      {onEditRow && (
        <Button
          variant={'ghost'}
          className={cn('h-10 w-10 p-2')}
          onClick={() => onEditRow(id)}
        >
          <EditIcon />
        </Button>
      )}
      {onDeleteRow && (
        <Button
          variant={'ghost'}
          className={cn('h-10 w-10 p-2')}
          onClick={() => onDeleteRow(id)}
        >
          <DeleteIcon />
        </Button>
      )}
      {onDownloadRow && (
        <Button
          variant={'ghost'}
          className={cn('h-10 w-10 p-2')}
          onClick={() => onDownloadRow(id)}
        >
          <DownloadIcon />
        </Button>
      )}
    </td>
  );
}
