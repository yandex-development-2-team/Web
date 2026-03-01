import { useId, type ComponentProps } from 'react'
import { cn } from '@/utils'
import ChevronDownIcon from '@/assets/icons/arrow-down.svg?react'

interface SelectProps extends Omit<ComponentProps<'select'>, 'size'> {
  placeholder?: string
  error?: string
  withIcon?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const sizeStyles = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
}

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
  const generatedId = useId()
  const selectId = id || generatedId
  const isPlaceholder = !value

  return (
    <div className="flex flex-col gap-1">
      <div className="relative">
        <select
          id={selectId}
          value={value}
          className={cn(
            'bg-card w-full h-11 p-3  rounded-lg border border-border appearance-none outline-none transition',
            'focus-visible:border-ring focus-visible:ring-ring/50',
            'disabled:pointer-events-none disabled:opacity-50',
            sizeStyles[size],
            withIcon && 'pr-10',
            isPlaceholder && 'italic text-muted-foreground opacity-60',
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
          <ChevronDownIcon className="pointer-events-none absolute right-2 top-7 text-border -translate-y-1/2 opacity-40" />
        )}
      </div>

      {error && <div className="xxs-text text-error">{error}</div>}
    </div>
  )
}

export { Select }