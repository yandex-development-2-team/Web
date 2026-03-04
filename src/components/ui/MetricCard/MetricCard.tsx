import { cn } from '@/utils';
import { Label } from '../Label';
import type { MetricCardProps } from './MetricCard.type';

export function MetricCard({
  label,
  metric,
  variant = 'primary',
}: MetricCardProps) {
  return (
    <div className="h-44 w-82.5">
      <Label className="font-sans text-black">{label}</Label>
      <div
        className={cn(
          'flex h-38 w-full items-center justify-center rounded-lg border border-border text-6xl font-bold',
          {['text-error']: variant === 'danger'}
        )}
      >
        {metric}
      </div>
    </div>
  );
}
