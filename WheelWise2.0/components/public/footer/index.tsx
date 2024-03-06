import { CMP } from '@/lib'
import { SignedIn, SignOutButton, SignedOut } from '@clerk/nextjs'
import React from 'react'

export const Footer = () => {
   return (
      <div className='p-5'>
         © 2024 WheelWise CRM. All Rights Reserved.
         <CMP.Ui.Flex className='text-xs text-gray-500'>
            Debugging :
            <SignedIn>
               <div>
                  Your are Singedin : <SignOutButton />
               </div>
            </SignedIn>
            <SignedOut>
               <div>Your are NOT Singedin yet</div>
            </SignedOut>
         </CMP.Ui.Flex>
      </div>
   )
}
