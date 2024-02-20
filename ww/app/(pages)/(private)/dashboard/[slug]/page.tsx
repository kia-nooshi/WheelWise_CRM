import { Auth } from '@/lib/function'
import { tm } from '@/lib/utils'
import prisma from '@/prisma/client'
import { Card, Text } from '@radix-ui/themes'
import LeadRefresh from './leadRefresh'
import Link from 'next/link'

const LeadPage = async ({ params }: { params: { slug: string } }) => {
   const leadId = params.slug
   const userExternId = await Auth.externalId()

   if (!userExternId.data) {
      throw new Error(
         'Clerk - User Authentication failed - Developer Code : 9999'
      )
   }

   const organization = await prisma.user.findUnique({
      where: {
         externalId: userExternId.data,
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
      <div>
         <LeadRefresh />

         <Link href='/dashboard' className='m-5'>
            back
         </Link>
         <div className='mt-5 flex flex-row gap-5'>
            <div className='flex flex-col w-1/2'>
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
                     <span>✅ Admin Extern ID : {userExternId.data}</span>
                     <span>✅ Lead ID : {lead?.id}</span>
                     <span>✉️ Coversaion ID : {lead?.conversation?.id}</span>
                     <span>
                        ✉️ Ai Thread ID : {lead?.conversation?.threadId}
                     </span>
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
            </div>

            <Card variant='surface' className=''>
               <Text as='div' size='2' weight='bold' className='m-5'>
                  Chat History
               </Text>
               <Text as='div' color='gray' size='1'>
                  {lead?.conversation?.messages.map((msg) => (
                     <div key={msg.id} className='flex flex-col gap-10'>
                        <div
                           className={tm(
                              'rounded-md p-5 my-2 shadow-sm w-2/3',
                              msg.fromLead && ' ml-auto bg-blue-500 text-white',
                              !msg.fromLead &&
                                 'mr-auto bg-gray-200 text-gray-800'
                           )}
                        >
                           {msg.content}
                           <br />
                           <span className='text-xs text-gray-500'>
                              {msg.createdAt.toDateString()}
                           </span>
                        </div>
                     </div>
                  ))}
               </Text>
            </Card>
         </div>
      </div>
   )
}

export default LeadPage
