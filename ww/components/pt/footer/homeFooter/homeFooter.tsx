import { FlexRowC } from '@/components/ui'
import { SignedIn, SignOutButton, SignedOut } from '@clerk/nextjs'
import React from 'react'

export const HomeFooter = () => {
   return (
      <div className='p-5'>
         © 2024 WheelWise CRM. All Rights Reserved.
         <FlexRowC className='text-sm text-red-800 gap-2'>
            Debugging :
            <SignedIn>
               <div>
                  Your are Singedin : <SignOutButton />
               </div>
            </SignedIn>
            <SignedOut>
               <div>Your are NOT Singedin yet</div>
            </SignedOut>
         </FlexRowC>
      </div>
   )
}
