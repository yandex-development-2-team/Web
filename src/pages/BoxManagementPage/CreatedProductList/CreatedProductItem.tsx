import { useState } from 'react';
import { DeleteModal } from '@/components/ui/Modal';
import { ProductCard } from '@/components/common/ProductCard';
import type { UnitProductType } from '@/services/product.service';
import { ProjectModal } from '@/components/common/SpecProjectModal';
import { BoxModal } from '@/components/common/BoxModal';

interface CreatedProductItemProps {
  title: string;
  id: string;
  item?: UnitProductType;
  mode?: 'box' | 'spec_projects';
  order: number;
}

export function CreatedProductItem({
  title,
  id,
  item,
  mode = 'box',
  order,
}: CreatedProductItemProps) {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const label =
    mode === 'spec_projects'
      ? `Спецпроект №${order}:`
      : `Коробочное решение №${order}:`;

  return (
    <>
      <ProductCard
        label={label}
        title={title}
        description={item?.description}
        image={item?.image}
        isActive={item?.isActive}
        onOpen={() => setIsOpenEdit(true)}
        onEdit={() => setIsOpenEdit(true)}
        onDelete={() => setIsOpenDelete(true)}
      />
      <DeleteModal
        isOpen={isOpenDelete}
        itemId={id}
        onClose={() => setIsOpenDelete(false)}
        deletePath="#"
        onConfirm={() => id}
      />
      {mode === 'spec_projects' && (
        <ProjectModal
          variant="edit"
          isOpen={isOpenEdit}
          onClose={() => setIsOpenEdit(false)}
          item={item ? item : undefined}
        />
      )}
      {mode === 'box' && (
        <BoxModal
          variant="edit"
          isOpen={isOpenEdit}
          onClose={() => setIsOpenEdit(false)}
          item={item ? item : undefined}
        />
      )}
    </>
  );
}
