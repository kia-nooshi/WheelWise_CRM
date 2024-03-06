import { C, Ui } from '@/components'
import { SignOutButton, SignedIn, SignedOut } from '@clerk/nextjs'

export default function Footer() {
   return (
      <div className='p-5'>
         © 2024 WheelWise CRM. All Rights Reserved.
         <Ui.Flex className='text-xs text-gray-500'>
            Debugging :
            <SignedIn>
               <div>
                  Your are Singedin : <SignOutButton />
               </div>
            </SignedIn>
            <SignedOut>
               <div>Your are NOT Singedin yet</div>
            </SignedOut>
         </Ui.Flex>
      </div>
   )
}
