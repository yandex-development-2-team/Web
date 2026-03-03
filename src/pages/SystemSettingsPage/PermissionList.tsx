import { SwitchItem } from '@/components/ui/Switch';
import type { PermissionItemType } from '@/mock/systemSettingsPage.mock';
import { cn } from '@/utils';
import { useFormContext, Controller } from 'react-hook-form';

interface PersmissionListProps {
  className?: string;
  title?: string;
  permissionItems: PermissionItemType[];
  groupIdx?: number | null;
  sectionName?: string;
}

export function PersmissionList({
  permissionItems,
  className,
  title,
  groupIdx = null,
  sectionName = 'admin',
}: PersmissionListProps) {
  const { control } = useFormContext();

  return (
    <div className={cn('flex flex-col gap-5', className)}>
      <h5>{title}</h5>
      <div className={cn('flex flex-col gap-3 pl-10')}>
        {permissionItems.map((option, idx) => {
          return (
            <Controller
              name={`${sectionName}[${groupIdx}].options[${idx}].checked`}
              control={control}
              key={option.id}
              render={({ field }) => {
                return (
                  <SwitchItem
                    {...field}
                    onToggle={field.onChange}
                    label={option.name}
                    checked={field.value}
                  />
                );
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
