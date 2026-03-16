import { Box1Icon, PlusIcon, ThreeDotsIcon } from '@/assets/icons';
import { Button, CreateButton } from '@/components/ui/Button';
import { ButtonAddCard, ButtonCard } from '@/components/ui/Button/ButtonCard';
import { AddBlockModal } from '@/components/ui/Modal';
import { cn } from '@/utils';
import { useState } from 'react';

function TeamActions() {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn('relative')}>
      {open && (
        <div
          className={cn(
            'border-border bg-card absolute -top-6 right-3 flex min-w-36 flex-col gap-2 rounded-lg border p-3 shadow-md',
          )}
        >
          <div className={cn('flex items-center justify-between')}>
            <span>Написать</span>
            <Box1Icon />
          </div>
          <div className={cn('flex items-center justify-between')}>
            <span>Позвонить</span>
            <Box1Icon />
          </div>
        </div>
      )}
      <button onClick={() => setOpen((prev) => !prev)}>
        <ThreeDotsIcon />
      </button>
    </div>
  );
}

const AnalyticsPage = () => {
  const [showAddBlock, setShowAddBlock] = useState(false);

  return (
    <div className="flex w-full flex-col gap-5 pr-1">
      <div className="flex items-center gap-5">
        <CreateButton title="Создать коробку" icon={<Box1Icon />} />
        <CreateButton title="Создать спецпроект" icon={<Box1Icon />} />
        <CreateButton title="Добавить пользователя" icon={<Box1Icon />} />
      </div>
      <div
        className={cn(
          'grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] justify-between gap-5 overflow-auto',
          'h-145',
        )}
      >
        {Array.from({ length: 5 })
          .fill('1')
          .map((it, idx) => (
            <ButtonCard
              to=""
              title="Средняя посещаемость на коробку"
              subTitle="Статистика за выбранный период"
              icon={<Box1Icon />}
              className="max-w-145"
              key={idx}
            />
          ))}
        <ButtonAddCard
          className="max-w-85"
          icon={<PlusIcon />}
          onClick={() => setShowAddBlock(true)}
        />
        <AddBlockModal
          isOpen={showAddBlock}
          onClose={() => {
            console.log('close');
            setShowAddBlock(false);
          }}
          title="Добавить блок"
        />
      </div>
      <div className="grid grid-cols-[56%_1fr] gap-5">
        <div className="bg-card flex flex-col gap-10 rounded-lg p-5">
          <div className="flex items-center justify-between">
            <h4>Сводка</h4>
            <div>
              <Button>День</Button>
              <Button variant={'default-secondary'}>Неделя</Button>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <div className="w-full">
              <small>{'В работе'}</small>
              <div
                className={cn(
                  'flex h-38 items-center justify-center rounded-lg border',
                  'text-[60px] font-bold',
                  {
                    ['text-destructive']: false,
                  },
                )}
              >
                5
              </div>
            </div>
            <div className="w-full">
              <small>{'В работе'}</small>
              <div
                className={cn(
                  'flex h-38 items-center justify-center rounded-lg border',
                  'text-[60px] font-bold',
                  {
                    ['text-destructive']: false,
                  },
                )}
              >
                5
              </div>
            </div>
            <div className="w-full">
              <small>{'В работе'}</small>
              <div
                className={cn(
                  'flex h-38 items-center justify-center rounded-lg border',
                  'text-[60px] font-bold',
                  {
                    ['text-destructive']: false,
                  },
                )}
              >
                5
              </div>
            </div>
          </div>
        </div>
        <div className="bg-card flex flex-col gap-3 rounded-lg p-5">
          <h4>Команда дня</h4>
          <div className="flex flex-col gap-4 overflow-auto">
            <div className="border-b-border flex justify-between gap-1 border-b pb-3">
              <div className="flex gap-1">
                <div className="bg-accent-strong m-1 h-3.5 w-3.5 rounded-full"></div>
                <div className="flex flex-col gap-1">
                  <span>Иванов Илья</span>
                  <span>Менеджер 1 звена</span>
                </div>
              </div>
              <TeamActions />
            </div>
            <div className="border-b-border flex justify-between gap-1 border-b pb-3">
              <div className="flex gap-1">
                <div className="bg-accent-strong m-1 h-3.5 w-3.5 rounded-full"></div>
                <div className="flex flex-col gap-1">
                  <span>Иванов Илья</span>
                  <span>Менеджер 1 звена</span>
                </div>
              </div>
              <TeamActions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Component = AnalyticsPage;
