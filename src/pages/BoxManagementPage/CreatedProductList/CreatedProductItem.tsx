import { useState } from 'react';
import { cn } from '@/utils';
import { BoxWithStarIcon, CloseIcon, PencilIcon } from '@/assets/icons';
import { Button } from '@/components/ui/Button';
import { BoxModal, ProjectModal, DeleteModal } from '@/components/ui/Modal';
import type { ProjectItem } from '@/mock/boxManagementPage.mock';

interface CreatedProductItemProps {
  title: string;
  id: string;
  item?: ProjectItem;
  mode?: 'box' | 'spec_projects';
}

export function CreatedProductItem({
  title,
  id,
  item,
  mode = 'box',
}: CreatedProductItemProps) {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);

  return (
    <div className="border-muted flex items-center justify-between rounded-lg border px-7 py-5">
      <div className={'flex items-center gap-7 font-semibold'}>
        <BoxWithStarIcon className="text-muted-foreground" />
        {title}
      </div>
      <div className={cn('text-muted-foreground flex items-center')}>
        <Button
          size={'icon-lg'}
          variant={'ghost'}
          className="hover:text-foreground transition-all duration-300"
          onClick={() => setIsOpenEdit(true)}
        >
          <PencilIcon />
        </Button>
        <Button
          size={'icon-lg'}
          variant={'ghost'}
          className="hover:text-foreground transition-all duration-300"
          onClick={() => setIsOpenDelete(true)}
        >
          <CloseIcon />
        </Button>
      </div>
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
    </div>
  );
}
