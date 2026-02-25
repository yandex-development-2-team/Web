import { useId, type ComponentProps } from 'react';
import { cn } from '@/utils';
import { Label } from '@/components/ui/Label/Label';

interface TextareaProps extends ComponentProps<'textarea'> {
  label?: string;
  error?: string;
}

function Textarea({ className, id, label, error, ...props }: TextareaProps) {
  const gegerateId = useId();
  const textareaId = id || gegerateId;

  return (
    <div className={cn('flex flex-col gap-1')}>
      {label && <Label htmlFor={textareaId}>{label}</Label>}
      <div className={cn('relative')}>
        <textarea
          data-slot="textarea"
          id={textareaId}
          className={cn(
            'bg-card flex field-sizing-content min-h-15 w-full rounded-lg p-3',
            'border-border border',
            'placeholder:text-border placeholder:text-[14px] placeholder:italic',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus:border-muted-foreground focus:placeholder:text-ring',
            'aria-invalid:ring-error/20 aria-invalid:border-error',
            'text-foreground transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          {...props}
        />
        {error && (
          <div
            className={cn('xxs-text text-error absolute -bottom-5 left-0 z-10')}
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export { Textarea };
