import { CMP as c } from '@/lib'
import React from 'react'

type P = { children: React.ReactNode }

export default async function PrivateLayout({ children }: P) {
   return (
      <c.Ui.Flex
         className='w-full h-screen overflow-hidden'
         direction={'column'}
      >
         <c.Ui.Flex direction={'column'} align={'center'}>
            <c.Private.Nav />
         </c.Ui.Flex>
         <c.Ui.Flex
            className='h-full overflow-hidden'
            align={'center'}
            justify={'center'}
         >
            <c.Ui.Scroll className='w-full'>
               <div className='w-full pr-56 pl-56'>{children}</div>
            </c.Ui.Scroll>
         </c.Ui.Flex>
         <c.Ui.Flex direction={'column'} align={'center'}>
            <c.Private.Footer />
         </c.Ui.Flex>
      </c.Ui.Flex>
   )
}
