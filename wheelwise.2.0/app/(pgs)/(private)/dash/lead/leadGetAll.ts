import prisma from '@/prisma/client'
import { auth } from '@clerk/nextjs'
import { cache } from 'react'

const { userId } = auth()

export const getItem = cache(async () => {
   const item = await await prisma.lead.findMany({
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
