import { FlexColC, HomeFooter, PrivateNav } from '@/components'
import { Auth } from '@/lib/function'
import { ScrollArea } from '@radix-ui/themes'
import React from 'react'

type P = { children: React.ReactNode }

export default async function PrivateLayout({ children }: P) {
   return (
      <FlexColC className='h-screen w-full overflow-hidden'>
         <PrivateNav />
         <ScrollArea
            type='always'
            scrollbars='vertical'
            className='my-28 mb-16 px-52 h-full'
         >
            <FlexColC className='h-full'>{children}</FlexColC>
         </ScrollArea>
         <HomeFooter />
      </FlexColC>
   )
}
