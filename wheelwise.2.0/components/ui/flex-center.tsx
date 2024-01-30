import { cn } from '@/lib/utils'
import React from 'react'

interface Props {
   children: React.ReactNode
   className?: string
}

const FlexCenter = ({ children, className }: Props) => {
   return (
      <div
         className={cn(
            'w-full h-full flex flex-col items-center justify-center',
            className
         )}
      >
         {children}
      </div>
   )
}

export default FlexCenter
