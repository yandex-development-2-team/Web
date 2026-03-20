import { CreateButton } from '@/components/ui/Button';
import { cn } from '@/utils';
import type { ReactNode } from 'react';

interface ProductsListProps extends React.PropsWithChildren {
  createTitle: string;
  onCreateItem: () => void;
  icon?: ReactNode;
}

export function ProductsList({
  createTitle,
  onCreateItem,
  children,
  icon,
}: ProductsListProps) {
  return (
    <div className={cn('flex flex-col gap-5')}>
      <CreateButton
        title={createTitle}
        onCreateItem={onCreateItem}
        icon={icon}
      />
      {children}
    </div>
  );
}
