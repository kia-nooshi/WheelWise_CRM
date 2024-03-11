import { Ui, Comp } from '@/components'
import React from 'react'

type P = { children: React.ReactNode }

export default async function PrivateLayout({ children }: P) {
   return (
      <Ui.Flex
         className='w-full h-screen overflow-hidden'
         direction={'column'}
      >
         <Ui.Flex
            direction={'column'}
            align={'center'}
         >
            <Comp.Private.Nav />
         </Ui.Flex>
         <Ui.Flex
            className='h-full overflow-hidden'
            align={'center'}
            justify={'center'}
         >
            <Ui.Scroll className='w-full'>
               <div className='w-full pr-56 pl-56'>{children}</div>
            </Ui.Scroll>
         </Ui.Flex>
         <Ui.Flex
            direction={'column'}
            align={'center'}
         >
            <Comp.Private.Footer />
         </Ui.Flex>
      </Ui.Flex>
   )
}
