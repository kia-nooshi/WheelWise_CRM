/**
 * TODO  NEED CLEAN UP
 * !     NEED BETER ERROR HANDELING
 */

import { Chat, Lead } from '@/components/lib/function'
import { revalidatePath } from 'next/cache'

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
   const body = await request.json()

   try {
      const lead = await Lead.createLead(body)

      if (!lead.data) throw new Error(lead.error)
      if (!lead.data.conversation?.id) throw new Error(lead.error)

      const C = await Chat.messageCreate({
         conversationId: lead.data.conversation?.id,
         content: body.message,
         fromLead: true,
      })

      if (!C.data?.content) throw new Error(C.error)

      const Ai = await Chat.messageAiCreate({
         convId: lead.data.conversation?.id,
         message: C.data?.content,
         threadId: null,
      })

      console.log(Ai.error)

      revalidatePath('dashboard/*')

      return NextResponse.json(lead.data, { status: 200 })
   } catch (error) {
      return NextResponse.json(
         error instanceof Error ? error.message : 'Internal Server Error',
         {
            status: 407,
         }
      )
   }
}
