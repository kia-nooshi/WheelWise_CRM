import { Ui, Comp, Do } from '@/lib'
import React from 'react'

export default async function PrivateLayout({ children }: { children: React.ReactNode }) {
  const u = await Do.User.Onboarding()

  return (
    <Ui.Flex
      align={'center'}
      justify={'center'}
      direction={'column'}
      gap={'large'}
      className='w-full h-screen px-28'
    >
      {children}
    </Ui.Flex>
  )
}
