import { SwitchItem } from '@/components/ui/Switch';
import type { PermissionItemType } from '@/mock/systemSettingsPage.mock';
import { cn } from '@/utils';

interface PersmissionListProps {
  className?: string;
  title?: string;
  permissionItems: PermissionItemType[];
}

export function PersmissionList({
  permissionItems,
  className,
  title,
}: PersmissionListProps) {
  return (
    <div className={cn('flex flex-col gap-5', className)}>
      <h5>{title}</h5>
      <div className={cn('flex flex-col gap-3 pl-10')}>
        {permissionItems.map((option) => {
          return (
            <SwitchItem
              key={option.id}
              label={option.name}
              checked={option.checked}
            />
          );
        })}
      </div>
    </div>
  );
}
