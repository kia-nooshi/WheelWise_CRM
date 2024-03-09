/**
 * TODO  NEED CLEAN UP
 * !     NEED BETER ERROR HANDELING
 */

import { Do } from '@/components'

import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
   const B = await request.json()

   try {
      const D = await Do.Chat.pushChat({
         id: B.id,
         threadId: B.threadId,
      })

      /*

         {
            "id": "CHAT_ID GOES_HERE",
            "content": "This is a test - message A",
            "fromLead": true,
         }
      
      const D = await Do.Chat.pushMessage({
         id: B.id,
         content: B.content,
         fromLead: B.fromLead,
      })

      {
         "id": "MESSAGE_ID GOES HERE"
      }
      
      const D = await Do.Chat.popMessage({
         id: B.id,
      })
      */

      // ------------------------------------------
      // ------------------------------------------
      // ------------------------------------------
      // DO NOT CHANGE ANYTHING HERE --------------
      // ------------------------------------------
      // ------------------------------------------
      // ------------------------------------------

      const responseTemplate = {
         data: D.data,
         message: D.message,
         success: D.success,
      }

      if (D.success) {
         return NextResponse.json(responseTemplate, { status: 200 })
      } else {
         return NextResponse.json(responseTemplate, { status: 500 })
      }
   } catch (error) {
      return NextResponse.json(error instanceof Error ? error.message : 'Internal Server Error', {
         status: 410,
      })
   }
}
