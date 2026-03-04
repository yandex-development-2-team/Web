import { useState } from 'react';
import type { FileType } from '@/mock/exporting-files-page.mock';
import { cn } from '@/utils';
import { Button } from '@/components/ui/Button';
import { UploadIcon, CloseIcon, TrashOpenIcon } from '@/assets/icons';
import { Progress } from '@/components/ui/Progress';
import { DeleteModal } from '@/components/ui/Modal';
import { useFileDownload } from '@/hooks';

interface UploadItemProps {
  item: FileType;
  onRemoveItem?: (id: string) => void;
  className?: string;
}

export function UploadItem({ item, onRemoveItem }: UploadItemProps) {
  const { handleDownload, isRunning, progress, cancelDownload } =
    useFileDownload();

  const [isOpen, setIsOpen] = useState(false);
  const handleOpenRemove = () => {
    setIsOpen(true);
  };
  const handleConfirmRemove = () => {
    onRemoveItem?.(item.id);
  };

  return (
    <>
      <DeleteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirmRemove}
        itemId={item.id}
        deletePath="#"
      />
      <div
        className={cn(
          'border-b-muted relative flex items-center justify-between border-b p-3 pr-2 transition-all duration-300',
          {
            ['pb-3']: !isRunning,
            ['pb-6']: isRunning,
          },
        )}
      >
        <div className="item flex gap-3">
          <Button
            size={'icon-md'}
            variant={'default-secondary'}
            className={cn('border-muted-foreground size-11.5 border')}
            onClick={() => handleDownload({ id: item.id, path: '#' })}
            disabled={isRunning}
          >
            <UploadIcon />
          </Button>
          <div className="flex flex-col gap-2">
            <h5>{item.name}</h5>
            <span className="text-muted-foreground text-[12px]/[100%]">
              {item.size} MB
            </span>
          </div>
        </div>
        <Button
          size={'icon-md'}
          variant={'ghost'}
          className={cn('group', {
            ['hover:[&_svg]:stroke-destructive visible']: !isRunning,
          })}
          onClick={isRunning ? cancelDownload : handleOpenRemove}
        >
          {isRunning ? (
            <CloseIcon
              width={24}
              height={24}
              className="transition-all duration-300 group-hover:stroke-2"
            />
          ) : (
            <TrashOpenIcon
              className={cn(
                'size-8 transition-all duration-300 group-hover:scale-110',
              )}
            />
          )}
        </Button>
        <Progress
          className={cn(
            'absolute bottom-3 left-3 w-[94%] transition-all duration-300',
            {
              ['opacity-0']: !isRunning,
              ['opacity-100']: isRunning,
            },
          )}
          value={progress}
        />
      </div>
    </>
  );
}
