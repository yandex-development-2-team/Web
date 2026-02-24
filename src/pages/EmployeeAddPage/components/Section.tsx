import { type ReactNode } from 'react'
import { cn } from '@/utils'

type Props = {
  title: string
  children: ReactNode
  className?: string
}

export function Section({ title, children, className }: Props) {
  return (
    <div className={cn('space-y-4', className)}>
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </div>
  )
}
