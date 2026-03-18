import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { Button } from '@/components/ui/Button';
import { PlusIcon } from '@/assets/icons';
import { cn } from '@/utils';

interface SmartWrapperProps extends React.PropsWithChildren {
  className?: string;
  to?: string;
  onClick?: () => void;
}

function SmartWrapper({ to, className, onClick, children }: SmartWrapperProps) {
  if (to) {
    return (
      <Link to={to} className={cn(className)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cn(className)} onClick={onClick}>
      {children}
    </button>
  );
}

interface CreateButtonProps {
  title: string;
  onCreateItem?: () => void;
  icon?: ReactNode;
  className?: string;
  to?: string;
  variant?: 'outline' | 'colorful';
}

export function CreateButton({
  title,
  onCreateItem,
  icon,
  className,
  to,
  variant = 'outline',
}: CreateButtonProps) {
  return (
    <SmartWrapper
      to={to}
      onClick={onCreateItem}
      className={cn(
        'flex w-full cursor-pointer items-center justify-between rounded-lg px-5.25 py-5.75',
        'border-primary border',
        'hover:border-accent-strong active:border-accent',
        'transition-all duration-300',
        {
          ['bg-primary']: variant === 'colorful',
          ['bg-card']: variant === 'outline',
        },
        className,
      )}
    >
      <div className={'flex items-center gap-3 font-semibold'}>
        {icon}
        {title}
      </div>
      <Button
        size={'icon-lg'}
        variant={
          variant === 'colorful' ? 'default-secondary' : 'default-primary'
        }
        asChild
      >
        <span>
          <PlusIcon className="text-foreground" />
        </span>
      </Button>
    </SmartWrapper>
  );
}
