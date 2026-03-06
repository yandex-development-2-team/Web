import { cn } from '@/utils';
import { Button } from '@/components/ui/Button';
import { ArrowRghtIcon } from '@/assets/icons';
import { getPaginationRange } from '../helpers';

type DataTablePaginationProps = {
  safePage: number;
  totalPage: number;
  onPrev: () => void;
  onNext: () => void;
  onPage: (page: number) => void;
};

export function DataTablePagination({
  safePage,
  totalPage,
  onPrev,
  onNext,
  onPage,
}: DataTablePaginationProps) {
  return (
    <div className={cn('m-3 mb-4 flex items-center justify-end gap-1')}>
      <Button
        variant="ghost"
        disabled={safePage === 1}
        className={cn('p-2.5')}
        onClick={onPrev}
      >
        <ArrowRghtIcon className={cn('stroke-muted-foreground size-3')} />
      </Button>

      {getPaginationRange({
        currentPage: safePage,
        totalPages: totalPage,
        nearCount: 2,
      }).map((item, index) =>
        item === 'dots' ? (
          <span key={`dots-${index}`}>...</span>
        ) : (
          <Button
            key={`page-${item}`}
            variant={item === safePage ? 'default-secondary' : 'ghost'}
            className={cn('h-8 w-8 p-0')}
            onClick={() => onPage(item)}
          >
            {item}
          </Button>
        ),
      )}

      <Button
        variant="ghost"
        className={cn('p-2.5')}
        disabled={safePage === totalPage}
        onClick={onNext}
      >
        <ArrowRghtIcon
          className={cn('stroke-muted-foreground size-3 rotate-180')}
        />
      </Button>
    </div>
  );
}
