import { Do } from '@/components'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
   /*

   http://localhost:3004/api/leadReceiverTest

   {
      "organId":"65efab9413dc990eb182bf08",
      "firstName":"Danin",
      "lastName":"Namiri",
      "phone":"9493573929",
      "email":"danin@gmail.com"
   }
   */

   const body = await request.json()

   try {
      const lead = await Do.Lead.SSSS({
         organId: body.organId,
         firstName: body.firstName,
         lastName: body.lastName,
         phone: body.phone,
         email: body.email,
      })

      if (!lead.data) throw new Error(lead.message)

      //lead.data.chat?.id
      /*
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
      */
      return NextResponse.json(lead.message, { status: 200 })
   } catch (error) {
      return NextResponse.json(error instanceof Error ? error.message : 'Internal Server Error', {
         status: 407,
      })
   }
}
