import { type ComponentProps } from 'react'
import { cn } from '@/utils'

type Props = ComponentProps<'div'>

export function FormCard({ className, ...props }: Props) {
  return (
    <div
      className={cn(
        'bg-card rounded-xl border shadow-sm p-6',
        className
      )}
      {...props}
    />
  )
}
