import { cn } from '@/utils';
import { ActionDropdown } from '@/components/ui/ActionDropdown';

interface ContactiItemProps {
  className?: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'manager1' | 'manager2' | 'manager3';
  status: 'online' | 'offline';
}

const roleMap = {
  admin: 'Администратор',
  manager1: 'Менеджер 1 звена',
  manager2: 'Менеджер 2 звена',
  manager3: 'Менеджер 3 звена',
};

export function ContactiItem({
  firstName,
  lastName,
  role,
  status,
  className,
}: ContactiItemProps) {
  return (
    <div
      className={cn(
        'flex min-h-13 justify-between pb-1',
        'border-b-border border-b',
        className,
      )}
    >
      <div className={cn('flex gap-1')}>
        <div
          className={cn('m-1 h-3.5 w-3.5 rounded-full', {
            ['bg-accent-strong']: status === 'online',
            ['bg-muted']: status === 'offline',
          })}
        ></div>
        <div className={cn('flex flex-col')}>
          <div className={cn('flex gap-1 text-[14px]')}>
            <span>{lastName}</span>
            <span>{firstName}</span>
          </div>
          <span className={cn('text-[12px]')}>{roleMap[role]}</span>
        </div>
      </div>
      <div className="actions">
        <ActionDropdown />
      </div>
    </div>
  );
}
