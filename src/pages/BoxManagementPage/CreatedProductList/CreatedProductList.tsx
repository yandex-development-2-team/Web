import { cn } from '@/utils';
import type { ProjectItem } from '@/mock/boxManagementPage.mock';
import { CreatedProductItem } from './CreatedProductItem';

interface CreatedProductsListProps extends React.PropsWithChildren {
  items: ProjectItem[];
  productVariant?: 'box' | 'spec_projects';
}

export function CreatedProductList({
  items,
  productVariant,
}: CreatedProductsListProps) {
  return (
    <div className={cn('flex flex-col gap-5')}>
      {items.map((item) => (
        <CreatedProductItem
          key={item.id}
          name={item.name}
          id={item.id}
          item={item}
          mode={productVariant}
        />
      ))}
    </div>
  );
}
