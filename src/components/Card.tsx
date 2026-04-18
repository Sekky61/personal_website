import type { ReactNode } from 'react'
import { cn } from '../lib/utils'

type CardProps = {
  children: ReactNode
  className?: string
}

export function ElevatedCard({ children, className }: CardProps) {
  return (
    <div className={cn('surface-container-low elevation-1 shape-medium hover:elevation-2', className)}>
      {children}
    </div>
  )
}
