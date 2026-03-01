// src/components/ui/DateInput.tsx

import { forwardRef, useState } from 'react'
import { cn } from '@/utils'
import { Input } from '@/components/ui/Input'

import CalendarIcon from '@/assets/icons/calendar.svg?react'
import ChevronDownIcon from '@/assets/icons/arrow-down.svg?react'

interface DateInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  onOpen?: () => void // позже сюда подключишь календарь
}

export const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ className, error, onOpen, onFocus, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleOpen = () => {
      setIsOpen(true)
      onOpen?.()
    }

    return (
      <div className="relative w-full">
        <Input
          ref={ref}
          type="text"
          readOnly
          onClick={handleOpen}
          onFocus={(e) => {
            handleOpen()
            onFocus?.(e)
          }}
          className={cn(
            'h-11 pl-10 pr-10 cursor-pointer',
            error && 'border-destructive',
            className
          )}
          {...props}
        />

        {/* Иконка календаря */}
        <div className="absolute left-3 top-7 -translate-y-1/2 pointer-events-none">
          <CalendarIcon className="h-6 w-6 text-border" />
        </div>

        {/* Стрелка */}
        <div className="absolute right-2 top-7 -translate-y-1/2 pointer-events-none">
          <ChevronDownIcon
            className={cn(
              'opacity-40 text-border transition-transform duration-200',
              isOpen && 'rotate-180'
            )}
          />
        </div>

        {error && (
          <div className="mt-1 text-xs text-destructive">{error}</div>
        )}
      </div>
    )
  }
)

DateInput.displayName = 'DateInput'