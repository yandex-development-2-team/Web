import { useId, type ComponentProps } from 'react';
import { cn } from '@/utils';
import ChevronDownIcon from '@/assets/icons/arrow-down.svg?react';

interface SelectProps extends Omit<ComponentProps<'select'>, 'size'> {
  placeholder?: string;
  error?: string;
  withIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

function Select({
  className,
  id,
  placeholder,
  error,
  children,
  value,
  withIcon = true,
  size = 'md',
  ...props
}: SelectProps) {
  const generatedId = useId();
  const selectId = id || generatedId;
  const isPlaceholder = !value;

  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <select
          id={selectId}
          value={value}
          className={cn(
            'bg-card border-border h-11 w-full appearance-none rounded-lg border p-3 transition outline-none',
            'focus-visible:border-ring focus-visible:ring-ring/50',
            'disabled:pointer-events-none disabled:opacity-50',
            sizeStyles[size],
            withIcon && 'pr-10',
            isPlaceholder && 'text-muted-foreground italic opacity-60',
            className,
          )}
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {children}
        </select>

        {withIcon && (
          <ChevronDownIcon className="text-border pointer-events-none absolute top-7 right-2 -translate-y-1/2 opacity-40" />
        )}
      </div>

      {error && <div className="xxs-text text-error">{error}</div>}
    </div>
  );
}

export { Select };
