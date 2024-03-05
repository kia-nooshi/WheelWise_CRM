'use server'

import { SchemaLeadCreate, TypeLeadCreate } from '@/lib/schema'
import prisma from '@/prisma/client'
import { revalidatePath } from 'next/cache'

interface gg {
   organizationId: string
   phone: string
}

export async function LeadGetByPhone({ organizationId, phone }: gg) {
   try {
      const lead = await prisma.lead.findFirst({
         where: {
            phone,
            organizationId,
         },
         include: {
            conversation: true, // Include the conversation in the result
         },
      })
      return lead
   } catch (e) {
      return null
   }
}
