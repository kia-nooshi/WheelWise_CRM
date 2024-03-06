import { CMP } from '@/lib'
import { ReactNode } from 'react'

export default function PublicLayout({ children }: { children: ReactNode }) {
   return (
      <CMP.Ui.Flex className='h-screen' direction={'column'} align={'center'}>
         <CMP.Public.Nav />
         {children}
         <CMP.Public.Footer />
      </CMP.Ui.Flex>
   )
}
