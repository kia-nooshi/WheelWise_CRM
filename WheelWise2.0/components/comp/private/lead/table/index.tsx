import { Ui, Util } from '@/components'
import { LeadBadge } from './leadBadge'
import { Card, Table, Text } from '@radix-ui/themes'
import Link from 'next/link'
import LeadRefresh from './leadRefresh'

export default async function Leads() {
   const ClerkId = await Util.Clerk.getClerkId()
   if (!ClerkId.data) throw new Error(ClerkId.message)

   const User = await Util.DataBase.User.getUser({ clerkId: ClerkId.data })
   if (!User.data) throw new Error(User.message)

   const Leads = await Util.DataBase.Lead.getLeads({ organId: User.data.organId })

   if (!Leads.data) return <>Table is empty</>

   return (
      <Card
         variant='surface'
         className='p-5'
      >
         <Text
            as='div'
            size='2'
            weight='bold'
         >
            Lead Table
         </Text>
         <Text
            as='div'
            color='gray'
            size='2'
            className='p-2'
         >
            🔨 This part is still under development <br />
            🕛 Fillters and Sorting comming soon
            <LeadRefresh />
         </Text>

         <Table.Root
            variant='surface'
            className='mt-5'
         >
            <Table.Header>
               <Table.Row>
                  <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Phone</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Created</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
               </Table.Row>
            </Table.Header>

            <Table.Body>
               {Leads.data.map((lead) => (
                  <Table.Row key={lead.id}>
                     <Table.RowHeaderCell>
                        <Link
                           href={`/dashboard/${lead.id}`}
                           className='text-indigo-500'
                        >
                           {lead.firstName} {lead.lastName}
                        </Link>
                     </Table.RowHeaderCell>
                     <Table.Cell>{lead.phone}</Table.Cell>
                     <Table.Cell>{lead.email}</Table.Cell>
                     <Table.Cell>
                        <LeadBadge leadType={lead.badge} />
                     </Table.Cell>
                     <Table.Cell>
                        <div className='flex flex-row items-center gap-2 text-gray-600'>
                           <Ui.Icon name='Time' />
                           {lead.createdAt.toDateString()}
                        </div>
                     </Table.Cell>
                     <Table.Cell>
                        <div className='flex flex-row items-center gap-2 text-gray-600'>
                           <span>
                              <Ui.Icon name='Pen' />
                           </span>
                           <span>D</span>
                           <span>
                              <Ui.Icon name='Dots_Vertical' />
                           </span>
                        </div>
                     </Table.Cell>
                  </Table.Row>
               ))}
            </Table.Body>
         </Table.Root>
      </Card>
   )
}
