import { Flex, HomeFooter, NavBottom, NavTop, Scroll } from '@/lib/components'
import React from 'react'

type P = { children: React.ReactNode }

export default async function PrivateLayout({ children }: P) {
   return (
      <Flex className='w-full h-screen overflow-hidden' direction={'column'}>
         <Flex direction={'column'} align={'center'}>
            <NavTop />
         </Flex>
         <Flex className='h-full' align={'center'} justify={'center'}>
            {children}
         </Flex>
         <Flex direction={'column'} align={'center'}>
            <NavBottom />
         </Flex>
      </Flex>
   )
}
