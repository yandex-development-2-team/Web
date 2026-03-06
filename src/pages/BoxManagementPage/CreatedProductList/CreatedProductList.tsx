import { cn } from '@/utils';
import type { ProjectItem } from '@/mock/boxManagementPage.mock';
import { CreatedProductItem } from './CreatedProductItem';

interface CreatedProductsListProps extends React.PropsWithChildren {
  items: ProjectItem[];
}

export function CreatedProductList({ items }: CreatedProductsListProps) {
  return (
    <div className={cn('flex flex-col gap-5')}>
      {items.map((item) => (
        <CreatedProductItem key={item.id} name={item.name} id={item.id} />
      ))}
    </div>
  );
}
