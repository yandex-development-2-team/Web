import { useParams } from 'react-router';
import { PlusIcon } from '@/assets/icons';
import { Button } from '@/components/ui/Button';
import { DeleteModal } from '@/components/ui/Modal';
import { cn } from '@/utils';
import { useModal } from '@/hooks';

const DEFAULT_PAGE_DATA = {
  title: 'Рабочие моментики',
};

export function AnalyticDynamicPage() {
  const { isOpen, open, close } = useModal();
  const { id } = useParams();

  return (
    <div className="flex h-full flex-col justify-between gap-5">
      <div className={cn('flex h-full w-full flex-col gap-5')}>
        <div className={cn('bg-card flex flex-col gap-5 rounded-lg p-5')}>
          <h2>{DEFAULT_PAGE_DATA.title}</h2>
        </div>
        <div className="bg-card flex flex-col gap-8 rounded-lg p-5">
          <p className="text-[24px] font-normal">
            В этом блоке пока нет данных, добавьте первый элемент, чтобы начать
            работу
          </p>
          <div className="flex items-center gap-4">
            <Button size={'icon-lg'}>
              <PlusIcon />
            </Button>
            Добавить файл
          </div>
        </div>
      </div>
      <DeleteModal
        itemId={id ? id : ''}
        isOpen={isOpen}
        onClose={close}
        deletePath=""
        onConfirm={() => console.log('block delete')}
      />
      <Button variant={'danger-secondary'} className="ml-auto" onClick={open}>
        Удалить блок
      </Button>
    </div>
  );
}

export const Component = AnalyticDynamicPage;
