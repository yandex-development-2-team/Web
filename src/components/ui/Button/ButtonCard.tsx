import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { cn } from '@/utils';
import { Button } from './Button';

interface ButtonCardProps {
  title: string;
  subTitle: string;
  icon: ReactNode;
  to: string;
  className?: string;
  buttonTxt?: string;
}

export function ButtonCard({
  title,
  subTitle,
  icon,
  className,
  to,
  buttonTxt = 'Подробнее',
}: ButtonCardProps) {
  return (
    <Link
      to={to}
      className={cn(
        'border-border-variant bg-card flex h-70 w-full min-w-75 flex-col gap-5 rounded-lg border p-5 shadow-md',
        'hover:border-accent active:outline-accent-strong active:outline-2',
        'relative transition-all duration-100',
        className,
      )}
    >
      <div className="text-muted-foreground [&_svg]:size-6">{icon}</div>
      <div className="flex flex-col gap-3">
        <h4 className="font-semibold">{title}</h4>
        <h5>{subTitle}</h5>
      </div>
      <Button variant={'default-secondary'} className="mt-auto ml-auto" asChild>
        <span>{buttonTxt}</span>
      </Button>
    </Link>
  );
}

interface ButtonAddCardProps {
  className?: string;
  title?: string;
  onClick?: () => void;
  icon?: ReactNode;
}

export function ButtonAddCard({
  title = 'Добавить блок',
  className,
  onClick,
  icon,
}: ButtonAddCardProps) {
  return (
    <div
      className={cn(
        'border-card flex h-70 w-full flex-col items-center justify-center gap-5 rounded-lg border bg-transparent p-5',
        'relative',
        className,
      )}
    >
      {title}
      <Button
        size={'icon-lg'}
        variant={'default-secondary'}
        className="bg-card"
        onClick={onClick}
      >
        <span>{icon}</span>
      </Button>
    </div>
  );
}
