import { Ui, Comp, Do } from '@/lib'
import React from 'react'

export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
  await Do.Service.onboarding()

  return (
    <Ui.Flex
      className='w-full h-screen gap-0'
      align={'center'}
      justify={'center'}
      direction={'column'}
    >
      <Ui.Flex className=' w-full' align={'center'} justify={'center'}>
        <Comp.Private.Nav />
      </Ui.Flex>
      <Ui.Flex className='w-full h-full overflow-hidden' align={'center'} justify={'center'}>
        <Ui.Scroll.Area className='w-full h-full px-36 py-10'>{children}</Ui.Scroll.Area>
      </Ui.Flex>
      <Ui.Flex className='dark:bg-zinc-950 w-full' align={'center'} justify={'center'}>
        <Comp.Public.Footer />
      </Ui.Flex>
    </Ui.Flex>
  )
}
