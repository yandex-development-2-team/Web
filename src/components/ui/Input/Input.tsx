import { useId, type ComponentProps } from 'react';
import { cn } from '@/utils';
import { Label } from '@/components/ui/Label';

interface InputProps extends ComponentProps<'input'> {
  label?: string;
  error?: string;
}

function Input({
  className,
  type = 'text',
  id,
  label,
  error,
  ...props
}: InputProps) {
  const gegerateId = useId();
  const inputId = id || gegerateId;

  return (
    <div className={cn('flex min-w-18 flex-col gap-1')}>
      {label && <Label htmlFor={inputId}>{label}</Label>}
      <div className={cn('relative')}>
        <input
          id={inputId}
          type={type}
          data-slot="input"
          className={cn(
            'bg-card h-11 w-full min-w-0 rounded-lg p-3',
            'border-border border',
            'placeholder:text-border placeholder:text-[14px] placeholder:italic',
            'file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium',
            'selection:bg-primary selection:text-primary-foreground transition-[color,box-shadow] outline-none',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus:placeholder:text-ring focus:border-muted-foreground',
            'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
            'aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
            className,
          )}
          {...props}
        />

        {error && (
          <div className={cn('xxs-text text-error absolute -bottom-4 left-0')}>
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export { Input };
