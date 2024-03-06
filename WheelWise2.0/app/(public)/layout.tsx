import { C, Ui } from '@/components'
import { ReactNode } from 'react'

export default function PublicLayout({ children }: { children: ReactNode }) {
   return (
      <Ui.Flex className='h-screen' direction={'column'} align={'center'}>
         <C.Public.Nav />
         {children}
         <C.Public.Footer />
      </Ui.Flex>
   )
}
