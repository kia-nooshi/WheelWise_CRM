import { Comp, Ui } from '@/lib'
import { ReactNode } from 'react'

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <Ui.Flex direction={'column'} align={'center'} className='w-full h-screen'>
      <Comp.Public.Nav />
      {children}
      <Comp.Public.Footer />
    </Ui.Flex>
  )
}
