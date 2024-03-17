import { Comp, Ui } from '@/lib'
import { ReactNode } from 'react'

export default function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <Ui.Flex
      className='w-full h-screen gap-0'
      align={'center'}
      justify={'center'}
      direction={'column'}
    >
      <Ui.Flex className=' w-full' align={'center'}>
        <Comp.Public.Nav />
      </Ui.Flex>
      <Ui.Flex className='w-full h-full' align={'center'} justify={'center'}>
        {children}
      </Ui.Flex>
      <Ui.Flex className='dark:bg-zinc-950 w-full' align={'center'} justify={'center'}>
        <Comp.Public.Footer />
      </Ui.Flex>
    </Ui.Flex>
  )
}
