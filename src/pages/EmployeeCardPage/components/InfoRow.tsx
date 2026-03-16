import { cn } from '@/utils';

type Props = {
  label: string;
  value: string;
  className?: string;
};

export function InfoRow({ label, value, className }: Props) {
  return (
    <div className={cn('text-md grid grid-cols-[190px_1fr] gap-2', className)}>
      <p className="text-foreground/80">{label}</p>
      <p>{value}</p>
    </div>
  );
}
