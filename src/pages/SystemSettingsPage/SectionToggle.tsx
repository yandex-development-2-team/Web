import { Fragment, useState } from 'react';
import { capitalizeFirst, cn } from '@/utils';
import { ChevronUpIcon } from 'lucide-react';
import type { AccessItem } from './systemSettingsPage.constants';
import { PersmissionList } from './PermissionList';

interface ToggleListProps extends React.PropsWithChildren {
  items: AccessItem[];
  onOpenChange: (isOpen: boolean) => void;
}

export function ToggleList({ items, onOpenChange }: ToggleListProps) {
  const [openItemId, setOpenItemId] = useState<string | null>(null);

  const handleToggle = (itemId: string) => {
    const newOpenItemId = openItemId === itemId ? null : itemId;
    setOpenItemId(newOpenItemId);
    onOpenChange(!!newOpenItemId);
  };

  const visibleItems = openItemId
    ? items.filter((item) => item.id === openItemId)
    : items;
  return (
    <div
      className={cn('flex h-full flex-col', {
        ['gap-2']: openItemId,
        ['gap-5']: !openItemId,
      })}
    >
      {visibleItems.map((item) => (
        <Fragment key={item.id}>
          <div
            className={cn(
              'border-primary flex h-24.75 items-center justify-between rounded-lg border px-5.5 py-10',
              'bg-card cursor-pointer',
            )}
            onClick={() => handleToggle(item.id)}
          >
            <div>
              <h3 className={cn('text-foreground')}>
                {capitalizeFirst(item.title)}
              </h3>
              <h4 className={cn('text-muted-foreground')}>
                {capitalizeFirst(item.subTitle)}
              </h4>
            </div>
            <div
              className={cn('mr-1.75', {
                ['rotate-0']: openItemId === item.id,
                ['rotate-180']: openItemId !== item.id,
              })}
            >
              <ChevronUpIcon />
            </div>
          </div>

          {openItemId === item.id && item.content && (
            <div
              className={cn(
                'bg-card h-full rounded-lg',
                'px-10 py-7.5',
                'grid grid-cols-[auto_1fr]',
                'overflow-y-auto',
                'gap-x-25 gap-y-11.25',
              )}
            >
              {item.content.map((group) => (
                <PersmissionList
                  key={group.id}
                  permissionItems={group.options}
                  title={group.groupTitle}
                />
              ))}
            </div>
          )}
        </Fragment>
      ))}
    </div>
  );
}
