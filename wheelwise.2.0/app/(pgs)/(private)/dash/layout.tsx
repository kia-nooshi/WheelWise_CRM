import React, { ReactNode } from 'react'

interface Props {
   children: ReactNode
}
import { ScrollArea } from '@/components/ui/scroll-area'

function layout({ children }: Props) {
   return (
      <ScrollArea className='h-full w-full pl-52 pr-52'>{children}</ScrollArea>
   )
}

export default layout
