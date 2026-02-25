import { type ComponentProps } from 'react';
import { cn } from '@/utils';

type CardProps = ComponentProps<'div'> & {
  variant?: 'default' | 'flat';
};

function Card({ className, variant = 'flat', ...props }: CardProps) {
  return (
    <div
      className={cn(
        variant === 'default'
          ? 'bg-card text-card-foreground rounded-xl border shadow-sm'
          : 'bg-card text-card-foreground rounded-none border-0 shadow-none',
        className,
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={cn('grid auto-rows-min px-6', className)} {...props} />
  );
}

function CardTitle({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={cn('text-[32px] leading-normal font-bold', className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('px-6', className)} {...props} />;
}

export { Card, CardHeader, CardTitle, CardContent };
