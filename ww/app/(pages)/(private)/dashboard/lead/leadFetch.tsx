/**
 * ! DOES NOT FOLLOW GOOD PRACTICE
 * TODO - Make it components base
 */

import prisma from '@/prisma/client'
import { auth } from '@clerk/nextjs'
import { cache } from 'react'

const { userId } = auth()

export const LeadFetch = cache(async () => {
   const item = await prisma.lead.findMany({
      where: {
         Organization: {
            users: {
               some: {
                  externalId: userId,
               },
            },
         },
      },
   })

   return item
})
