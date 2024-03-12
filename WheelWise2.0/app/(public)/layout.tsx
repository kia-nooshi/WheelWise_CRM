import { Comp, Ui } from '@/components'
import { ReactNode } from 'react'

export default function PublicLayout({ children }: { children: ReactNode }) {
   return (
      <Ui.Flex
         className='h-screen'
         direction={'column'}
         align={'center'}
      >
         <Comp.Public.Nav />
         {children}
         <Comp.Public.Footer />
      </Ui.Flex>
   )
}
