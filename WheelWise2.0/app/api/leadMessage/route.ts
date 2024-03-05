/**
 * TODO  NEED CLEAN UP
 * !     NEED BETER ERROR HANDELING
 */

import { Chat, Lead } from '@/lib/function'
import { revalidatePath } from 'next/cache'

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
   const body = await request.json()

   try {
      const C = await Chat.messageCreate({
         conversationId: body.convId,
         content: body.message,
         fromLead: true,
      })

      if (!C.data?.content) throw new Error(C.error)

      const Ai = await Chat.messageAiCreate({
         convId: body.convId,
         message: body.message,
         threadId: body.threadId,
      })

      revalidatePath('/dashboard/[slug]')

      return NextResponse.json(revalidatePath('/dashboard/[slug]'), {
         status: 200,
      })
   } catch (error) {
      return NextResponse.json(
         error instanceof Error ? error.message : 'Internal Server Error',
         {
            status: 407,
         }
      )
   }
}
