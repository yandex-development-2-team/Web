import { cn } from '@/utils';
import { useState } from 'react';
import { BoxWithStarIcon, CloseIcon, PencilIcon } from '@/assets/icons';
import { Button } from '@/components/ui/Button';
import { DeleteModal } from '@/components/ui/Modal';

interface CreatedProductItemProps {
  name: string;
  id: string;
}

export function CreatedProductItem({ name, id }: CreatedProductItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-muted flex items-center justify-between rounded-lg border px-7 py-5">
      <div className={'flex items-center gap-7 font-semibold'}>
        <BoxWithStarIcon className="text-muted-foreground" />

        {name}
      </div>
      <div className={cn('text-muted-foreground flex items-center')}>
        <Button
          size={'icon-lg'}
          variant={'ghost'}
          className="hover:text-foreground transition-all duration-300"
        >
          <PencilIcon />
        </Button>
        <Button
          size={'icon-lg'}
          variant={'ghost'}
          className="hover:text-foreground transition-all duration-300"
          onClick={() => setIsOpen(true)}
        >
          <CloseIcon />
        </Button>
      </div>
      <DeleteModal
        isOpen={isOpen}
        itemId={id}
        onClose={() => setIsOpen(false)}
        deletePath="#"
        onConfirm={() => console.log('id ', id)}
      />
    </div>
  );
}
