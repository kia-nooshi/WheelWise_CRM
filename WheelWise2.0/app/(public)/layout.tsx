import { FlexColC, HomeFooter, HomeNav } from '@/components'
import { ReactNode } from 'react'

export default function PublicLayout({ children }: { children: ReactNode }) {
   return (
      <FlexColC className='h-screen w-full overflow-hidden'>
         <HomeNav />
         <FlexColC className='h-full'>{children}</FlexColC>
         <HomeFooter />
      </FlexColC>
   )
}
