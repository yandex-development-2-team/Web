import type { ControlsTable } from '@/components/ui/DataTable/Table.types';
import { cn } from '@/utils';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

type DataTableControlsProps = {
  showControls?: ControlsTable;
  rowCount: number;
  onChangeRowCount: (count: number) => void;
  canShowMore: boolean;
  onShowMore: () => void;
};

export function DataTableControls({
  showControls,
  rowCount,
  onChangeRowCount,
  canShowMore,
  onShowMore,
}: DataTableControlsProps) {
  if (!showControls) return null;

  return (
    <div className={cn('flex flex-row items-center justify-end')}>
      {showControls === 'showBy' && (
        <div className={cn('flex flex-row items-center gap-3')}>
          <span className={cn('text-muted-foreground')}>Показывать по</span>
          <Input
            type="number"
            value={rowCount}
            min={1}
            className={cn(
              'border-muted-foreground text-muted-foreground h-12 w-12 border text-center',
            )}
            onChange={(e) => {
              const count = Math.max(1, Number(e.target.value) || 1);
              onChangeRowCount(count);
            }}
          />
        </div>
      )}
      {showControls === 'showMore' && (
        <Button
          disabled={!canShowMore}
          variant={'ghost'}
          className={cn('text-muted-foreground mr-5 p-0 font-normal')}
          onClick={onShowMore}
        >
          Показать больше
        </Button>
      )}
    </div>
  );
}
