import { type ComponentProps } from 'react'
import { cn } from '@/utils'

type Props = ComponentProps<'div'>

export function FormCard({ className, ...props }: Props) {
  return (
    <div
      className={cn(
        'rounded-xl shadow-sm',
        className
      )}
      {...props}
    />
  )
}
