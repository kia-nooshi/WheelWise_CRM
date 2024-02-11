import { HomeFooter, HomeNav } from '@/components/pt'
import { FlexColC, FlexRowC } from '@/components/ui'
import { SignOutButton, SignedIn, SignedOut } from '@clerk/nextjs'
import React from 'react'

type P = {
   children: React.ReactNode
}

const PublicLayout = ({ children }: P) => {
   return (
      <FlexColC className='h-screen w-full overflow-hidden'>
         <SignedIn>
            <FlexRowC className='gap-5'>
               Debug : Your are Singedin : <SignOutButton />
            </FlexRowC>
         </SignedIn>
         <SignedOut></SignedOut>
         <HomeNav />
         <FlexColC className='h-full'>{children}</FlexColC>
         <HomeFooter />
      </FlexColC>
   )
}

export default PublicLayout
