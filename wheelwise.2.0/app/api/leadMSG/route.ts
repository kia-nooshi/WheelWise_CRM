//!      Need some modification
//TODO   do it later
//?      : Check if lead already exist in Orgnizatation
//          - if not -> create the lead
//          - if yes -> got next
// ?     : add New Message to conversation

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/prisma/client'
import { revalidatePath } from 'next/cache'
import { BsBodyText } from 'react-icons/bs'

// TODO move schema make it seprate
const SchemaLead = z.object({
   orgenizationId: z.string().min(2),
   leadPhone: z.string().min(2),
   leadMessage: z.string(),
})

export async function POST(request: NextRequest) {
   const body = await request.json()
   const validation = SchemaLead.safeParse(body)

   if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 })

   const lead = await prisma.lead.findFirst({
      where: {
         organizationId: body.orgenizationId,
         phone: body.leadPhone,
      },
   })

   if (!lead) {
      //create new lead
      console.log('❌ Lead does not exist ')
   } else {
      console.log('✅ Lead Exist')

      let conversation = await prisma.conversation.findUnique({
         where: {
            leadId: lead.id,
         },
      })
   }

   return NextResponse.json(body)
}
