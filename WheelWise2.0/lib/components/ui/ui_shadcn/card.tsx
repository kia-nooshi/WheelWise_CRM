import * as React from 'react'
import { Util } from '@/lib'

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={Util.Other.cn('rounded-xl border bg-card text-card-foreground shadow', className)}
      {...props}
    />
  )
)
Card.displayName = 'Card'
