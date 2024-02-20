import React from 'react'
import { twMerge } from 'tailwind-merge'

type P = {
   children?: React.ReactNode
   className?: string
}

export const FlexRowC = ({ children, className }: P) => {
   return (
      <div
         className={twMerge(
            'flex flex-row items-center justify-center',
            className
         )}
      >
         {children}
      </div>
   )
}
