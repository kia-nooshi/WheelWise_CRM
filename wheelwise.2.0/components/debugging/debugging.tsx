import { SignOutButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import React from 'react'

import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from '@/components/ui/sheet'

import { Button } from '../ui/button'

const Debugging = () => {
   return (
      <div className='fixed bottom-5 left-4'>
         <Sheet>
            <SheetTrigger className='text-rose-300'>Debuging</SheetTrigger>
            <SheetContent>
               <SheetHeader>
                  <SignedIn>
                     <SheetTitle className='flex flex-row gap-5 justify-center'>
                        <UserButton /> You are Signed in 😊
                     </SheetTitle>
                     <SheetDescription>
                        <SignOutButton />
                     </SheetDescription>
                  </SignedIn>
                  <SignedOut>
                     <SheetTitle className='flex flex-row gap-5 justify-center'>
                        <UserButton /> You are Signed Out 😔
                     </SheetTitle>
                     <SheetDescription>...</SheetDescription>
                  </SignedOut>
               </SheetHeader>
            </SheetContent>
         </Sheet>
      </div>
   )
}

export default Debugging
