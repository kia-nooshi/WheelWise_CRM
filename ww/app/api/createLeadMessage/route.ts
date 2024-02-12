/**
 * ? Get New message from Lead
 * TODO CLEAN LATER
 * ! Prisma function must be sprate later
 * ! revalidate data is not ok
 * ! Zod schema mustbe sprate later
 */

import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import prisma from '@/prisma/client'
import { revalidatePath } from 'next/cache'
import { GenerateAiResponse } from '@/lib/function/controller/ai'
import { organizations } from '@clerk/nextjs/api'

const S = z.object({
   // ! here
   organization: z.string().min(5),
   lead: z.string().min(5),
   message: z.string().min(1),
})

export async function POST(request: NextRequest) {
   try {
      const body = await request.json()

      const validation = S.safeParse(body)

      if (!validation.success)
         return NextResponse.json(validation.error.errors, { status: 400 })

      console.log('1️⃣  Fetching Lead')
      const lead = await prisma.lead.findFirst({
         where: {
            id: body.lead,
            organizationId: body.organization,
         },
         include: {
            conversation: true,
         },
      })

      if (!lead) {
         console.log('❌  Lead Does not exist : ', lead)
         return NextResponse.json(
            'Lead not found in the specified organization',
            { status: 400 }
         )
      } else {
         console.log('✅ Lead Exist')
      }

      console.log('2️⃣  Fetching Conversation')
      let conversationId = lead.conversation?.id
      if (!conversationId) {
         console.log('❌  Conversation not exit')
         console.log('☑️  Create new conversation')
         const newConversation = await prisma.conversation.create({
            data: {
               leadId: body.lead,
            },
         })
         conversationId = newConversation.id
      } else {
         console.log('✅ Conversation Exist')
      }

      console.log('3️⃣  Add New Message')
      await prisma.message.create({
         data: {
            conversationId: conversationId,
            content: body.message,
            fromLead: true,
         },
      })

      const messageDetails = {
         organizationID: body.organization,
         leadID: lead.id,
         newMessage: body.message,
      }

      const { respond, ThreadId } = await GenerateAiResponse(messageDetails)

      console.log('4️⃣  Generating AI Response')

      const saved = await prisma.message.create({
         data: {
            conversationId: conversationId,
            content: respond,
            fromLead: false,
         },
      })

      console.log('5️⃣  Respond save: ', saved)

      return NextResponse.json(lead)
   } catch (error) {
      return NextResponse.json('there is an error in the server', {
         status: 400,
      })
   }
}
