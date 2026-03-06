import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { PlusIcon } from '@/assets/icons';

interface CreateButtonProps {
  title: string;
  onCreateItem?: () => void;
  icon?: ReactNode;
}

export function CreateButton({ title, onCreateItem, icon }: CreateButtonProps) {
  return (
    <div className="border-primary hover:border-accent-strong active:border-accent flex items-center justify-between rounded-lg border px-5.25 py-5.75 transition-all duration-300">
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
