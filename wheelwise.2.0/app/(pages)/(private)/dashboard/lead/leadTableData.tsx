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

import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetHeader,
   SheetTitle,
   SheetTrigger,
} from '@/components/ui/sheet'

import { Textarea } from '@/components/ui/textarea'

import { CiMail } from 'react-icons/ci'

import { getItem } from './leadGetAll'
import Link from 'next/link'

const LeadTableData = async () => {
   const items = await getItem()

   return (
      <Table>
         <TableCaption>
            A list of leads from the user's organization
         </TableCaption>
         <TableHeader>
            <TableRow>
               <TableHead></TableHead>
               <TableHead>Name</TableHead>
               <TableHead>Phone</TableHead>
               <TableHead>Email</TableHead>
               <TableHead>Status</TableHead>
            </TableRow>
         </TableHeader>
         <TableBody>
            {items.map((lead) => (
               <TableRow key={lead.id}>
                  <TableCell className='w-2'>
                     <Sheet>
                        <SheetTrigger>
                           <CiMail />
                        </SheetTrigger>
                        <SheetContent>
                           <SheetHeader>
                              <SheetTitle>AI Chat</SheetTitle>
                              <SheetDescription>
                                 <Textarea />
                              </SheetDescription>
                           </SheetHeader>
                        </SheetContent>
                     </Sheet>
                  </TableCell>
                  <TableCell className='font-medium'>
                     <Link
                        className='hover:text-indigo-700'
                        href={`./dash/lead/${lead.id}`}
                     >
                        {lead.firstName} {lead.lastName}
                     </Link>{' '}
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
