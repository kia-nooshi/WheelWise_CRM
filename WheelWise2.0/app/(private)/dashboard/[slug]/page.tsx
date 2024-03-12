import { Do, Util } from '@/components'
import { Card, Text } from '@radix-ui/themes'
import Link from 'next/link'
import LeadRefresh from './leadRefresh'

const LeadPage = async ({ params }: { params: { slug: string } }) => {
   const LeadId = params.slug

   const Lead = await Do.Lead.getLead({ leadId: LeadId })

   const Chat = await Do.Chat.getChat({ leadId: LeadId })

   return (
      <div>
         <LeadRefresh />

         <Link
            href='/dashboard'
            className='m-5'
         >
            back
         </Link>
         <div className='mt-5 flex flex-row gap-5'>
            <div className='flex flex-col w-1/2'>
               <Card className='mb-5 w-full'>
                  <Text
                     as='div'
                     size='2'
                     weight='bold'
                     className='pb-5'
                  >
                     Lead Information
                  </Text>
                  <Text
                     as='div'
                     color='gray'
                     size='2'
                     className='flex flex-col gap-4'
                  >
                     <span>
                        <b>Fist Name :</b> {Lead.data?.firstName}
                     </span>
                     <span>
                        <b>Last Name :</b> {Lead.data?.lastName}
                     </span>
                     <span>
                        <b>Phone :</b> {Lead.data?.phone}
                     </span>
                     <span>
                        <b>email :</b> {Lead.data?.email}
                     </span>
                     <span>
                        <b>Fist Name :</b> {Lead.data?.firstName}
                     </span>
                  </Text>
               </Card>
            </div>

            <Card
               variant='surface'
               className=''
            >
               <Text
                  as='div'
                  size='2'
                  weight='bold'
                  className='m-5'
               >
                  Chat History
               </Text>
               <Text
                  as='div'
                  color='gray'
                  size='1'
               >
                  {Chat.data?.messages.map((msg) => (
                     <div
                        key={msg.id}
                        className='flex flex-col gap-10'
                     >
                        <div
                           className={Util.Other.twMerge(
                              'rounded-md p-5 my-2 shadow-sm w-2/3',
                              msg.fromLead && ' ml-auto bg-blue-500 text-white',
                              !msg.fromLead && 'mr-auto bg-gray-200 text-gray-800'
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
