import { cn } from '@/utils';
import { CreatedProductItem } from './CreatedProductItem';
import type { UnitProductType } from '@/services/product.service';

interface CreatedProductsListProps extends React.PropsWithChildren {
  items: UnitProductType[];
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
          title={item.title ?? 'Название'}
          id={item.id}
          item={item}
          mode={productVariant}
        />
      ))}
    </div>
  );
}
