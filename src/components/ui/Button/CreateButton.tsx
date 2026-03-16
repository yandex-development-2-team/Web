import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { PlusIcon } from '@/assets/icons';
import { cn } from '@/utils';

interface CreateButtonProps {
  title: string;
  onCreateItem?: () => void;
  icon?: ReactNode;
  className?: string;
}

export function CreateButton({
  title,
  onCreateItem,
  icon,
  className,
}: CreateButtonProps) {
  return (
    <div
      className={cn(
        'border-primary hover:border-accent-strong active:border-accent bg-card flex w-full items-center justify-between rounded-lg border px-5.25 py-5.75 transition-all duration-300',
        className,
      )}
    >
      <div className={'flex items-center gap-3 font-semibold'}>
        {icon}
        {title}
      </div>
      <Button size={'icon-lg'} onClick={onCreateItem}>
        <PlusIcon className="text-foreground" />
      </Button>
    </div>
  );
}
