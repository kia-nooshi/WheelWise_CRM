import { Flex, HomeFooter, Navigation, Scroll } from '@/lib/components'
import React from 'react'

type P = { children: React.ReactNode }

export default async function PrivateLayout({ children }: P) {
   return (
      <Flex className='w-full h-screen overflow-hidden' direction={'column'}>
         <Flex direction={'column'} align={'center'}>
            <Navigation />
         </Flex>
         <Flex className='h-full'>{children}</Flex>
         <Flex direction={'column'}>Footer</Flex>
      </Flex>
   )
}
