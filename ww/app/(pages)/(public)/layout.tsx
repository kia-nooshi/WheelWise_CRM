import { HomeFooter, HomeNav } from '@/components/pt'
import { FlexColC } from '@/components/ui'
import React from 'react'

type P = {
   children: React.ReactNode
}

const PublicLayout = ({ children }: P) => {
   return (
      <FlexColC className='h-screen w-full overflow-hidden'>
         <HomeNav />
         <FlexColC className='h-full'>{children}</FlexColC>
         <HomeFooter />
      </FlexColC>
   )
}

export default PublicLayout
