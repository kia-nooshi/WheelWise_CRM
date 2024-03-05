import { Flex } from '@/lib/components'
import { SignedIn, SignOutButton, SignedOut } from '@clerk/nextjs'
import React from 'react'

export const HomeFooter = () => {
   return (
      <div className='p-5'>
         © 2024 WheelWise CRM. All Rights Reserved.
         <Flex className='text-xs text-gray-500'>
            Debugging :
            <SignedIn>
               <div>
                  Your are Singedin : <SignOutButton />
               </div>
            </SignedIn>
            <SignedOut>
               <div>Your are NOT Singedin yet</div>
            </SignedOut>
         </Flex>
      </div>
   )
}
