/**
 * ! DOES NOT FOLLOW GOOD PRACTICE
 * TODO - Make it components base
 * ? should not be here in this folder / Components Folder maybe!
 */

import React from 'react'
import { LeadFetch } from './leadFetch'
import { Card, Table, Text } from '@radix-ui/themes' // ! Not good Prac
import Link from 'next/link'

export const LeadTable = async () => {
   const leads = await LeadFetch()

   return (
      <Card variant='surface' className='p-5'>
         <Text as='div' size='2' weight='bold'>
            Lead Table
         </Text>
         <Text as='div' color='gray' size='2' className='p-2'>
            🔨 This part is still under development <br />
            🕛 Fillters and Sorting comming soon
         </Text>

         <Table.Root variant='surface' className='mt-5'>
            <Table.Header>
               <Table.Row>
                  <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Phone</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
                  <Table.ColumnHeaderCell>Thread ID</Table.ColumnHeaderCell>
               </Table.Row>
            </Table.Header>

            <Table.Body>
               {leads.map((lead) => (
                  <Table.Row key={lead.id}>
                     <Table.RowHeaderCell>
                        <Link href={`/dashboard/${lead.id}`}>
                           {lead.firstName} {lead.lastName}
                        </Link>
                     </Table.RowHeaderCell>
                     <Table.Cell>{lead.phone}</Table.Cell>
                     <Table.Cell>{lead.email}</Table.Cell>
                  </Table.Row>
               ))}
            </Table.Body>
         </Table.Root>
      </Card>
   )
}
