import { type ReactNode } from 'react';
import { cn } from '@/utils';
import EmployeesIcon from '@/assets/icons/mdi:user-outline.svg?react';

type Props = {
  title: string;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  withIcon?: boolean;
};

export function Section({
  title,
  icon,
  children,
  className,
  withIcon = true,
}: Props) {
  const defaultIcon = <EmployeesIcon className="h-6 w-6 shrink-0" />;
  return (
    <div className={cn('bg-card rounded-lg p-1', 'space-y-4', className)}>
      <div className="flex items-center gap-2">
        {withIcon && (icon ?? defaultIcon)}
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>
      {children}
    </div>
  );
}
