import { cva, type VariantProps } from 'class-variance-authority'
import * as React from 'react'

import { Util } from '@/lib'

const flexVariants = cva('flex', {
  variants: {
    direction: {
      row: 'flex-row',
      column: 'flex-col',
    },
    wrap: {
      wrap: 'flex-wrap',
      nowrap: 'flex-nowrap',
    },
    justify: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
      between: 'justify-between',
      around: 'justify-around',
    },
    align: {
      start: 'items-start',
      center: 'items-center',
      end: 'items-end',
      stretch: 'items-stretch',
      baseline: 'items-baseline',
    },
    gap: {
      small: 'gap-2',
      medium: 'gap-4',
      large: 'gap-8',
    },
  },
  defaultVariants: {
    direction: 'row',
    wrap: 'nowrap',
    justify: 'start',
    align: 'start',
    gap: 'medium',
  },
})

export interface FlexProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flexVariants> {
  asChild?: boolean
}

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  ({ className, direction, wrap, justify, align, gap, asChild = false, ...props }, ref) => {
    return (
      <div
        className={Util.Other.cn(flexVariants({ direction, wrap, justify, align, gap, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Flex.displayName = 'Flex'

export default Flex
