import React from 'react'
import prisma from '@/prisma/client'
import { getUserExternalID_ClerkSS } from '@/lib/function'
import { Callout, Card, IconButton, Text } from '@radix-ui/themes'
import { IconBase } from 'react-icons'
import { tm } from '@/lib/utils'

const LeadPage = async ({ params }: { params: { slug: string } }) => {
   const leadId = params.slug
   const userExternId = await getUserExternalID_ClerkSS()

   if (!userExternId) {
      throw new Error(
         'Clerk - User Authentication failed - Developer Code : 9999'
      )
   }

   const organization = await prisma.user.findUnique({
      where: {
         externalId: userExternId,
      },
      select: {
         organization: true,
      },
   })

   const organizationId = organization?.organization.id

   const lead = await prisma.lead.findUnique({
      where: {
         id: leadId,
         organizationId: organizationId,
      },
      include: {
         conversation: {
            include: {
               messages: true,
            },
         },
      },
   })

   return (
      <>
         <Card variant='classic' className='mb-5 w-full'>
            <Text as='div' size='2' weight='bold' className='pb-5'>
               Debugging
            </Text>
            <Text
               as='div'
               color='gray'
               size='2'
               className='flex flex-col gap-4'
            >
               <span>✅ Orgenization ID : {organizationId}</span>
               <span>✅ Admin Extern ID : {userExternId}</span>
               <span>✅ Lead ID : {lead?.id}</span>
            </Text>
         </Card>

         <Card className='mb-5 w-full'>
            <Text as='div' size='2' weight='bold' className='pb-5'>
               Lead Information
            </Text>
            <Text
               as='div'
               color='gray'
               size='2'
               className='flex flex-col gap-4'
            >
               <span>
                  <b>Fist Name :</b> {lead?.firstName}
               </span>
               <span>
                  <b>Last Name :</b> {lead?.lastName}
               </span>
               <span>
                  <b>Phone :</b> {lead?.phone}
               </span>
               <span>
                  <b>email :</b> {lead?.email}
               </span>
               <span>
                  <b>Fist Name :</b> {lead?.firstName}
               </span>
            </Text>
         </Card>

         <Card variant='surface' className='w-full'>
            <Text as='div' size='2' weight='bold' className='m-5'>
               Chat History
            </Text>
            <Text as='div' color='gray' size='2'>
               {lead?.conversation?.messages.map((msg) => (
                  <div key={msg.id} className='flex flex-row my-2'>
                     <div
                        className={tm(
                           'w-68 rounded-md p-2 ',
                           msg.fromLead && 'bg-sky-600',
                           !msg.fromLead && 'bg-lime-800'
                        )}
                     >
                        {msg.content}
                        <br />
                        <span className='text-xs text-gray-300'>
                           {msg.createdAt.toDateString()}
                        </span>
                     </div>
                  </div>
               ))}
            </Text>
         </Card>
      </>
   )
}

export default LeadPage
