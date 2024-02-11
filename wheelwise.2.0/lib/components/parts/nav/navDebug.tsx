import React from 'react'

//! ONLY FOR DEBUGGING - DELETE LATER

import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { auth } from '@clerk/nextjs'
import prisma from '@/prisma/client'

const NavDebug = async () => {
   const { userId } = auth()

   if (!userId) {
      return null
   }

   const thisUser = await prisma.user.findUnique({
      where: {
         externalId: userId,
      },
      include: {
         organization: true,
      },
   })

   return (
      <AlertDialog>
         <AlertDialogTrigger asChild>
            <Button variant='outline'>DeBugging</Button>
         </AlertDialogTrigger>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>User</AlertDialogTitle>
               <AlertDialogDescription>
                  <b className='text-rose-300'>ID : </b> {thisUser?.id}
                  <br />
                  <b className='text-rose-300'>ex ID : </b>
                  {thisUser?.externalId}
                  <br />
                  <b className='text-rose-300'>og ID : </b>
                  {thisUser?.organizationId}
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogHeader>
               <AlertDialogTitle>Orgnization</AlertDialogTitle>
               <AlertDialogDescription>
                  <b>ID :</b> {thisUser?.organization.id}
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancel</AlertDialogCancel>
               <AlertDialogAction>Continue</AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   )
}

export default NavDebug
