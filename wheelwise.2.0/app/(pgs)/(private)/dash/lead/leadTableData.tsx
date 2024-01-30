import React from 'react'

import {
   Table,
   TableBody,
   TableCaption,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table'

import { getItem } from './leadGetAll'

const LeadTableData = async () => {
   const items = await getItem()

   return (
      <Table>
         <TableCaption>
            A list of leads from the user's organization
         </TableCaption>
         <TableHeader>
            <TableRow>
               <TableHead>Name</TableHead>
               <TableHead>Phone</TableHead>
               <TableHead>Email</TableHead>
               <TableHead>Status</TableHead>
            </TableRow>
         </TableHeader>
         <TableBody>
            {items.map((lead) => (
               <TableRow key={lead.id}>
                  <TableCell className='font-medium'>
                     {lead.firstName} {lead.lastName}
                  </TableCell>
                  <TableCell>{lead.phone}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.badge}</TableCell>
               </TableRow>
            ))}
         </TableBody>
      </Table>
   )
}

export default LeadTableData
