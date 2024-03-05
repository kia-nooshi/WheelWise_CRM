import { Flex, HomeFooter, HomeNav } from '@/lib/components'
import { ReactNode } from 'react'

export default function PublicLayout({ children }: { children: ReactNode }) {
   return (
      <Flex className='h-screen' direction={'column'} align={'center'}>
         <HomeNav />
         {children}
         <HomeFooter />
      </Flex>
   )
}
